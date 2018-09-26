import fs from "fs";
import path from "path";

interface Item {
  name?: string;
  base?: string;
  levelReq?: number;
  variants?: ItemVariant[];
  mods?: string[];
  corrupted?: boolean;
  shaper?: boolean;
  elder?: boolean;
}

interface ItemVariant {
  name: string;
  mods: string[];
}

const files = fs.readdirSync(path.join(__dirname, "../data/Uniques"));
for (let file of files) {
  parseItems(path.join(__dirname, "../data/Uniques/" + file));
  console.log(file + "parsed");
}

function parseItems(fileName: string) {
  const items = {};

  const itemsRawString: string = fs
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
          .trim()
          .split(/\r\n/);
        items[type].push(createItem(lines));
      }
    }
  }

  fs.writeFileSync(
    fileName.replace(".lua", ".json"),
    JSON.stringify(items, null, 2)
  );
}

function createItem(lines) {
  const item: Item = {};

  item.name = lines[0];
  item.base = lines[1];
  item.levelReq = getLevelReq(lines);
  item.variants = getVariants(lines);
  item.mods = getMods(lines);
  item.corrupted = isCorrupted(lines);
  item.shaper = isShaper(lines);
  item.elder = isElder(lines);

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

function getVariants(raw: string[]): ItemVariant[] {
  const variants: ItemVariant[] = [];

  // Get Variant Names
  for (let line of raw) {
    if (line.match(/Variant:.*/g)) {
      const name = line.replace(/Variant: (\{2_6\})?/g, "");
      variants.push({
        name,
        mods: []
      });
    }
  }

  // Get Variant mods
  for (let line of raw) {
    const varSpecs = line.match(/{variant:([0-9,]+)}/g);
    if (varSpecs) {
      const varIds = varSpecs[0].match(/[0-9]+/g) || [];
      for (let varId of varIds) {
        const mod = line.replace(/{variant:([0-9,]+)}/g, "");
        variants[parseInt(varId) - 1].mods.push(mod);
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
