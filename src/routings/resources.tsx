import { Html } from "@kitajs/html";
import express from "express";
import { ServerVar } from "./servervar.tsx";

const router = express.Router();

router.get("/resources", (req, res) => {
    res.template("Resources", {scripts: [], styles: ["home.css",], footer: true},
    <main>
        <h4>Resources</h4>
        <p>Pre-made worksheets to use in your classes</p>
        <ul class="resources">
            <p><a href="/resources/worksheets/True_Or_False.pdf" download="">True_Or_False.pdf</a></p>
            <p><a href="/resources/worksheets/Reading_Activity.pdf" download="">Reading_Activity.pdf</a></p>
            <p><a href="/resources/worksheets/Coloring_Activity.pdf" download="">Coloring_Activity.pdf</a></p>
        </ul>
    </main>)
});

export default router;