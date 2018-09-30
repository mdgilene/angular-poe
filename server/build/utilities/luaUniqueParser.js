"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const NinjaData = [];
const CURRENT_LEAGUE = "Delve";
Promise.all([
    axios_1.default.get(`http://poe.ninja/api/Data/GetUniqueArmourOverview?league=${CURRENT_LEAGUE}`),
    axios_1.default.get(`http://poe.ninja/api/Data/GetUniqueWeaponOverview?league=${CURRENT_LEAGUE}`),
    axios_1.default.get(`http://poe.ninja/api/Data/GetUniqueFlaskOverview?league=${CURRENT_LEAGUE}`),
    axios_1.default.get(`http://poe.ninja/api/Data/GetUniqueAccessoryOverview?league=${CURRENT_LEAGUE}`),
    axios_1.default.get(`http://poe.ninja/api/Data/GetUniqueJewelOverview?league=${CURRENT_LEAGUE}`)
])
    .then(responses => {
    for (let res of responses) {
        NinjaData.push(...res.data.lines);
    }
})
    .then(() => {
    const files = fs_1.default.readdirSync(path_1.default.join(__dirname, "../data/Uniques"));
    for (let file of files) {
        if (file.match(/.lua$/)) {
            parseItems(path_1.default.join(__dirname, "../data/Uniques/" + file));
            console.log(file, "parsed");
        }
    }
});
function parseItems(fileName) {
    const items = {};
    const itemsRawString = fs_1.default
        .readFileSync(fileName)
        .toString()
        .slice(0, -1)
        .replace("-- Item data (c) Grinding Gear Games", "")
        .replace("return {", "")
        .trim();
    const itemsRaw = itemsRawString.split("--");
    for (let itemType of itemsRaw) {
        const type = itemType.split("\r\n")[0].trim();
        if (type) {
            items[type] = [];
            const itemsRaw = itemType.replace(type, "").split("]],[[");
            for (let itemRaw of itemsRaw) {
                const lines = itemRaw
                    .replace(/\]\],\[\[|\[\[|\]\],?/g, "")
                    .replace("–", "-") // Fixes weird character encoding issue
                    .replace(/[��]/g, "-")
                    .trim()
                    .split(/\r\n/);
                items[type].push(createItem(lines));
            }
        }
    }
    fs_1.default.writeFileSync(fileName.replace(".lua", ".json"), JSON.stringify(items, null, 2));
}
function createItem(lines) {
    const item = {};
    item.name = lines[0];
    item.base = lines[1];
    item.levelReq = getLevelReq(lines);
    item.variants = getVariants(lines);
    item.mods = getMods(lines);
    item.corrupted = isCorrupted(lines);
    item.shaper = isShaper(lines);
    item.elder = isElder(lines);
    item.icon = NinjaData.filter(ninjaItem => ninjaItem.name === item.name)[0].icon;
    return item;
}
function getLevelReq(raw) {
    let levelReq = 1;
    for (let line of raw) {
        if (line.match(/^Requires Level/g)) {
            levelReq = parseInt(line.replace(/Requires Level/g, ""));
        }
    }
    return levelReq;
}
function getVariants(raw) {
    const variants = {};
    // Get Variant Names
    for (let line of raw) {
        if (line.match(/Variant:.*/g)) {
            const name = line.replace(/Variant: (\{2_6\})?/g, "");
            variants[name] = [];
        }
    }
    // Get Variant mods
    for (let line of raw) {
        const varSpecs = line.match(/{variant:([0-9,]+)}/g);
        if (varSpecs) {
            const varIds = varSpecs[0].match(/[0-9]+/g) || [];
            for (let varId of varIds) {
                const name = Object.keys(variants)[parseInt(varId) - 1];
                const mod = line.replace(/{variant:([0-9,]+)}/g, "");
                variants[name].push(mod);
            }
        }
    }
    return variants;
}
function getMods(raw) {
    const mods = [];
    let i = 0;
    for (let line of raw) {
        i++;
        if (i > 2 &&
            !line.match(/(^.*: )|(^{.*})|(Requires)|(Elder)|(Shaper)|(Corrupted)/gm)) {
            mods.push(line);
        }
    }
    return mods;
}
function isCorrupted(raw) {
    for (let line of raw) {
        if (line.match(/Corrupted/g)) {
            return true;
        }
    }
    return false;
}
function isShaper(raw) {
    for (let line of raw) {
        if (line.match(/Shaper Item/g)) {
            return true;
        }
    }
    return false;
}
function isElder(raw) {
    for (let line of raw) {
        if (line.match(/Elder Item/g)) {
            return true;
        }
    }
    return false;
}
