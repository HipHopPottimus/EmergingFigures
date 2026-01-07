import { Html } from "@kitajs/html";
import express from "express";
import { ServerVar } from "./servervar.js";
const router = express.Router();
router.get("/", (req, res) => {
    res.template("Emerging Figures", { scripts: ["map.js"], styles: ["home.css", "map.css"], footer: true }, Html.createElement("main", null,
        Html.createElement("h4", null, "A citizen science project that empowers meaningful students participation"),
        Html.createElement("p", { class: "wasp-number", "data-target": ServerVar.insectResults.map(r => r.insects.reduce((a, b) => a + b)).reduce((a, b) => a + b) }),
        Html.createElement("p", null, " Pieces of fig wasp DNA analysed so far"),
        Html.createElement("div", { id: "map" }),
        Html.createElement("p", { class: "caption" },
            Html.createElement("img", { src: "/resources/icons/emerging.svg", class: "icon" }),
            " = Fig wasps found",
            Html.createElement("img", { src: "/resources/icons/fig.svg", class: "icon" }),
            " = No fig wasps found"),
        Html.createElement("h4", null, "Why the fig wasp?"),
        Html.createElement("p", null, "Some native Australian fig trees need wasps for successful pollination and the wasps rely on the tree to complete their lifecycle. This relationship has evolved to the point where the tree and the wasp are completely dependent on each other."),
        Html.createElement("p", null, "These 'fig wasps' are a keystone species in subtropical Australia."),
        Html.createElement("h4", null, "About the project"),
        Html.createElement("p", null, "Emerging Figures is a citizen science project that aims to analyze fig wasps emergences in the greater brisbane area. Our goal is to provide hands on experiences for primary school students and educate about the importance of this vital insect. We're selecting 12 STEM focused schools to send fig sampling kits that will be sent to UQ for analysis."),
        Html.createElement("h4", null, "How to get involved"),
        Html.createElement("p", null,
            "You can get started by ",
            Html.createElement("a", { href: "/resources" }, "looking at our resources"),
            " or ",
            Html.createElement("a", { href: "/apply" }, "submitting an application for your school to take part"))));
});
export default router;
