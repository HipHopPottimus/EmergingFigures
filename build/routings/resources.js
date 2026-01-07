import { Html } from "@kitajs/html";
import express from "express";
const router = express.Router();
router.get("/resources", (req, res) => {
    res.template("Resources", { scripts: [], styles: ["home.css",], footer: true }, Html.createElement("main", null,
        Html.createElement("h4", null, "Resources"),
        Html.createElement("p", null, "Pre-made worksheets to use in your classes"),
        Html.createElement("ul", { class: "resources" },
            Html.createElement("p", null,
                Html.createElement("a", { href: "/resources/worksheets/True_Or_False.pdf", download: "" }, "True_Or_False.pdf")),
            Html.createElement("p", null,
                Html.createElement("a", { href: "/resources/worksheets/Reading_Activity.pdf", download: "" }, "Reading_Activity.pdf")),
            Html.createElement("p", null,
                Html.createElement("a", { href: "/resources/worksheets/Coloring_Activity.pdf", download: "" }, "Coloring_Activity.pdf")))));
});
export default router;
