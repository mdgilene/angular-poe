import * as fs from "fs";
import * as path from "path";
import { Item } from "../../../exile-builds-core/models/Item";

const uniquesPath = path.join(__dirname, "../../data/Uniques/");

const filesToImport = fs.readdirSync(uniquesPath);

export const UniqueItemData = {
  weapons: {},
  armor: {},
  accessories: {},
  jewels: {},
  flasks: {}
};

export function findUniques(query: Item | {}): Item[] {
  const items: Item[] = [];

  if (Object.keys(query).length === 0) {
    Object.keys(UniqueItemData).forEach(key =>
      items.push(...UniqueItemData[key])
    );
    return items;
  }

  for (let category of Object.keys(UniqueItemData)) {
    for (let item of UniqueItemData[category]) {
      if (item.base === "Gut Ripper") console.log(item);
      for (let param of Object.keys(query)) {
        if (item[param].match(query[param])) {
          console.log("found item", item.name);
          items.push(item);
        } else {
          continue;
        }
      }
    }
  }

  return items;
}

for (let file of filesToImport) {
  loadUniques(file).then(contents => {
    for (let key of Object.keys(contents.default)) {
      if (key.match(/Weapon/g)) {
        UniqueItemData.weapons = Object.assign(
          contents.default[key],
          UniqueItemData.weapons
        );
      } else if (key.match(/Jewel/g)) {
        UniqueItemData.jewels = Object.assign(
          contents.default[key],
          UniqueItemData.jewels
        );
      } else if (key.match(/(Shield|Quiver|Helmet|Gloves|Boots|Body)/g)) {
        UniqueItemData.armor = Object.assign(
          contents.default[key],
          UniqueItemData.armor
        );
      } else if (key.match(/Amulet|Belt|Ring/g)) {
        UniqueItemData.accessories = Object.assign(
          contents.default[key],
          UniqueItemData.accessories
        );
      } else if (key.match(/Flask/g)) {
        UniqueItemData.flasks = Object.assign(
          contents.default[key],
          UniqueItemData.flasks
        );
      }
    }
  });
}

async function loadUniques(file: string) {
  return await import(uniquesPath + file);
}
