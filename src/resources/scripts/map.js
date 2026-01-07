import {fetchSvg, fetchServerVars} from "./util.js";

window.map = L.map('map').setView([-27.4705, 153.0260], 11);

let insectSvg = await fetchSvg("/resources/icons/emerging.svg");
let figSvg = await fetchSvg("/resources/icons/fig.svg");

let insectIcon = L.divIcon({html: insectSvg, className: "map-insect-icon", iconSize: [35, 35]});
let figIcon = L.divIcon({html: figSvg, className: "map-fig-icon", iconSize: [35, 35]});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

window.markers = [];

window.reloadMap = async () => {
    let servervar = await fetchServerVars();

    markers = [];

    for(let result of servervar.insectResults){
        let popupText = "";
        let icon = insectIcon;

        if(result.insects.every(x => x == 0)){
            popupText = "No insects were found at this location";
            icon = figIcon;
        }
        else{
            for(let i = 0; i < 3; i++){
                popupText += `${servervar.insectNames[i]}: ${result.insects[i]}<br>`;
            }
        }

        markers.push(L.marker(result.coordinates, {autoPanOnFocus: false, icon: icon}).addTo(map).bindPopup(popupText));
    }
}

await reloadMap();