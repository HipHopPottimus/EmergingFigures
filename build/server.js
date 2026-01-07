var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
        });
    }
    return path;
};
import { Html } from "@kitajs/html";
import express from "express";
import * as expressSession from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "express-formidable";
import "express-async-errors";
const app = express();
process.env.TZ = "Australia/Brisbane";
app.use(cookieParser(), bodyParser());
app.use(expressSession.default({
    secret: "foo",
    resave: false,
    saveUninitialized: true,
    cookie: {
        //cookies are not secure because this is running on a http development server- secure requires https 
        secure: false
    }
}));
const router = express.Router();
const routingModules = [
    "servervar",
    "middleware",
    "home",
    "apply",
    "dataVisualiser",
    "tracker",
    "resources"
];
for (let module of routingModules) {
    router.use((await import(__rewriteRelativeImportExtension("./routings/" + module + ".js"))).default);
}
router.use("/resources", express.static("./src/resources"));
app.use(router);
let errorHandler = (err, req, res, next) => {
    console.error(err);
    res.template("Error", {}, Html.createElement("main", null,
        Html.createElement("h1", null, "Uh oh!"),
        Html.createElement("p", null, "An error occurred while processing your request"),
        Html.createElement("p", null,
            Html.createElement("a", { href: "", onclick: "location.reload()" }, "Try again")),
        Html.createElement("p", null,
            Html.createElement("a", { href: "/" }, "Return home"))));
};
app.use(errorHandler);
app.listen(80);
console.log("Initialized");
