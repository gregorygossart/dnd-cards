import { CastingTimeUnit, DurationType, RangeType, SpellSchool, TimeDurationUnit } from "./constants";
import { RangeDistanceUnit } from "@/features/constants";

export interface SRDSpell {
  name: string;
  level: number;
  school: SpellSchool;
  castingTime: {
    amount: number;
    unit: CastingTimeUnit;
  };
  range: {
    type: RangeType;
    distance?: {
      amount: number;
      unit: RangeDistanceUnit;
    };
  };
  duration: {
    type: DurationType;
    duration?: {
      amount: number;
      unit: TimeDurationUnit;
    };
    concentration?: boolean;
  };
  components: {
    verbal: boolean;
    somatic: boolean;
    material: boolean;
    materialDescription?: string;
  };
  ritual: boolean;
  description: string;
  headerImage?: string;
  backImage?: string;
}

export const srdSpells: SRDSpell[] = [
  {
    name: "Fireball",
    level: 3,
    school: SpellSchool.Evocation,
    castingTime: { amount: 1, unit: CastingTimeUnit.Action },
    range: { type: RangeType.Ranged, distance: { amount: 150, unit: RangeDistanceUnit.Feet } },
    duration: { type: DurationType.Instantaneous },
    components: { verbal: true, somatic: true, material: true, materialDescription: "a tiny ball of bat guano and sulfur" },
    ritual: false,
    description: `
      <blockquote>A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame.</blockquote>
      Each creature in a <b>20-foot-radius sphere</b> centered on that point must make a <b>Dexterity saving throw</b>.
      A target takes <b>8d6 fire damage</b> on a failed save, or half as much damage on a successful one.
      <br/><br/>
      The fire spreads around corners.
      It ignites flammable objects in the area that aren't being worn or carried.
      <br/><br/>
      <b>At Higher Levels.</b> When you cast this spell using a spell slot of 4th level or higher, the damage increases by <b>1d6</b> for each slot level above 3rd.
    `,
    headerImage: "/images/spells/headers/fireball.jpg",
    backImage: "/images/card-backs/default.png"
  },
  {
    name: "Cure Wounds",
    level: 1,
    school: SpellSchool.Evocation,
    castingTime: { amount: 1, unit: CastingTimeUnit.Action },
    range: { type: RangeType.Touch },
    duration: { type: DurationType.Instantaneous },
    components: { verbal: true, somatic: true, material: false },
    ritual: false,
    description: `
      A creature you touch regains a number of hit points equal to <b>1d8</b> + your spellcasting ability modifier.
      <br/><br/>
      This spell has no effect on undead or constructs.
      <br/><br/>
      <b>At Higher Levels.</b> When you cast this spell using a spell slot of 2nd level or higher, the healing increases by <b>1d8</b> for each slot level above 1st.
    `,
    headerImage: "/images/spells/headers/cure-wounds.jpg"
  },
  {
    name: "Magic Missile",
    level: 1,
    school: SpellSchool.Evocation,
    castingTime: { amount: 1, unit: CastingTimeUnit.Action },
    range: { type: RangeType.Ranged, distance: { amount: 120, unit: RangeDistanceUnit.Feet } },
    duration: { type: DurationType.Instantaneous },
    components: { verbal: true, somatic: true, material: false },
    ritual: false,
    description: `
      <blockquote>You create three glowing darts of magical force.</blockquote>
      Each dart hits a creature of your choice that you can see within range.
      A dart deals <b>1d4 + 1 force damage</b> to its target.
      <br/><br/>
      The darts all strike simultaneously, and you can direct them to hit one creature or several.
      <br/><br/>
      <b>At Higher Levels.</b> When you cast this spell using a spell slot of 2nd level or higher, the spell creates <b>one more dart</b> for each slot level above 1st.
    `,
    headerImage: "/images/spells/headers/magic-missile.jpg"
  },
  {
    name: "Shield",
    level: 1,
    school: SpellSchool.Abjuration,
    castingTime: { amount: 1, unit: CastingTimeUnit.Reaction },
    range: { type: RangeType.Self },
    duration: { type: DurationType.Time, duration: { amount: 1, unit: TimeDurationUnit.Round } },
    components: { verbal: true, somatic: true, material: false },
    ritual: false,
    description: `
      <blockquote>An invisible barrier of magical force appears and protects you.</blockquote>
      Until the start of your next turn, you have a <b>+5 bonus to AC</b>, including against the triggering attack, and you take no damage from magic missile.
    `,
    headerImage: "/images/spells/headers/shield.jpg"
  },
  {
    name: "Invisibility",
    level: 2,
    school: SpellSchool.Illusion,
    castingTime: { amount: 1, unit: CastingTimeUnit.Action },
    range: { type: RangeType.Touch },
    duration: { type: DurationType.Time, duration: { amount: 1, unit: TimeDurationUnit.Hour }, concentration: true },
    components: { verbal: true, somatic: true, material: true, materialDescription: "an eyelash encased in gum arabic" },
    ritual: false,
    description: `
      A creature you touch becomes invisible until the spell ends.
      Anything the target is wearing or carrying is invisible as long as it is on the target's person.
      <br/><br/>
      The spell ends for a target that attacks or casts a spell.
      <br/><br/>
      <b>At Higher Levels.</b> When you cast this spell using a spell slot of 3rd level or higher, you can target <b>one additional creature</b> for each slot level above 2nd.
    `,
    headerImage: "/images/spells/headers/invisibility.jpg"
  },
  {
    name: "Counterspell",
    level: 3,
    school: SpellSchool.Abjuration,
    castingTime: { amount: 1, unit: CastingTimeUnit.Reaction },
    range: { type: RangeType.Ranged, distance: { amount: 60, unit: RangeDistanceUnit.Feet } },
    duration: { type: DurationType.Instantaneous },
    components: { verbal: false, somatic: true, material: false },
    ritual: false,
    description: `
      You attempt to interrupt a creature in the process of casting a spell.
      <br/><br/>
      If the creature is casting a spell of <b>3rd level or lower</b>, its spell fails and has no effect.
      <br/><br/>
      If it is casting a spell of <b>4th level or higher</b>, make an ability check using your spellcasting ability.
      The DC equals <b>10 + the spell's level + your proficiency bonus</b>.
      On a successful check, the creature's spell fails and has no effect.
      <br/><br/>
      <b>At Higher Levels.</b> When you cast this spell using a spell slot of 4th level or higher, the interrupted spell has no effect if its level is less than or equal to the level of the spell slot you used.
    `,
    headerImage: "/images/spells/headers/counterspell.jpg"
  },
  {
    name: "Healing Word",
    level: 1,
    school: SpellSchool.Evocation,
    castingTime: { amount: 1, unit: CastingTimeUnit.BonusAction },
    range: { type: RangeType.Ranged, distance: { amount: 60, unit: RangeDistanceUnit.Feet } },
    duration: { type: DurationType.Instantaneous },
    components: { verbal: true, somatic: false, material: false },
    ritual: false,
    description: `
      A creature of your choice that you can see within range regains hit points equal to <b>1d4 + your spellcasting ability modifier</b>.
      <br/><br/>
      This spell has no effect on undead or constructs.
      <br/><br/>
      <b>At Higher Levels.</b> When you cast this spell using a spell slot of 2nd level or higher, the healing increases by <b>1d4</b> for each slot level above 1st.
    `,
    headerImage: "/images/spells/headers/healing-word.jpg"
  },
  {
    name: "Mage Armor",
    level: 1,
    school: SpellSchool.Abjuration,
    castingTime: { amount: 1, unit: CastingTimeUnit.Action },
    range: { type: RangeType.Touch },
    duration: { type: DurationType.Time, duration: { amount: 8, unit: TimeDurationUnit.Hour } },
    components: { verbal: true, somatic: true, material: true, materialDescription: "a piece of cured leather" },
    ritual: false,
    description: `
      You touch a willing creature who isn't wearing armor, and a magical force protects it until the spell ends.
      The target's base AC becomes <b>13 + its Dexterity modifier</b>.
      <br/><br/>
      The spell ends if the target dons armor or if you dismiss the spell as an action.
    `,
    headerImage: "/images/spells/headers/mage-armor.jpg"
  },
  {
    name: "Lightning Bolt",
    level: 3,
    school: SpellSchool.Evocation,
    castingTime: { amount: 1, unit: CastingTimeUnit.Action },
    range: { type: RangeType.Self },
    duration: { type: DurationType.Instantaneous },
    components: { verbal: true, somatic: true, material: true, materialDescription: "a bit of fur and a rod of amber, crystal, or glass" },
    ritual: false,
    description: `
      <blockquote>A stroke of lightning forming a line <b>100 feet long and 5 feet wide</b> blasts out from you in a direction you choose.</blockquote>
      Each creature in the line must make a <b>Dexterity saving throw</b>.
      A creature takes <b>8d6 lightning damage</b> on a failed save, or half as much damage on a successful one.
      <br/><br/>
      The lightning ignites flammable objects in the area that aren't being worn or carried.
      <br/><br/>
      <b>At Higher Levels.</b> When you cast this spell using a spell slot of 4th level or higher, the damage increases by <b>1d6</b> for each slot level above 3rd.
    `,
    headerImage: "/images/spells/headers/lightning-bolt.jpg"
  },
  {
    name: "Fly",
    level: 3,
    school: SpellSchool.Transmutation,
    castingTime: { amount: 1, unit: CastingTimeUnit.Action },
    range: { type: RangeType.Touch },
    duration: { type: DurationType.Time, duration: { amount: 10, unit: TimeDurationUnit.Minute }, concentration: true },
    components: { verbal: true, somatic: true, material: true, materialDescription: "a wing feather from any bird" },
    ritual: false,
    description: `
      You touch a willing creature.
      The target gains a <b>flying speed of 60 feet</b> for the duration.
      <br/><br/>
      When the spell ends, the target falls if it is still aloft, unless it can stop the fall.
      <br/><br/>
      <b>At Higher Levels.</b> When you cast this spell using a spell slot of 4th level or higher, you can target <b>one additional creature</b> for each slot level above 3rd.
    `,
    headerImage: "/images/spells/headers/fly.jpg"
  },
];

export function searchSpells(query: string): SRDSpell[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return srdSpells;
  
  return srdSpells.filter(spell => 
    spell.name.toLowerCase().includes(normalizedQuery) ||
    spell.school.toLowerCase().includes(normalizedQuery) ||
    spell.level.toString() === normalizedQuery ||
    (spell.level === 0 && normalizedQuery === "cantrip")
  );
}
