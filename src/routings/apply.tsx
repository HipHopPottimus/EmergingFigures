import { Html } from "@kitajs/html";
import express from "express";
import fs from "fs/promises";
import puppeteer from "puppeteer";
import ptp from "pdf-to-printer";
import { ServerVar } from "./servervar.tsx";

const router = express.Router();

router.get("/apply", (req, res) => {
    res.template("Emerging Figures", {styles: ["form.css"], footer: true},
    <main>
        <div class="important-centered">
            <h4>Apply for your school to take part</h4>
            <form method="POST" action="/apply-submit">
                <div class="labeled-input-container text-left">
                    <p>Full name: </p><input name="name"/>
                    <p>School name: </p><input name="school"/>
                    <p>Address: </p><input name="address"/>
                </div>
                <div class="text-left">
                    <p>In 200 words or less, describe why you want to be part of Emerging Figures: </p>
                    <textarea name="describe"/>
                </div>  
                <input type="submit" class="button"/>
            </form>
        </div>
    </main>)
});

router.post("/apply-submit", async (req,res) => {
    
    //@ts-ignore
    ServerVar.school = {...req.fields};
    res.template("Submission Successful", {footer: true}, <main class="center-main">
        <img src="/resources/icons/logo.svg" class="big-img"/>
        <p>Submission Successful!</p>
        <a href="/">Continue exploring our site</a>
    </main>);

    const browser = await puppeteer.launch({});

    const page = await browser.newPage();

    await page.goto("http://localhost/letter/", {
        waitUntil: "networkidle0",
    });

    const selector = "div";
    await page.waitForSelector(selector, {
        visible: true,
    });

    await page.pdf({ path: "./src/resources/letter.pdf", format: "a4" });

    await ptp.print("./src/resources/letter.pdf", {monochrome: false})

    console.log("done");
});

router.get("/letter", (req,res) => {
    let info = ServerVar.school;
    res.template("Printout", {header: false, footer: false, styles: ["letter.css"], noCore: true}, 
        <>
            <div class="address">
                <p>The Emerging Figures Team</p>
                <p>12 Albert Street Brisbane</p>
            </div>
            <div class="address">
                <p>{info.name}</p>
                <p>{info.address}</p>
            </div>
            <div class="title">
                <img src="/resources/icons/logo.svg" class="logo" alt="website logo" height="100"/>
                <h1>Emerging Figures</h1>
            </div>
            <p>Dear {info.name}, </p>
            <p>Thank you for expressing your interest to take part in the Emerging Figures citizen science project. We are pleased to announce that {info.school} has been selected to provide fig samples for analysis. 
                Your intriguing self-description '{info.describe.split(".")[0]}' helped us identify your school as a prime candidate for this project.
                Please find attached a specially designed high-tech wasp containment apparatus to be used when transporting your findings to the University of Queensland where they will be studied. 
                We would be grateful if they could be sent off by the 25/2/26. Below is a procedure for storing your samples: 
            </p>
            <ol>
                <li>Collect 2-5 figs from fig trees near your school. Use identification software such as inaturalist to verify the tree supports fig wasps.</li>
                <li>Carefully place the samples in the provided bag.</li>
                <li>Scan the QR code below to log the location of the trees in our dataset.</li>
                <li>Mail the bag to the university. Postage and addressing has already been taken care of</li>
                <li>Track your figs using the provided online tracker.</li>
            </ol>
            <p>We look forward to analyzing your findings.</p>
            <p class="signature">
                Sincerely,<br/>
                The Emerging Figures team
            </p>
            <div class="qr-code">
                <img src="/resources/icons/qr-code.svg"/>
                <p>Scan to log location and track bag</p>
            </div>
        </>
    )
});

export default router;