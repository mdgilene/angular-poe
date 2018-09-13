"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var axios_1 = __importDefault(require("axios"));
var app = express_1.default();
app.listen(4300, function () { return console.log("Server running on port " + 4300); });
app.get("/items", function (req, res) {
    axios_1.default
        .get("http://poe.ninja/api/Data/GetUniqueArmourOverview?league=Delve")
        .then(function (data) { return console.log(data); });
});
