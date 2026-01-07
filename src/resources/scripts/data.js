import {fetchSvg, fetchServerVars} from "./util.js";

let servervar = await fetchServerVars();

await google.charts.load('current', { packages: ['corechart'] });

let processed = [["Species", "Recorded numbers"]];

for (let i = 0; i < servervar.insectNames.length; i++) {
    processed.push([servervar.insectNames[i], servervar.insectTotals[i]]);
}

const data = google.visualization.arrayToDataTable(processed);

const options = {
    legend: "none",
    hAxis: {
        gridlines: {
            count: 3,
        }
    },
    vAxis: {
        textStyle: {
            fontSize: 6.5,
        },
    },
    colors: ["#c96973"]
};

for(let graph of document.getElementsByClassName("graph")){
    let chart = new google.visualization.BarChart(graph);
    chart.draw(data, options);
}