import { BonsaiInstance, calcGrowthProgress, calcSellValue, getBonsaiTypeById, PLOT_EXPAND_COST } from "./bonsai";

export interface GameState {
  coins: number;
  totalEarned: number;
  plots: (BonsaiInstance | null)[];
  maxPlots: number;
  unlockedTypes: string[];
  items: {
    water: number;
    fertilizer: number;
    scissors: number;
  };
  day: number;
  totalHarvested: number;
  lastSaved: number;
  version: number;
}

const SAVE_KEY = "bonsai_tycoon_save";
const GAME_VERSION = 1;
const MAX_OFFLINE_HOURS = 24;

function createDefaultState(): GameState {
  return {
    coins: 200,
    totalEarned: 0,
    plots: [null, null, null, null],
    maxPlots: 4,
    unlockedTypes: ["matsu"],
    items: {
      water: 3,
      fertilizer: 1,
      scissors: 0,
    },
    day: 1,
    totalHarvested: 0,
    lastSaved: Date.now(),
    version: GAME_VERSION,
  };
}

export function loadGame(): GameState {
  if (typeof window === "undefined") return createDefaultState();
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return createDefaultState();
    const parsed = JSON.parse(raw) as GameState;
    if (parsed.version !== GAME_VERSION) return createDefaultState();
    // Ensure plots array length matches maxPlots
    while (parsed.plots.length < parsed.maxPlots) {
      parsed.plots.push(null);
    }
    return parsed;
  } catch {
    return createDefaultState();
  }
}

export function saveGame(state: GameState): void {
  if (typeof window === "undefined") return;
  try {
    const toSave = { ...state, lastSaved: Date.now() };
    localStorage.setItem(SAVE_KEY, JSON.stringify(toSave));
  } catch {
    // storage full or unavailable
  }
}

export function calcOfflineEarnings(state: GameState): {
  coins: number;
  count: number;
  offlineSeconds: number;
} {
  const now = Date.now();
  const offlineMs = now - state.lastSaved;
  const maxMs = MAX_OFFLINE_HOURS * 60 * 60 * 1000;
  const cappedOfflineMs = Math.min(offlineMs, maxMs);
  const offlineSeconds = Math.floor(cappedOfflineMs / 1000);

  if (offlineSeconds < 5) return { coins: 0, count: 0, offlineSeconds: 0 };

  let totalCoins = 0;
  let count = 0;

  for (const plot of state.plots) {
    if (!plot) continue;
    const type = getBonsaiTypeById(plot.typeId);
    if (!type) continue;

    const waterBonus = 1 + plot.waterings * 0.1;
    const fertBonus = 1 + plot.fertilizers * 0.25;
    const growthTimeMs =
      (type.growthTime * plot.level * 1000) / (waterBonus * fertBonus);
    const progressAtSave = calcGrowthProgress(plot, state.lastSaved);

    if (progressAtSave >= 100) {
      // Already ready — count as 1 harvest pending
      totalCoins += calcSellValue(plot, false);
      count++;
    } else {
      // Calculate if it would have completed during offline period
      const remainingProgress = 100 - progressAtSave;
      const remainingMs = (remainingProgress / 100) * growthTimeMs;
      if (cappedOfflineMs >= remainingMs) {
        totalCoins += calcSellValue(plot, false);
        count++;
      }
    }
  }

  return { coins: totalCoins, count, offlineSeconds };
}

export function resetGame(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SAVE_KEY);
}
