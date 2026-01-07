import { Html } from "@kitajs/html";
import * as fs from "node:fs/promises";
export function PageStateVars(options) {
    return Html.createElement("script", null,
        "Object.assign(window, ",
        JSON.stringify(options.vars),
        ")");
}
export function promisify(method) {
    return () => new Promise((resolve, reject) => {
        method((error) => {
            if (error)
                reject(error);
            else
                resolve();
        });
    });
}
;
export async function InlineSVG(options) {
    options.class = options.class || "" + " svgImg";
    let svg = (await fs.readFile(options.src)).toString();
    svg = svg.replace("<svg", "<svg " + Object.keys(options).map(k => `${k}="${options[k]}"`).join(" "));
    return svg;
}
export async function InlineSVGIcon(options) {
    options.class += " icon";
    return InlineSVG(options);
}
export function HeaderIcon(options) {
    return InlineSVG({ ...options, width: 50, height: 50 });
}
export function isoDate(date) {
    return date.toISOString().split("Z")[0];
}
export function localDateTime(date) {
    return new Intl.DateTimeFormat("en-GB", {
        dateStyle: "short",
        timeStyle: "short",
        hour12: true
    }).format(date);
}
