// ---------------------------------------------------------------------------
// Card type definitions — domain layer, separate from DB storage records
// ---------------------------------------------------------------------------

export type CardType = "spell";

export const SCHOOLS = {
  abjuration: "Abjuration",
  conjuration: "Conjuration",
  divination: "Divination",
  enchantment: "Enchantment",
  evocation: "Evocation",
  illusion: "Illusion",
  necromancy: "Necromancy",
  transmutation: "Transmutation",
} as const;

export type SchoolOfMagic = (typeof SCHOOLS)[keyof typeof SCHOOLS];

export type BlobRef = string;

export type CardComponent = {
  verbal: boolean;
  somatic: boolean;
  material: boolean;
  materialText?: string;
};

export interface CardBase {
  id: string;
  deckId: string;
  type: CardType;
  name: string;
  createdAt: number; // Unix timestamp
  updatedAt: number; // Unix timestamp
  order: number;
}

export interface SpellCard extends CardBase {
  type: "spell";
  level: number;
  school: SchoolOfMagic;
  castingTime: string;
  range: string;
  components: CardComponent;
  duration: string;
  description: string;
  higherLevels?: string;
  accentColor: string;
  artwork?: BlobRef;
}

export type Card = SpellCard;

// ---------------------------------------------------------------------------
// Exhaustive type discrimination helper
// ---------------------------------------------------------------------------

export function assertExhaustiveCardType(card: Card): never {
  throw new Error(`Unhandled card type: ${(card as CardBase).type}`);
}