import { Item, ItemType } from "./ItemNew";

export interface ItemFilter {
  name?: string;
  type?: ItemType;
}

export interface UniqueData {
  Amulet: Item[];
  Weapon: Item[];
  Belt: Item[];
  Body: Item[];
  Boots: Item[];
  Flask: Item[];
  Gloves: Item[];
  Helmet: Item[];
  Jewel: Item[];
  Quiver: Item[];
  Ring: Item[];
  Shield: Item[];
}

export class UniqueItemData {
  private allItems: Item[] = [];

  constructor(private data: UniqueData) {
    for (let key of Object.keys(this.data)) {
      for (let item of this.data[key]) {
        this.allItems.push(item);
      }
    }
  }

  public filter(_filter: ItemFilter): Item[] {
    let items: Item[] = this.allItems;

    if (_filter.name) {
      items = items.filter(item =>
        item.name.match(new RegExp(_filter.name, "i"))
      );
    }

    if (_filter.type) {
      items = items.filter(item => item.itemType === _filter.type);
    }

    return items;
  }
}
