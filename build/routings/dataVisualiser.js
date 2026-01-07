import { Html } from "@kitajs/html";
import express from "express";
import { ServerVar } from "./servervar.js";
const router = express.Router();
router.get("/data-visualiser", (req, res) => {
    res.template("Data Visualizer", { scripts: ["data.js", "map.js", "slideshow.js"], styles: ["map.css", "data.css"], footer: true }, Html.createElement("main", null,
        Html.createElement("h4", null, "Data visualiser"),
        Html.createElement("div", { class: "slideshow-controls" },
            Html.createElement("img", { src: "/resources/icons/left.svg", class: "arrow-icon", onclick: "slide(-1)" }),
            Html.createElement("div", { class: "slideshow-container" },
                Html.createElement("div", { class: "slideshow" },
                    Html.createElement("div", { class: "slide" },
                        Html.createElement("p", { class: "feature-title" }, "Recorded species numbers"),
                        Html.createElement("div", { class: "graph" })),
                    Html.createElement("div", { class: "slide" },
                        Html.createElement("div", null,
                            Html.createElement("table", null, ServerVar.tabledResults)),
                        Html.createElement("a", { class: "caption", href: "/resources/data.csv", download: "Emerging_Figures_data.csv" }, "Download as a .csv")),
                    Html.createElement("div", { class: "slide" },
                        Html.createElement("div", { id: "map", class: "big-map" }),
                        Html.createElement("p", { class: "caption" },
                            Html.createElement("img", { src: "/resources/icons/emerging.svg", class: "icon" }),
                            " = Fig wasps found ",
                            Html.createElement("br", null),
                            Html.createElement("img", { src: "/resources/icons/fig.svg", class: "icon" }),
                            " = No fig wasps found")),
                    Html.createElement("p", { class: "slide-label" }, "Recorded species graph"),
                    Html.createElement("p", { class: "slide-label" }, "Raw data"),
                    Html.createElement("p", { class: "slide-label" }, "Fig wasp map"))),
            Html.createElement("img", { src: "/resources/icons/right.svg", class: "arrow-icon", onclick: "slide(1)" })),
        Html.createElement("p", null, "At Emerging Figures, we believe in open data access for all. That's why we've made our data publicly available through our data visualizer."),
        Html.createElement("p", null, "Use our default displays or create your own using our downloadable csv files to understand our fig wasp research")));
});
export default router;
