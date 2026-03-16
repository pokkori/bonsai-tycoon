export interface BonsaiType {
  id: string;
  name: string;
  emoji: string;
  basePrice: number;
  growthTime: number;    // seconds per level
  sellPrice: number;
  maxLevel: number;
  description: string;
  unlockCost: number;
}

export const BONSAI_TYPES: BonsaiType[] = [
  {
    id: "matsu",
    name: "松",
    emoji: "🌲",
    basePrice: 100,
    growthTime: 30,
    sellPrice: 250,
    maxLevel: 5,
    description: "定番の松の盆栽。初心者でも育てやすい",
    unlockCost: 0,
  },
  {
    id: "ume",
    name: "梅",
    emoji: "🌸",
    basePrice: 300,
    growthTime: 60,
    sellPrice: 800,
    maxLevel: 5,
    description: "春に花咲く梅。香り高い銘木",
    unlockCost: 500,
  },
  {
    id: "sakura",
    name: "桜",
    emoji: "🌸",
    basePrice: 800,
    growthTime: 120,
    sellPrice: 2200,
    maxLevel: 5,
    description: "日本を代表する桜。満開時は絶景",
    unlockCost: 2000,
  },
  {
    id: "momiji",
    name: "紅葉",
    emoji: "🍁",
    basePrice: 2000,
    growthTime: 300,
    sellPrice: 6500,
    maxLevel: 5,
    description: "秋の紅葉が美しい。四季を感じる逸品",
    unlockCost: 8000,
  },
  {
    id: "fuji",
    name: "藤",
    emoji: "💜",
    basePrice: 5000,
    growthTime: 600,
    sellPrice: 16000,
    maxLevel: 5,
    description: "紫の花房が優雅。最高級の盆栽",
    unlockCost: 25000,
  },
];

export type PlotState = "empty" | "planted" | "growing" | "ready";

export interface BonsaiInstance {
  id: string;
  plotIndex: number;
  typeId: string;
  level: number;
  plantedAt: number;
  waterings: number;
  fertilizers: number;
  state: PlotState;
  growthProgress: number; // 0-100
}

export interface ItemType {
  id: "water" | "fertilizer" | "scissors";
  name: string;
  emoji: string;
  description: string;
  price: number;
  effect: string;
}

export const ITEM_TYPES: ItemType[] = [
  {
    id: "water",
    name: "水やり",
    emoji: "💧",
    description: "成長を10%加速する",
    price: 50,
    effect: "+10% 成長加速",
  },
  {
    id: "fertilizer",
    name: "肥料",
    emoji: "🌿",
    description: "成長を25%加速する",
    price: 120,
    effect: "+25% 成長加速",
  },
  {
    id: "scissors",
    name: "剪定ばさみ",
    emoji: "✂️",
    description: "収穫時の売値を20%アップ",
    price: 200,
    effect: "売値 +20%",
  },
];

export const PLOT_EXPAND_COST = [500, 1500, 4000, 10000, 25000];

export function getBonsaiTypeById(id: string): BonsaiType | undefined {
  return BONSAI_TYPES.find((b) => b.id === id);
}

export function calcSellValue(
  bonsai: BonsaiInstance,
  withScissors: boolean = false
): number {
  const type = getBonsaiTypeById(bonsai.typeId);
  if (!type) return 0;
  const levelMultiplier = 1 + (bonsai.level - 1) * 0.3;
  const baseValue = Math.floor(type.sellPrice * levelMultiplier);
  return withScissors ? Math.floor(baseValue * 1.2) : baseValue;
}

export function calcGrowthProgress(
  bonsai: BonsaiInstance,
  now: number
): number {
  const type = getBonsaiTypeById(bonsai.typeId);
  if (!type) return 0;
  const totalGrowthTime = type.growthTime * bonsai.level * 1000;
  const waterBonus = 1 + bonsai.waterings * 0.1;
  const fertBonus = 1 + bonsai.fertilizers * 0.25;
  const effectiveTime = totalGrowthTime / (waterBonus * fertBonus);
  const elapsed = now - bonsai.plantedAt;
  return Math.min(100, (elapsed / effectiveTime) * 100);
}
