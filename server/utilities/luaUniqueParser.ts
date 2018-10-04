import fs from "fs";
import path from "path";
import axios from "axios";

interface Item {
  name: string;
  base: string;
  levelReq: number;
  variants: ItemVariants;
  mods: string[];
  corrupted: boolean;
  shaper: boolean;
  elder: boolean;
  icon: string;
  itemType: string;
}

interface ItemVariants {
  [key: string]: string[];
}

const NinjaData: any[] = [];
const BaseItemData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/base_items.json")).toString()
);

const CURRENT_LEAGUE = "Delve";

Promise.all([
  axios.get(
    `http://poe.ninja/api/Data/GetUniqueArmourOverview?league=${CURRENT_LEAGUE}`
  ),
  axios.get(
    `http://poe.ninja/api/Data/GetUniqueWeaponOverview?league=${CURRENT_LEAGUE}`
  ),
  axios.get(
    `http://poe.ninja/api/Data/GetUniqueFlaskOverview?league=${CURRENT_LEAGUE}`
  ),
  axios.get(
    `http://poe.ninja/api/Data/GetUniqueAccessoryOverview?league=${CURRENT_LEAGUE}`
  ),
  axios.get(
    `http://poe.ninja/api/Data/GetUniqueJewelOverview?league=${CURRENT_LEAGUE}`
  )
])
  .then(responses => {
    for (let res of responses) {
      NinjaData.push(...res.data.lines);
    }
  })
  .then(() => {
    const files = fs.readdirSync(path.join(__dirname, "../data/Uniques"));
    for (let file of files) {
      if (file.match(/.lua$/)) {
        parseItems(path.join(__dirname, "../data/Uniques/" + file));
        console.log(file, "parsed");
      }
    }
  });

function parseItems(fileName: string) {
  const items: Item[] = [];

  const itemsRawString: string = fs
    .readFileSync(fileName)
    .toString()
    .slice(0, -1)
    .replace("-- Item data (c) Grinding Gear Games", "")
    .replace("return {", "")
    .trim();

  const itemsRaw = itemsRawString.split("--");

  for (let itemType of itemsRaw) {
    const type = itemType.split(/\r\n|\n/g)[0].trim();
    if (type) {
      const itemsRaw = itemType.replace(type, "").split("]],[[");
      for (let itemRaw of itemsRaw) {
        const lines = itemRaw
          .replace(/\]\],\[\[|\[\[|\]\],?/g, "")
          .replace("–", "-") // Fixes weird character encoding issue
          .replace(/[��]/g, "-")
          .trim()
          .split(/\r\n|\n/g);
        items.push(createItem(lines));
      }
    }
  }

  fs.writeFileSync(
    fileName.replace(".lua", ".json"),
    JSON.stringify(items, null, 2)
  );
}

function createItem(lines) {
  const item: Item = {
    name: "",
    base: "",
    levelReq: 0,
    variants: {},
    mods: [],
    corrupted: false,
    shaper: false,
    elder: false,
    icon: "",
    itemType: ""
  };

  item.name = lines[0].trim();
  item.base = lines[1].trim();
  item.levelReq = getLevelReq(lines);
  item.variants = getVariants(lines);
  item.mods = getMods(lines);
  item.corrupted = isCorrupted(lines);
  item.shaper = isShaper(lines);
  item.elder = isElder(lines);
  item.itemType = findItemType(item.base);

  const filteredItems = NinjaData.filter(
    ninjaItem => ninjaItem.name === item.name
  );

  try {
    item.icon = filteredItems[0].icon;
  } catch (e) {
    if (item.name === "Skin of the Lords")
      item.icon =
        "http://web.poecdn.com/image/Art/2DItems/Armours/BodyArmours/MyriadGraspGrand.png?scale=1&scaleIndex=0&w=2&h=3";
    if (item.name === "Malachai's Vision")
      item.icon =
        "http://web.poecdn.com/image/Art/2DItems/Armours/Helmets/MalachaisVision.png?scale=1&scaleIndex=0&w=2&h=2";
    if (item.name === "Army of Bones")
      item.icon =
        "http://web.poecdn.com/image/Art/2DItems/Jewels/unique8.png?scale=1&scaleIndex=0&w=1&h=1";
    if (item.name === "The Blue Nightmare")
      item.icon =
        "http://web.poecdn.com/image/Art/2DItems/Jewels/TheBlueDreamUpgrade.png?scale=1&scaleIndex=0&w=1&h=1";
    if (item.name === "The Green Nightmare")
      item.icon =
        "http://web.poecdn.com/image/Art/2DItems/Jewels/TheGreenDreamUpgrade.png?scale=1&scaleIndex=0&w=1&h=1";
    if (item.name === "The Goddess Unleashed")
      item.icon =
        "http://web.poecdn.com/image/Art/2DItems/Weapons/OneHandWeapons/OneHandSwords/TheGoddessUnleashed.png?scale=1&scaleIndex=0&w=2&h=3";
  }

  return item;
}

function getLevelReq(raw: string[]): number {
  let levelReq = 1;

  for (let line of raw) {
    if (line.match(/^Requires Level/g)) {
      levelReq = parseInt(line.replace(/Requires Level/g, ""));
    }
  }

  return levelReq;
}

function getVariants(raw: string[]): ItemVariants {
  const variants: ItemVariants = {};

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

function getMods(raw: string[]): string[] {
  const mods: string[] = [];

  let i = 0;
  for (let line of raw) {
    i++;
    if (
      i > 2 &&
      !line.match(/(^.*: )|(^{.*})|(Requires)|(Elder)|(Shaper)|(Corrupted)/gm)
    ) {
      mods.push(line);
    }
  }

  return mods;
}

function isCorrupted(raw: string[]): boolean {
  for (let line of raw) {
    if (line.match(/Corrupted/g)) {
      return true;
    }
  }
  return false;
}

function isShaper(raw: string[]): boolean {
  for (let line of raw) {
    if (line.match(/Shaper Item/g)) {
      return true;
    }
  }
  return false;
}

function isElder(raw: string[]): boolean {
  for (let line of raw) {
    if (line.match(/Elder Item/g)) {
      return true;
    }
  }
  return false;
}

function findItemType(base: string): string {
  const types = Object.keys(BaseItemData)
    .map(key => ({
      item_class: BaseItemData[key].item_class,
      name: BaseItemData[key].name
    }))
    .filter(baseItem => baseItem.name === base);
  return types[0] ? types[0].item_class : "Staff";
}
