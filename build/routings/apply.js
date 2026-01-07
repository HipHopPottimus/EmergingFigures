import { Html } from "@kitajs/html";
import express from "express";
import puppeteer from "puppeteer";
import ptp from "pdf-to-printer";
import { ServerVar } from "./servervar.js";
const router = express.Router();
router.get("/apply", (req, res) => {
    res.template("Emerging Figures", { styles: ["form.css"], footer: true }, Html.createElement("main", null,
        Html.createElement("div", { class: "important-centered" },
            Html.createElement("h4", null, "Apply for your school to take part"),
            Html.createElement("form", { method: "POST", action: "/apply-submit" },
                Html.createElement("div", { class: "labeled-input-container text-left" },
                    Html.createElement("p", null, "Full name: "),
                    Html.createElement("input", { name: "name" }),
                    Html.createElement("p", null, "School name: "),
                    Html.createElement("input", { name: "school" }),
                    Html.createElement("p", null, "Address: "),
                    Html.createElement("input", { name: "address" })),
                Html.createElement("div", { class: "text-left" },
                    Html.createElement("p", null, "In 200 words or less, describe why you want to be part of Emerging Figures: "),
                    Html.createElement("textarea", { name: "describe" })),
                Html.createElement("input", { type: "submit", class: "button" })))));
});
router.post("/apply-submit", async (req, res) => {
    //@ts-ignore
    ServerVar.school = { ...req.fields };
    res.template("Submission Successful", { footer: true }, Html.createElement("main", { class: "center-main" },
        Html.createElement("img", { src: "/resources/icons/logo.svg", class: "big-img" }),
        Html.createElement("p", null, "Submission Successful!"),
        Html.createElement("a", { href: "/" }, "Continue exploring our site")));
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
    await ptp.print("./src/resources/letter.pdf", { monochrome: false });
    console.log("done");
});
router.get("/letter", (req, res) => {
    let info = ServerVar.school;
    res.template("Printout", { header: false, footer: false, styles: ["letter.css"], noCore: true }, Html.createElement(Html.Fragment, null,
        Html.createElement("div", { class: "address" },
            Html.createElement("p", null, "The Emerging Figures Team"),
            Html.createElement("p", null, "12 Albert Street Brisbane")),
        Html.createElement("div", { class: "address" },
            Html.createElement("p", null, info.name),
            Html.createElement("p", null, info.address)),
        Html.createElement("div", { class: "title" },
            Html.createElement("img", { src: "/resources/icons/logo.svg", class: "logo", alt: "website logo", height: "100" }),
            Html.createElement("h1", null, "Emerging Figures")),
        Html.createElement("p", null,
            "Dear ",
            info.name,
            ", "),
        Html.createElement("p", null,
            "Thank you for expressing your interest to take part in the Emerging Figures citizen science project. We are pleased to announce that ",
            info.school,
            " has been selected to provide fig samples for analysis. Your intriguing self-description '",
            info.describe.split(".")[0],
            "' helped us identify your school as a prime candidate for this project. Please find attached a specially designed high-tech wasp containment apparatus to be used when transporting your findings to the University of Queensland where they will be studied. We would be grateful if they could be sent off by the 25/2/26. Below is a procedure for storing your samples:"),
        Html.createElement("ol", null,
            Html.createElement("li", null, "Collect 2-5 figs from fig trees near your school. Use identification software such as inaturalist to verify the tree supports fig wasps."),
            Html.createElement("li", null, "Carefully place the samples in the provided bag."),
            Html.createElement("li", null, "Scan the QR code below to log the location of the trees in our dataset."),
            Html.createElement("li", null, "Mail the bag to the university. Postage and addressing has already been taken care of"),
            Html.createElement("li", null, "Track your figs using the provided online tracker.")),
        Html.createElement("p", null, "We look forward to analyzing your findings."),
        Html.createElement("p", { class: "signature" },
            "Sincerely,",
            Html.createElement("br", null),
            "The Emerging Figures team"),
        Html.createElement("div", { class: "qr-code" },
            Html.createElement("img", { src: "/resources/icons/qr-code.svg" }),
            Html.createElement("p", null, "Scan to log location and track bag"))));
});
export default router;
