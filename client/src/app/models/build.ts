import { Item, ItemType } from './Item';

export interface Build {
  _id?: string;
  name?: string;
  class?: Class;
  items?: ItemsSection;
  skills?: SkillsSection;
  passives?: PassivesSection;
}

export interface Section {
  discussion: string;
}

export interface ItemsSection extends Section {
  head: Item[];
  body: Item[];
  gloves: Item[];
  boots: Item[];
  belt: Item[];
  weapon1: Item[];
  weapon2?: Item[];
  rings: Item[];
  amulet: Item[];
  jewels: Item[];
}

export interface SkillsSection extends Section {
  gemGroups: GemGroup[];
}

export interface PassivesSection extends Section {
  // Keystones?
  keystones: any[];
}

export interface Class {
  primary?: PrimaryClass;
  secondary?: SecondaryClass;
}

export interface GemGroup {
  location: Slot;
  links: Gem[];
}

export interface Gem {
  _id?: string;
  name?: string;
}

export enum SecondaryClass {
  SLAYER = 'Slayer',
  GLADIATOR = 'Gladiator',
  CHAMPION = 'Champion',
  ASSASSIN = 'Assassin',
  SABOTEUR = 'Saboteur',
  TRICKSTER = 'Trickster',
  JUGGERNAUT = 'Juggernaut',
  BERSERKER = 'Berserker',
  CHIEFTAIN = 'Chieftain',
  NECROMANCER = 'Necromancer',
  ELEMENTALIST = 'Elementalist',
  OCCULTIST = 'Occultist',
  DEADEYE = 'Deadeye',
  RAIDER = 'Raider',
  PATHFINDER = 'Pathfinder',
  INQUISITOR = 'Inquisitor',
  HIEROPHANT = 'Hierophant',
  GUARDIAN = 'Guardian',
  ASCENDANT = 'Ascendant'
}

export enum PrimaryClass {
  RANGER = 'Ranger',
  DUELIST = 'Duelist',
  MARAUDER = 'Marauder',
  TEMPLAR = 'Templar',
  WITCH = 'Witch',
  SHADOW = 'Shadow',
  SCION = 'Scion'
}

export enum Slot {
  HEAD = 'head',
  BODY = 'body',
  WEAPON1 = 'weapon1',
  WEAPON2 = 'weapon2',
  GLOVES = 'gloves',
  BOOTS = 'boots',
  RING1 = 'ring1',
  RING2 = 'ring2',
  AMULET = 'amulet',
  BELT = 'belt',
  FLASK = 'flask',
  JEWEL = 'jewel'
}

export const ClassCombos = [
  {
    primary: PrimaryClass.RANGER,
    secondary: [
      SecondaryClass.PATHFINDER,
      SecondaryClass.RAIDER,
      SecondaryClass.DEADEYE
    ]
  },
  {
    primary: PrimaryClass.DUELIST,
    secondary: [
      SecondaryClass.CHAMPION,
      SecondaryClass.GLADIATOR,
      SecondaryClass.SLAYER
    ]
  },
  {
    primary: PrimaryClass.MARAUDER,
    secondary: [
      SecondaryClass.JUGGERNAUT,
      SecondaryClass.BERSERKER,
      SecondaryClass.CHIEFTAIN
    ]
  },
  {
    primary: PrimaryClass.TEMPLAR,
    secondary: [
      SecondaryClass.INQUISITOR,
      SecondaryClass.GUARDIAN,
      SecondaryClass.HIEROPHANT
    ]
  },
  {
    primary: PrimaryClass.WITCH,
    secondary: [
      SecondaryClass.OCCULTIST,
      SecondaryClass.ELEMENTALIST,
      SecondaryClass.NECROMANCER
    ]
  },
  {
    primary: PrimaryClass.SHADOW,
    secondary: [
      SecondaryClass.ASSASSIN,
      SecondaryClass.SABOTEUR,
      SecondaryClass.TRICKSTER
    ]
  },
  {
    primary: PrimaryClass.SCION,
    secondary: [SecondaryClass.ASCENDANT]
  }
];

export const SlotInfo = {
  [Slot.HEAD]: {
    displayText: 'Head',
    maxSockets: 4,
    validItemTypes: [ItemType.HELMET]
  },
  [Slot.BODY]: {
    displayText: 'Body',
    maxSockets: 6,
    validItemTypes: [ItemType.BODY]
  },
  [Slot.WEAPON1]: {
    displayText: 'Main Hand',
    maxSockets: 6,
    validItemTypes: [
      ItemType.TWOHANDAXE,
      ItemType.TWOHANDMACE,
      ItemType.TWOHANDSWORD,
      ItemType.ONEHANDAXE,
      ItemType.ONEHANDMACE,
      ItemType.ONEHANDSWORD,
      ItemType.STAFF,
      ItemType.BOW,
      ItemType.DAGGER,
      ItemType.WAND
    ]
  },
  [Slot.WEAPON2]: {
    displayText: 'Off Hand',
    maxSockets: 3,
    validItemTypes: [
      ItemType.ONEHANDAXE,
      ItemType.ONEHANDMACE,
      ItemType.ONEHANDSWORD,
      ItemType.DAGGER,
      ItemType.WAND,
      ItemType.SHIELD,
      ItemType.QUIVER
    ]
  },
  [Slot.GLOVES]: {
    displayText: 'Gloves',
    maxSockets: 4,
    validItemTypes: [ItemType.GLOVES]
  },
  [Slot.BOOTS]: {
    displayText: 'Boots',
    maxSockets: 4,
    validItemTypes: [ItemType.BOOTS]
  },
  [Slot.RING1]: {
    displayText: 'Left Ring',
    maxSockets: 1,
    validItemTypes: [ItemType.RING]
  },
  [Slot.RING2]: {
    displayText: 'Right Ring',
    maxSockets: 1,
    validItemTypes: [ItemType.RING]
  },
  [Slot.AMULET]: {
    displayText: 'Amulet',
    maxSockets: 1,
    validItemTypes: [ItemType.AMULET]
  },
  [Slot.BELT]: {
    displayText: 'Belt',
    maxSockets: 0,
    validItemTypes: [ItemType.BELT]
  },
  [Slot.FLASK]: {
    displayText: 'Flask',
    maxSockets: 0,
    validItemTypes: [
      ItemType.LIFEFLASK,
      ItemType.MANALASK,
      ItemType.UTILITYFLASK,
      ItemType.HYBRIDFLASK
    ]
  },
  [Slot.JEWEL]: {
    displayText: 'Jewel',
    maxSockets: 0,
    validItemTypes: [ItemType.JEWEL]
  }
};
