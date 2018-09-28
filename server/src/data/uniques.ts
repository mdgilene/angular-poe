import * as fs from "fs";
import * as path from "path";
import axios from "axios";

const uniquesPath = path.join(__dirname, "../../data/Uniques/");

const filesToImport = fs
  .readdirSync(uniquesPath)
  .filter(file => file.match(/.json$/));

export const UniqueItemData: any = {};

for (let file of filesToImport) {
  loadUniques(file).then(contents => {
    for (let key of Object.keys(contents.default)) {
      const parts = key.split(":");
      const slot = parts[0].trim();
      if (
        slot !== "Quiver" &&
        slot !== "Ring" &&
        slot !== "Amulet" &&
        slot !== "Belt"
      ) {
        const type = parts[1].trim();
        if (!UniqueItemData[slot]) UniqueItemData[slot] = {};
        UniqueItemData[slot][type] = contents.default[key];
      } else {
        if (!UniqueItemData[slot]) UniqueItemData[slot] = {};
        UniqueItemData[slot] = contents.default[key];
      }
    }
  });
}

async function loadUniques(file: string) {
  return await import(uniquesPath + file);
}
