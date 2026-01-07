import { Html } from "@kitajs/html";
import express from "express";
import { ServerVar, updateServerVars} from "./servervar.tsx";

const router = express.Router();

router.get("/track/:id", (req, res) => {
    res.template("Emerging Figures tracker", {scripts: ["tracker.js","slideshow.js","map.js"], styles: ["home.css", "map.css","tracker.css"], footer: true},
    <main>
        <h4>Fig sample tracker</h4>
        <p>Sample id: {req.params["id"]}</p>
        <div class="slideshow-container">
            <div class="slideshow" data-label="none">
                <div class="slide">
                    <div id="select-map" class="big-map"></div>
                    <p>Select the location of the tree you picked the figs from</p>
                    <button class="button" onclick={`confirmLocation(${req.params.id});`}>Confirm</button>
                </div>
                <div class="slide">
                    <div class="tracker-container">
                        <img class="big-img" src="/resources/icons/fig.svg"/>
                        <p id="statusMessage">Waiting for delivery to university...</p>
                        <p>This page will update when progress is made</p>
                    </div>
                </div>
                <div class="slide">
                    <p>Analysis complete!</p>
                    <div id="map"></div>
                    <p>We found 13 Pleistodontes froggatti, 67 Pleistodontes imperialis and 12 Eupristina verticillata</p>
                    
                </div>
            </div>
            <p id="progressCount">1 / 5</p>
            <div class="progress-container">
                <div id="progressBar"></div>
            </div>
        </div>
    </main>)
});

router.post("/add-location/id/", async (req, res) => {
    //@ts-ignore
    ServerVar.insectResults.push({id: req.params.id, coordinates: [+req.fields.lat.toFixed(4), +req.fields.lng.toFixed(4)], insects: [13, 67, 12]});
    await updateServerVars();
    res.send({success: true, id: ServerVar.insectResults.length - 1});
});

export default router;