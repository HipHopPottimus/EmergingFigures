import { Html } from "@kitajs/html";
import express from "express";
import { ServerVar } from "./servervar.tsx";
import { InlineSVGIcon } from "../util.tsx";

const router = express.Router();

router.get("/data-visualiser", (req, res) => {
    res.template("Data Visualizer", {scripts: ["data.js","map.js","slideshow.js"], styles: ["map.css","data.css"], footer: true},
    <main>
        <h4>Data visualiser</h4>
        <div class="slideshow-controls">
            <img src="/resources/icons/left.svg" class="arrow-icon" onclick="slide(-1)"/>
            <div class="slideshow-container">
                <div class="slideshow">
                    <div class="slide">
                        <p class="feature-title">Recorded species numbers</p>
                        <div class="graph"></div>
                    </div>
                    <div class="slide">
                        <div>
                            <table>{ServerVar.tabledResults}</table>
                        </div>
                        <a class="caption" href="/resources/data.csv" download="Emerging_Figures_data.csv">Download as a .csv</a>
                    </div>
                    <div class="slide">
                        <div id="map" class="big-map"></div>
                        <p class="caption">
                            <img src="/resources/icons/emerging.svg" class="icon"/> = Fig wasps found <br/>
                            <img src="/resources/icons/fig.svg" class="icon"/> = No fig wasps found
                        </p>
                    </div>
                    <p class="slide-label">Recorded species graph</p>
                    <p class="slide-label">Raw data</p>
                    <p class="slide-label">Fig wasp map</p> 
                </div>
            </div>
            <img src="/resources/icons/right.svg" class="arrow-icon" onclick="slide(1)"/>
        </div>
        <p>At Emerging Figures, we believe in open data access for all. That's why we've made our data publicly available through our data visualizer.</p>
        <p>Use our default displays or create your own using our downloadable csv files to understand our fig wasp research</p>
    </main>)
});

export default router;