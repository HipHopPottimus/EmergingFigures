import express from "express";

import fs from "node:fs/promises";

export var ServerVar = {
    insectNames: ["Pleistodontes froggatti", "Pleistodontes imperialis", "Eupristina verticillata"],
    insectResults: [
        {
            coordinates: [-27.4805, 153.0760],
            insects: [35, 62, 12]
        },
        {
            coordinates: [-27.4905, 153.0660],
            insects: [12, 53, 0]
        },
        {
            coordinates: [-27.5805, 153.0560],
            insects: [54, 4, 16]
        },
        {
            coordinates: [-27.4905, 153.1060],
            insects: [56, 15, 6]
        },
        //ai after this point
        {
            "coordinates": [-27.4705, 153.0245],
            "insects": [12, 85, 43]
        },
        {
            "coordinates": [-27.4952, 153.0118],
            "insects": [56, 21, 89]
        },
        {
            "coordinates": [-27.4398, 153.0652],
            "insects": [0, 0, 0]
        },
        {
            "coordinates": [-27.3822, 153.0264],
            "insects": [92, 5, 61]
        },
        {
            "coordinates": [-27.5714, 153.0669],
            "insects": [25, 48, 99]
        },
        {
            "coordinates": [-27.4641, 152.9815],
            "insects": [7, 63, 22]
        },
        {
            "coordinates": [-27.5333, 152.9333],
            "insects": [41, 18, 74]
        },
        {
            "coordinates": [-27.4526, 153.0411],
            "insects": [0, 0, 0]
        },
        {
            "coordinates": [-27.4015, 152.9524],
            "insects": [15, 96, 37]
        },
        {
            "coordinates": [-27.6083, 153.1167],
            "insects": [67, 54, 8]
        },
        {
            "coordinates": [-27.4812, 153.0855],
            "insects": [0, 0, 0]
        },
        {
            "coordinates": [-27.3245, 153.0489],
            "insects": [0, 0, 0]
        }
    ],
    tabledResults: null,
    insectTotals: null,
    school: {
        name: "Example name",
        describe: "Example description",
        address: "Example address",
        school: "Example School"
    },
    freeTrackingId: 256 
};

export async function updateServerVars(){
    ServerVar.insectTotals = [];
    for(let i in ServerVar.insectNames){
        ServerVar.insectTotals[i] = 0;
    }

    for(let result of ServerVar.insectResults){
        for(let i = 0; i < ServerVar.insectNames.length; i++){
            ServerVar.insectTotals[i] += result.insects[i]; 
        }
    }

    let csvContent : any[][] = [["lat","long"].concat(ServerVar.insectNames) as any[]].concat(ServerVar.insectResults.map(result => result.coordinates.concat(result.insects)));
    let csvString = csvContent.map(row => row.join(',')).join('\n');
    ServerVar.tabledResults = csvContent.map(row => "<tr>"+row.map(value => "<td>"+value+"</td>").join("")+"<tr>").join("\n");
    
    await fs.writeFile("src/resources/data.csv", csvString);
}

await updateServerVars();

const router = express.Router();

router.get("/ServerVar", (req, res) => {
    res.json(ServerVar);
});

export default router;