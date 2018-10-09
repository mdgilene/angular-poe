export interface Gem {
  active_skill?: ActiveSkill;
  base_item: BaseItem | null;
  cast_time?: number;
  is_support: boolean;
  per_level: { [key: string]: PerLevel };
  stat_translation_file: StatTranslationFile;
  static: Static;
  tags: Tag[] | null;
  secondary_granted_effect?: string;
  support_gem?: SupportGem;
  projectile_speed?: number;
}

export interface ActiveSkill {
  description: string;
  display_name: string;
  id: string;
  is_manually_casted: boolean;
  is_skill_totem: boolean;
  stat_conversions: { [key: string]: string };
  types: string[];
  weapon_restrictions: WeaponRestriction[];
  skill_totem_life_multiplier?: number;
  minion_types?: string[];
}

export enum WeaponRestriction {
  Bow = 'Bow',
  Claw = 'Claw',
  Dagger = 'Dagger',
  FishingRod = 'FishingRod',
  OneHandAxe = 'One Hand Axe',
  OneHandMace = 'One Hand Mace',
  OneHandSword = 'One Hand Sword',
  Sceptre = 'Sceptre',
  Shield = 'Shield',
  Staff = 'Staff',
  ThrustingOneHandSword = 'Thrusting One Hand Sword',
  TwoHandAxe = 'Two Hand Axe',
  TwoHandMace = 'Two Hand Mace',
  TwoHandSword = 'Two Hand Sword',
  Unarmed = 'Unarmed',
  Wand = 'Wand'
}

export interface BaseItem {
  display_name: string;
  id: string;
  release_state: ReleaseState;
}

export enum ReleaseState {
  Legacy = 'legacy',
  Released = 'released',
  Unreleased = 'unreleased'
}

export interface PerLevel {
  mana_cost?: number;
  required_level?: number;
  stat_requirements?: StatRequirements;
  stats?: Array<Stat | null>;
  damage_effectiveness?: number;
  damage_multiplier?: number;
  mana_multiplier?: number;
}

export interface StatRequirements {
  str?: number;
  int?: number;
  dex?: number;
}

export interface Stat {
  value?: number;
  id?: string;
}

export enum StatTranslationFile {
  StatTranslationsAuraSkill = 'stat_translations/aura_skill',
  StatTranslationsBeamSkill = 'stat_translations/beam_skill',
  StatTranslationsCurseSkill = 'stat_translations/curse_skill',
  StatTranslationsDebuffSkill = 'stat_translations/debuff_skill',
  StatTranslationsMinionAttackSkill = 'stat_translations/minion_attack_skill',
  StatTranslationsMinionSkill = 'stat_translations/minion_skill',
  StatTranslationsMinionSpellSkill = 'stat_translations/minion_spell_skill',
  StatTranslationsOfferingSkill = 'stat_translations/offering_skill',
  StatTranslationsSkill = 'stat_translations/skill',
  StatTranslationsSupportGem = 'stat_translations/support_gem',
  StatTranslationsVariableDurationSkill = 'stat_translations/variable_duration_skill'
}

export interface Static {
  cooldown?: number;
  quality_stats: Stat[];
  stat_requirements?: StatRequirements;
  stats?: Array<Stat | null>;
  stored_uses?: number;
  mana_cost?: number;
  required_level?: number;
  crit_chance?: number;
  damage_effectiveness?: number;
  vaal?: Vaal;
  cooldown_bypass_type?: string;
  mana_multiplier?: number;
  damage_multiplier?: number;
  mana_reservation_override?: number;
}

export interface Vaal {
  souls: number;
  stored_uses: number;
}

export interface SupportGem {
  added_types: string[];
  allowed_types: string[];
  excluded_types: string[];
  letter: string;
  supports_gems_only: boolean;
}

export enum Tag {
  ActiveSkill = 'active_skill',
  Area = 'area',
  Attack = 'attack',
  Aura = 'aura',
  Bow = 'bow',
  Chaining = 'chaining',
  Channelling = 'channelling',
  Chaos = 'chaos',
  Cold = 'cold',
  Curse = 'curse',
  Dexterity = 'dexterity',
  Duration = 'duration',
  Fire = 'fire',
  Golem = 'golem',
  Herald = 'herald',
  Intelligence = 'intelligence',
  Lightning = 'lightning',
  LowMaxLevel = 'low_max_level',
  Melee = 'melee',
  Mine = 'mine',
  Minion = 'minion',
  Movement = 'movement',
  Projectile = 'projectile',
  Spell = 'spell',
  Strength = 'strength',
  Support = 'support',
  Totem = 'totem',
  Trap = 'trap',
  Trigger = 'trigger',
  Vaal = 'vaal',
  Warcry = 'warcry'
}

export interface GemFilter {
  partial: Partial<Gem>;
  name: string;
}
