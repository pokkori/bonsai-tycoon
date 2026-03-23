"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { BonsaiInstance, ITEM_TYPES, PLOT_EXPAND_COST, calcGrowthProgress, calcSellValue, getBonsaiTypeById } from "@/lib/bonsai";
import { GameState, calcOfflineEarnings, loadGame, saveGame } from "@/lib/gameState";

export interface FloatCoin { id: number; amount: number; x: number; y: number; }

export function useBonsaiGame() {
  const [state, setState] = useState<GameState | null>(null);
  const [offlineBanner, setOfflineBanner] = useState<{ coins: number; count: number; } | null>(null);
  const [floatCoins, setFloatCoins] = useState<FloatCoin[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const floatIdRef = useRef(0);
  const saveTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tickTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const loaded = loadGame();
    const { coins, count, offlineSeconds } = calcOfflineEarnings(loaded);
    if (coins > 0 && offlineSeconds > 5) {
      const newState: GameState = { ...loaded, coins: loaded.coins + coins, totalEarned: loaded.totalEarned + coins, lastSaved: Date.now() };
      setState(newState);
      setOfflineBanner({ coins, count });
      setTimeout(() => setOfflineBanner(null), 5000);
    } else {
      setState(loaded);
    }
  }, []);

  useEffect(() => {
    if (!state) return;
    tickTimerRef.current = setInterval(() => {
      setState((prev) => {
        if (!prev) return prev;
        const now = Date.now();
        const newPlots = prev.plots.map((plot) => {
          if (!plot) return null;
          const progress = calcGrowthProgress(plot, now);
          return { ...plot, growthProgress: progress, state: progress >= 100 ? ("ready" as const) : ("growing" as const) };
        });
        return { ...prev, plots: newPlots };
      });
    }, 1000);
    return () => { if (tickTimerRef.current) clearInterval(tickTimerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state !== null]);

  useEffect(() => {
    if (!state) return;
    saveTimerRef.current = setInterval(() => {
      setState((prev) => { if (prev) saveGame({ ...prev, lastSaved: Date.now() }); return prev; });
    }, 10000);
    return () => { if (saveTimerRef.current) clearInterval(saveTimerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state !== null]);

  const showNotification = useCallback((msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  }, []);

  const addFloatCoin = useCallback((amount: number) => {
    const id = floatIdRef.current++;
    const x = 40 + Math.random() * 60;
    const y = 50 + Math.random() * 30;
    setFloatCoins((prev) => [...prev, { id, amount, x, y }]);
    setTimeout(() => { setFloatCoins((prev) => prev.filter((c) => c.id !== id)); }, 1000);
  }, []);

  const plantBonsai = useCallback((plotIndex: number, typeId: string) => {
    setState((prev) => {
      if (!prev) return prev;
      if (prev.plots[plotIndex] !== null) return prev;
      const type = getBonsaiTypeById(typeId);
      if (!type) return prev;
      if (prev.coins < type.basePrice) { showNotification("コインが足りません！"); return prev; }
      if (!prev.unlockedTypes.includes(typeId)) { showNotification("この盆栽はまだ解放されていません"); return prev; }
      const newInstance: BonsaiInstance = {
        id: typeId + "_" + Date.now(), plotIndex, typeId, level: 1,
        plantedAt: Date.now(), waterings: 0, fertilizers: 0, state: "growing", growthProgress: 0
      };
      const newPlots = [...prev.plots];
      newPlots[plotIndex] = newInstance;
      return { ...prev, coins: prev.coins - type.basePrice, plots: newPlots };
    });
  }, [showNotification]);

  const waterBonsai = useCallback((plotIndex: number) => {
    setState((prev) => {
      if (!prev) return prev;
      const plot = prev.plots[plotIndex];
      if (!plot || plot.state === "ready") { showNotification("水やりは成長中の盆栽に使えます"); return prev; }
      if (prev.items.water <= 0) { showNotification("水が足りません！ショップで購入してください"); return prev; }
      const newPlots = [...prev.plots];
      newPlots[plotIndex] = { ...plot, waterings: plot.waterings + 1 };
      showNotification("水やり完了！成長が加速します");
      return { ...prev, items: { ...prev.items, water: prev.items.water - 1 }, plots: newPlots };
    });
  }, [showNotification]);

  const fertilizeBonsai = useCallback((plotIndex: number) => {
    setState((prev) => {
      if (!prev) return prev;
      const plot = prev.plots[plotIndex];
      if (!plot || plot.state === "ready") { showNotification("肥料は成長中の盆栽に使えます"); return prev; }
      if (prev.items.fertilizer <= 0) { showNotification("肥料が足りません！ショップで購入してください"); return prev; }
      const newPlots = [...prev.plots];
      newPlots[plotIndex] = { ...plot, fertilizers: plot.fertilizers + 1 };
      showNotification("肥料散布完了！大きく育ちます");
      return { ...prev, items: { ...prev.items, fertilizer: prev.items.fertilizer - 1 }, plots: newPlots };
    });
  }, [showNotification]);

  const harvestBonsai = useCallback((plotIndex: number) => {
    setState((prev) => {
      if (!prev) return prev;
      const plot = prev.plots[plotIndex];
      if (!plot) return prev;
      if (plot.state !== "ready" && (plot.growthProgress ?? 0) < 100) { showNotification("まだ収穫できません"); return prev; }
      const useScissors = prev.items.scissors > 0;
      const earned = calcSellValue(plot, useScissors);
      const newPlots = [...prev.plots];
      newPlots[plotIndex] = null;
      const type = getBonsaiTypeById(plot.typeId);
      const name = type?.name ?? "盆栽";
      const msg = useScissors
        ? `剪定済み！${name} ${earned.toLocaleString()}コイン獲得！`
        : `収穫！${name} ${earned.toLocaleString()}コイン獲得！`;
      showNotification(msg);
      addFloatCoin(earned);
      return {
        ...prev, coins: prev.coins + earned, totalEarned: prev.totalEarned + earned,
        totalHarvested: prev.totalHarvested + 1,
        items: useScissors ? { ...prev.items, scissors: prev.items.scissors - 1 } : prev.items,
        plots: newPlots
      };
    });
  }, [showNotification, addFloatCoin]);

  const expandPlot = useCallback(() => {
    setState((prev) => {
      if (!prev) return prev;
      const expandIndex = prev.maxPlots - 4;
      if (expandIndex >= PLOT_EXPAND_COST.length) { showNotification("これ以上庭を拡張できません"); return prev; }
      const cost = PLOT_EXPAND_COST[expandIndex];
      if (prev.coins < cost) { showNotification("コインが足りません（必要: " + cost.toLocaleString() + "）"); return prev; }
      const newMaxPlots = prev.maxPlots + 1;
      const newPlots = [...prev.plots, null];
      showNotification("庭を拡張しました！スロット" + newMaxPlots + "個に");
      return { ...prev, coins: prev.coins - cost, maxPlots: newMaxPlots, plots: newPlots };
    });
  }, [showNotification]);

  const buyItem = useCallback((itemType: "water" | "fertilizer" | "scissors") => {
    setState((prev) => {
      if (!prev) return prev;
      const item = ITEM_TYPES.find((i) => i.id === itemType);
      if (!item) return prev;
      if (prev.coins < item.price) { showNotification("コインが足りません！"); return prev; }
      showNotification(item.name + "を購入しました");
      return { ...prev, coins: prev.coins - item.price, items: { ...prev.items, [itemType]: prev.items[itemType] + 1 } };
    });
  }, [showNotification]);

  const unlockBonsaiType = useCallback((typeId: string) => {
    setState((prev) => {
      if (!prev) return prev;
      if (prev.unlockedTypes.includes(typeId)) { showNotification("すでに解放済みです"); return prev; }
      const type = getBonsaiTypeById(typeId);
      if (!type) return prev;
      if (prev.coins < type.unlockCost) { showNotification("コインが足りません（必要: " + type.unlockCost.toLocaleString() + "）"); return prev; }
      showNotification(type.name + "の盆栽を解放しました！");
      return { ...prev, coins: prev.coins - type.unlockCost, unlockedTypes: [...prev.unlockedTypes, typeId] };
    });
  }, [showNotification]);

  return { state, offlineBanner, floatCoins, notification, plantBonsai, waterBonsai, fertilizeBonsai, harvestBonsai, expandPlot, buyItem, unlockBonsaiType };
}
