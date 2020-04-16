// Generated by https://quicktype.io

export interface ApiRespones {
  lines: Item[];
}

export interface Item {
  id: number;
  name: string;
  icon: string;
  mapTier: number;
  levelRequired: number;
  baseType: string;
  stackSize: number;
  variant: null;
  prophecyText: null;
  artFilename: null;
  links: number;
  itemClass: number;
  sparkline: Sparkline;
  lowConfidenceSparkline: Sparkline;
  implicitModifiers: Modifier[];
  explicitModifiers: Modifier[];
  flavourText: string;
  corrupted: boolean;
  gemLevel: number;
  gemQuality: number;
  itemType: WeaponType | ArmourType | AccessoryType | OtherItemType;
  chaosValue: number;
  exaltedValue: number;
  count: number;
}

export interface Modifier {
  text: string;
  optional: boolean;
}

export enum WeaponType {
  Bow = 'Bow',
  Claw = 'Claw',
  Dagger = 'Dagger',
  OneHandedAxe = 'One Handed Axe',
  OneHandedMace = 'One Handed Mace',
  OneHandedSword = 'One Handed Sword',
  Staff = 'Staff',
  TwoHandedAxe = 'Two Handed Axe',
  TwoHandedMace = 'Two Handed Mace',
  TwoHandedSword = 'Two Handed Sword',
  Wand = 'Wand'
}

export enum ArmourType {
  BodyArmour = 'Body Armour',
  Boots = 'Boots',
  Gloves = 'Gloves',
  Helmet = 'Helmet',
  Quiver = 'Quiver',
  Shield = 'Shield'
}

export enum AccessoryType {
  Amulet = 'Amulet',
  Belt = 'Belt',
  Ring = 'Ring'
}

export enum OtherItemType {
  Jewel = 'Jewel',
  Flask = 'Flask'
}

export interface Sparkline {
  data: Array<number | null>;
  totalChange: number;
}

//////