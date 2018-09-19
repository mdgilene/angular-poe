export interface Build {
  _id?: string;
  name?: string;
  class?: Class;
  items?: ItemsSection;
  gems?: GemsSection;
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

export interface GemsSection extends Section {
  head: GemGroup;
  body: GemGroup;
  gloves: GemGroup;
  boots: GemGroup;
  weapon1: GemGroup;
  weapon2?: GemGroup;
}

export interface PassivesSection extends Section {}

export interface Class {
  primary?: PrimaryClass;
  secondary?: SecondaryClass;
}

export interface Item {}

export interface GemGroup {
  location: 'head' | 'body' | 'gloves' | 'boots' | 'weapon1' | 'weapon2';
  links: Gem[];
}

export interface Gem {}

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
