import { Item, ItemType } from '../models/Item';

export function isTwoHanded(item: Item) {
  const twoHandedTypes: ItemType[] = [
    ItemType.TWOHANDAXE,
    ItemType.TWOHANDMACE,
    ItemType.TWOHANDSWORD,
    ItemType.STAFF,
    ItemType.BOW
  ];

  return twoHandedTypes.includes(item.itemType);
}
