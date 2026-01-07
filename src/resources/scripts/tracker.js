import {fetchSvg, fetchServerVars, apiRequest} from "./util.js";

const serverVars = await fetchServerVars();

let selectMap = L.map('select-map').setView([-27.4705, 153.0260], 11);

let figSvg = await fetchSvg("/resources/icons/fig.svg");
let figIcon = L.divIcon({html: figSvg, className: "map-fig-icon", iconSize: [35, 35]});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(selectMap);

let marker = L.marker([-27.4705, 153.0260], {autoPanOnFocus: true, icon: figIcon}).addTo(selectMap).bindPopup("Click on the map to move this marker").openPopup();

selectMap.on("click", (e) => {
    marker.setLatLng(e.latlng);
});

let progressBar = document.getElementById("progressBar");
let progressCount = document.getElementById("progressCount");
let statusMessage = document.getElementById("statusMessage");

let progress = 1;

let messages = ["Waiting for arrival at university...","Waiting for processing at university...","DNA Analysis underway..."];

let addedMarker;
window.confirmLocation = async () => {
    let result = await apiRequest("/add-location/295", "POST", marker.getLatLng());
    await window.reloadMap();
    addedMarker = window.markers[result.id];
    
    await window.map.setView(addedMarker.getLatLng(), 15, {animate: false});
    addedMarker.openPopup();

    nextStep();
}

window.nextStep = () => {
    progress += 1;
    progressBar.style.width = progress * 20 + "%";
    progressCount.innerHTML = `${progress} / 5`;
    if(progress == 2 || progress == 5) slide(1);
    if(progress == 5){
        
    }
    else {
        let time = Math.random() * 5000 + 2000;
        setTimeout(nextStep, time);
        statusMessage.innerHTML = messages[progress - 2];
    }
}