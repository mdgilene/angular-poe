export interface Item {
  name: string;
  base: string;
  levelReq: number;
  statReq: string;
  variants: { [key: string]: string[] };
  mods: string[];
  corrupted: boolean;
  shaper: boolean;
  elder: boolean;
  icon: string;
  itemType: ItemType;
}

export type ItemFilter = Partial<Item>;

export enum ItemType {
  HELMET = 'Helmet',
  BODY = 'Body Armour',
  GLOVES = 'Gloves',
  BOOTS = 'Boots',
  SHIELD = 'Shield',
  QUIVER = 'Quiver',
  ONEHANDSWORD = 'One Hand Sword',
  TWOHANDSWORD = 'Two Hand Sword',
  ONEHANDMACE = 'One Hand Mace',
  TWOHANDMACE = 'Two Hand Mace',
  ONEHANDAXE = 'One Hand Axe',
  TWOHANDAXE = 'Two Hand Axe',
  STAFF = 'Staff',
  DAGGER = 'Dagger',
  WAND = 'Wand',
  BOW = 'Bow',
  RING = 'Ring',
  AMULET = 'Amulet',
  BELT = 'Belt',
  UTILITYFLASK = 'Utility Flask',
  LIFEFLASK = 'Life Flask',
  MANALASK = 'Mana Flask',
  HYBRIDFLASK = 'Hybrid Flask',
  JEWEL = 'Jewel'
}
