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

export const ItemSlots = {
  head: { displayText: 'Head', maxSockets: 4 },
  body: { displayText: 'Body', maxSockets: 6 },
  weapon1: { displayText: 'Main Hand', maxSockets: 6 },
  weapon2: { displayText: 'Off Hand', maxSockets: 3 },
  gloves: { displayText: 'Gloves', maxSockets: 4 },
  boots: { displayText: 'Boots', maxSockets: 4 },
  ring1: { displayText: 'Left Ring', maxSockets: 1 },
  ring2: { displayText: 'Ring Ring', maxSockets: 1 },
  amulet: { displayText: 'Amulet', maxSockets: 1 },
  belt: { displayText: 'Belt', maxSockets: 0 }
};
