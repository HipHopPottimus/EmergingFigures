
import {Html} from "@kitajs/html";
import * as express from "express";

import {promisify} from "../util.tsx";

const router = express.Router();

/**
 * Middleware function that allows a call to template() to be used in the response of a request
 */
router.use((req, res, next) => {
    res.template = async (title: string, options: {scripts?: string[], styles?: string[], header?: boolean, footer?: boolean, httpStatus?: number, noCore?: boolean}, body : any) => {
        options.scripts ??= [];
        options.styles ??= [];
        options.header ??= true;

        res.status(options.httpStatus || 200).send("<!DOCTYPE html>"+
            await (<html lang="en">
                <head>
                    <meta charset="UTF-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>{title}</title>

                    <link rel="icon" href="/resources/icons/logo.svg" type="image/svg+xml" />
                    
                    {/*Leaflet stuff*/}
                    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
                    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

                    {/*Charting stuff*/}
                    <script src="https://www.gstatic.com/charts/loader.js"></script>

                    {/*Scripts and styles common to all pages*/}
                    {!options.noCore ? <>
                            <link href="/resources/styles/core.css" rel="stylesheet"/>
                            <style>
                                a[href^="{req.originalUrl}"] {`{
                                    filter: brightness(var(--link-darken));
                                }`}
                            </style>
                        </> : ""
                    }

                    {options.scripts.map(src => <script src={"/resources/scripts/"+src} type="module"></script>).join("\n")}
    
                    {options.styles.map(href => <link rel="stylesheet" href={"/resources/styles/"+href}/>).join("\n")}

                    {req.path == "/landscape" ? "" : <script>if(window.matchMedia("(orientation: landscape)").matches) window.location.assign("/landscape")</script>}

                </head>
                <body>
                    {options.header ? <header onclick="event.preventDefault();window.location.assign('/')">
                        <img src="/resources/icons/logo.svg" class="logo" alt="website logo" height="100"/>
                        <h1>Emerging Figures</h1>
                    </header> : ""}

                    {body as string}

                    {options.footer ? <footer>
                        <a href="/resources">Resources</a>
                        <a href="/data-visualiser">Data visualiser</a>
                        <a href="/apply">Apply to take part</a>
                    </footer> : ""}
                </body>
            </html>
        ));
    }
    next();
});

router.use((req,res,next) => {
    req.session.saveAsync = promisify(req.session.save);
    req.session.destroyAsync = promisify(req.session.destroy);
    next();
});

router.get("/landscape", (req,res) => {
    res.template("Emerging Figures", {}, <main>
        <p class="big-message">Please use a portrait device to view this prototype</p>
        <a class="button" href="/">Refresh</a>
    </main>);
});

export default router;