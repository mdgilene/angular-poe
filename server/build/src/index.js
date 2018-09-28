"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const itemApi_1 = require("./routes/itemApi");
const CURRENT_LEAGUE = "Delve";
const app = express_1.default();
app.use(cors_1.default({
    origin: "http://localhost:4200"
}));
app.listen(4300, () => console.log("Server running on port " + 4300));
app.get("/armour", (req, res) => {
    axios_1.default
        .get(`http://poe.ninja/api/Data/GetUniqueArmourOverview?league=${CURRENT_LEAGUE}`)
        .then(response => res.json({
        lines: filterUnique(response.data.lines)
    }));
});
app.get("/weapons", (req, res) => {
    axios_1.default
        .get(`http://poe.ninja/api/Data/GetUniqueWeaponOverview?league=${CURRENT_LEAGUE}`)
        .then(response => res.json({
        lines: filterUnique(response.data.lines)
    }));
});
app.get("/flasks", (req, res) => {
    axios_1.default
        .get(`http://poe.ninja/api/Data/GetUniqueFlaskOverview?league=${CURRENT_LEAGUE}`)
        .then(response => {
        res.json({
            lines: filterUnique(response.data.lines).map((item) => (Object.assign({}, item, { itemType: "Flask" })))
        });
    });
});
app.get("/accessories", (req, res) => {
    axios_1.default
        .get(`http://poe.ninja/api/Data/GetUniqueAccessoryOverview?league=${CURRENT_LEAGUE}`)
        .then(response => res.json({
        lines: filterUnique(response.data.lines)
    }));
});
app.get("/jewels", (req, res) => {
    axios_1.default
        .get(`http://poe.ninja/api/Data/GetUniqueJewelOverview?league=${CURRENT_LEAGUE}`)
        .then(response => res.json({
        lines: filterUnique(response.data.lines)
    }));
});
app.use("/item-api", itemApi_1.itemApi);
const filterUnique = arr => {
    // return arr.filter((item, index, a) => {
    //   return a.map(mapItem => mapItem.name).indexOf(item.name) === index;
    // });
    return arr;
};
