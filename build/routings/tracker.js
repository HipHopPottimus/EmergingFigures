import { Html } from "@kitajs/html";
import express from "express";
import { ServerVar, updateServerVars } from "./servervar.js";
const router = express.Router();
router.get("/track/:id", (req, res) => {
    res.template("Emerging Figures tracker", { scripts: ["tracker.js", "slideshow.js", "map.js"], styles: ["home.css", "map.css", "tracker.css"], footer: true }, Html.createElement("main", null,
        Html.createElement("h4", null, "Fig sample tracker"),
        Html.createElement("p", null,
            "Sample id: ",
            req.params["id"]),
        Html.createElement("div", { class: "slideshow-container" },
            Html.createElement("div", { class: "slideshow", "data-label": "none" },
                Html.createElement("div", { class: "slide" },
                    Html.createElement("div", { id: "select-map", class: "big-map" }),
                    Html.createElement("p", null, "Select the location of the tree you picked the figs from"),
                    Html.createElement("button", { class: "button", onclick: `confirmLocation(${req.params.id});` }, "Confirm")),
                Html.createElement("div", { class: "slide" },
                    Html.createElement("div", { class: "tracker-container" },
                        Html.createElement("img", { class: "big-img", src: "/resources/icons/fig.svg" }),
                        Html.createElement("p", { id: "statusMessage" }, "Waiting for delivery to university..."),
                        Html.createElement("p", null, "This page will update when progress is made"))),
                Html.createElement("div", { class: "slide" },
                    Html.createElement("p", null, "Analysis complete!"),
                    Html.createElement("div", { id: "map" }),
                    Html.createElement("p", null, "We found 13 Pleistodontes froggatti, 67 Pleistodontes imperialis and 12 Eupristina verticillata"))),
            Html.createElement("p", { id: "progressCount" }, "1 / 5"),
            Html.createElement("div", { class: "progress-container" },
                Html.createElement("div", { id: "progressBar" })))));
});
router.post("/add-location/id/", async (req, res) => {
    //@ts-ignore
    ServerVar.insectResults.push({ id: req.params.id, coordinates: [+req.fields.lat.toFixed(4), +req.fields.lng.toFixed(4)], insects: [13, 67, 12] });
    await updateServerVars();
    res.send({ success: true, id: ServerVar.insectResults.length - 1 });
});
export default router;
