import { Html } from "@kitajs/html";
import * as express from "express";
import { promisify } from "../util.js";
const router = express.Router();
/**
 * Middleware function that allows a call to template() to be used in the response of a request
 */
router.use((req, res, next) => {
    res.template = async (title, options, body) => {
        options.scripts ??= [];
        options.styles ??= [];
        options.header ??= true;
        res.status(options.httpStatus || 200).send("<!DOCTYPE html>" +
            await (Html.createElement("html", { lang: "en" },
                Html.createElement("head", null,
                    Html.createElement("meta", { charset: "UTF-8" }),
                    Html.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }),
                    Html.createElement("title", null, title),
                    Html.createElement("link", { rel: "icon", href: "/resources/icons/logo.svg", type: "image/svg+xml" }),
                    Html.createElement("link", { rel: "stylesheet", href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css", integrity: "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=", crossorigin: "" }),
                    Html.createElement("script", { src: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js", integrity: "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=", crossorigin: "" }),
                    Html.createElement("script", { src: "https://www.gstatic.com/charts/loader.js" }),
                    !options.noCore ? Html.createElement(Html.Fragment, null,
                        Html.createElement("link", { href: "/resources/styles/core.css", rel: "stylesheet" }),
                        Html.createElement("style", null,
                            "a[href^=\"",
                            req.originalUrl,
                            "\"] ",
                            `{
                                    filter: brightness(var(--link-darken));
                                }`)) : "",
                    options.scripts.map(src => Html.createElement("script", { src: "/resources/scripts/" + src, type: "module" })).join("\n"),
                    options.styles.map(href => Html.createElement("link", { rel: "stylesheet", href: "/resources/styles/" + href })).join("\n"),
                    req.path == "/landscape" ? "" : Html.createElement("script", null, "if(window.matchMedia(\"(orientation: landscape)\").matches) window.location.assign(\"/landscape\")")),
                Html.createElement("body", null,
                    options.header ? Html.createElement("header", { onclick: "event.preventDefault();window.location.assign('/')" },
                        Html.createElement("img", { src: "/resources/icons/logo.svg", class: "logo", alt: "website logo", height: "100" }),
                        Html.createElement("h1", null, "Emerging Figures")) : "",
                    body,
                    options.footer ? Html.createElement("footer", null,
                        Html.createElement("a", { href: "/resources" }, "Resources"),
                        Html.createElement("a", { href: "/data-visualiser" }, "Data visualiser"),
                        Html.createElement("a", { href: "/apply" }, "Apply to take part")) : ""))));
    };
    next();
});
router.use((req, res, next) => {
    req.session.saveAsync = promisify(req.session.save);
    req.session.destroyAsync = promisify(req.session.destroy);
    next();
});
router.get("/landscape", (req, res) => {
    res.template("Emerging Figures", {}, Html.createElement("main", null,
        Html.createElement("p", { class: "big-message" }, "Please use a portrait device to view this prototype"),
        Html.createElement("a", { class: "button", href: "/" }, "Refresh")));
});
export default router;
