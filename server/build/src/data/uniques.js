"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const uniquesPath = path.join(__dirname, "../../data/Uniques/");
const filesToImport = fs
    .readdirSync(uniquesPath)
    .filter(file => file.match(/.json$/));
exports.UniqueItemData = {
    weapons: {},
    armor: {},
    accessories: {},
    jewels: {},
    flasks: {}
};
const NinjaData = {
    weapons: [],
    armor: [],
    accessories: [],
    jewels: [],
    flasks: []
};
for (let file of filesToImport) {
    loadUniques(file).then(contents => {
        for (let key of Object.keys(contents.default)) {
            if (key.match(/Weapon/g)) {
                exports.UniqueItemData.weapons = Object.assign(contents.default[key], exports.UniqueItemData.weapons);
            }
            else if (key.match(/Jewel/g)) {
                exports.UniqueItemData.jewels = Object.assign(contents.default[key], exports.UniqueItemData.jewels);
            }
            else if (key.match(/(Shield|Quiver|Helmet|Gloves|Boots|Body)/g)) {
                exports.UniqueItemData.armor = Object.assign(contents.default[key], exports.UniqueItemData.armor);
            }
            else if (key.match(/Amulet|Belt|Ring/g)) {
                exports.UniqueItemData.accessories = Object.assign(contents.default[key], exports.UniqueItemData.accessories);
            }
            else if (key.match(/Flask/g)) {
                exports.UniqueItemData.flasks = Object.assign(contents.default[key], exports.UniqueItemData.flasks);
            }
        }
    });
}
function loadUniques(file) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Promise.resolve().then(() => __importStar(require(uniquesPath + file)));
    });
}
