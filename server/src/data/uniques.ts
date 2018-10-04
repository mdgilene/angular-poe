import * as fs from "fs";
import * as path from "path";

const uniquesPath = path.join(__dirname, "../../data/Uniques/");

const filesToImport = fs
  .readdirSync(uniquesPath)
  .filter(file => file.match(/.json$/));

export const UniqueItemData: any = [];

for (let file of filesToImport) {
  loadUniques(file).then(contents => {
    UniqueItemData.push(...contents.default);
  });
}

async function loadUniques(file: string) {
  return await import(uniquesPath + file);
}
