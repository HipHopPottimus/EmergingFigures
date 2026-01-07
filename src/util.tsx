import {Html} from "@kitajs/html";
import * as fs from "node:fs/promises";

export function PageStateVars(options: {vars: object}){
    return <script>Object.assign(window, {JSON.stringify(options.vars)})</script>
}

export function promisify(method: (callback: (error) => void) => void){
    return () => new Promise<void>((resolve,reject) => {
        method((error) => {
            if(error) reject(error);
            else resolve();
        });
    });
};

type SvgOptions = {src: string, class?: string, id?: string, width?: any, height?: any}

export async function InlineSVG(options: SvgOptions){
    options.class = options.class || "" + " svgImg";
    let svg = (await fs.readFile(options.src)).toString();
    svg = svg.replace("<svg","<svg "+Object.keys(options).map(k => `${k}="${options[k]}"`).join(" "));
    return svg;
}

export async function InlineSVGIcon(options: SvgOptions){
    options.class += " icon";
    return InlineSVG(options);
}

export function HeaderIcon(options: SvgOptions){
    return InlineSVG({...options, width: 50, height: 50});
}

export function isoDate(date: Date){
    return date.toISOString().split("Z")[0];
}

export function localDateTime(date: Date){
return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "short",
    timeStyle: "short",
    hour12: true
  }).format(date);
}