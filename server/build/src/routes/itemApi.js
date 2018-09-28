"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uniques_1 = require("../data/uniques");
exports.itemApi = express_1.Router();
exports.itemApi.get("/uniques", (req, res) => {
    return res.json(uniques_1.UniqueItemData);
});
