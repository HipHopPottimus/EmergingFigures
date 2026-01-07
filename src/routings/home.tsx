import { Html } from "@kitajs/html";
import express from "express";
import { ServerVar } from "./servervar.tsx";

const router = express.Router();

router.get("/", (req, res) => {
    res.template("Emerging Figures", {scripts: ["map.js"], styles: ["home.css", "map.css"], footer: true},
    <main>
        <h4>A citizen science project that empowers meaningful students participation</h4>
        <p class="wasp-number" data-target={ServerVar.insectResults.map(r => r.insects.reduce((a, b) => a + b)).reduce((a, b) => a + b)}></p>
        <p> Pieces of fig wasp DNA analysed so far</p>
        
        <div id="map"></div>
        <p class="caption">
            <img src="/resources/icons/emerging.svg" class="icon"/> = Fig wasps found 
            <img src="/resources/icons/fig.svg" class="icon"/> = No fig wasps found
        </p>

        <h4>Why the fig wasp?</h4>
        <p>
            Some native Australian fig trees need wasps for successful pollination and the wasps rely on the tree to complete their lifecycle.
            This relationship has evolved to the point where the tree and the wasp are completely dependent on each other.
        </p>
        <p>These 'fig wasps' are a keystone species in subtropical Australia.</p>

        <h4>About the project</h4>
        <p>
            Emerging Figures is a citizen science project that aims to analyze fig wasps emergences in the greater brisbane area.
            Our goal is to provide hands on experiences for primary school students and educate about the importance of this vital insect.
            We're selecting 12 STEM focused schools to send fig sampling kits that will be sent to UQ for analysis.
        </p>

        <h4>How to get involved</h4>
        <p>You can get started by <a href="/resources">looking at our resources</a> or <a href="/apply">submitting an application for your school to take part</a></p>
    </main>)
});

export default router;