declare module '*/item-restrictions.json' {
  interface Restrictions {
    'Two Handed Axe': SlotAndRestriction;
    'Two Handed Mace': SlotAndRestriction;
    'Two Handed Sword': SlotAndRestriction;
    Staff: SlotAndRestriction;
    'One Handed Axe': SlotAndRestriction;
    'One Handed Sword': SlotAndRestriction;
    'One Handed Mace': SlotAndRestriction;
    Dagger: SlotAndRestriction;
    Claw: SlotAndRestriction;
    Shield: SlotAndRestriction;
    Bow: SlotAndRestriction;
    Quiver: SlotAndRestriction;
    Helmet: SlotAndRestriction;
    'Body Armour': SlotAndRestriction;
    Gloves: SlotAndRestriction;
    Boots: SlotAndRestriction;
    Belt: SlotAndRestriction;
    Ring: SlotAndRestriction;
    Amulet: SlotAndRestriction;
  }

  interface SlotAndRestriction {
    slot: string[];
    canUseWith: string[];
  }

  const value: Restrictions;
  export default value;
}
