import {Html} from "@kitajs/html";

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

const routingModules : string[] = [
    "servervar",
    "middleware",
    "home",
    "apply",
    "dataVisualiser",
    "tracker",
    "resources"
];

for(let module of routingModules){
    router.use((await import("./routings/"+module+".js")).default);
}

router.use("/resources",express.static("./src/resources"));

app.use(router);

let errorHandler : express.ErrorRequestHandler = (err,req,res,next) => {
    console.error(err);
    res.template("Error",{},<main>
        <h1>Uh oh!</h1>
        <p>An error occurred while processing your request</p>
        <p><a href="" onclick="location.reload()">Try again</a></p>
        <p><a href="/">Return home</a></p>
    </main>)
}

app.use(errorHandler);

app.listen(process.env.PORT || 5000);

console.log("Initialized");