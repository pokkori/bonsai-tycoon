"use client";
import { useState } from "react";
import Link from "next/link";
import { BONSAI_TYPES, ITEM_TYPES, PLOT_EXPAND_COST, getBonsaiTypeById } from "@/lib/bonsai";
import { useBonsaiGame } from "@/hooks/useBonsaiGame";
import BonsaiCard from "@/components/BonsaiCard";
import {
  BonsaiIcon, ItemIcon, TreeIcon, CoinIcon,
  HomeIcon, ShopIcon, StatsIcon, TrophyIcon,
  SeedlingIcon, MoonIcon, PotIcon
} from "@/components/BonsaiIcon";

type Tab = "garden" | "shop" | "stats";

export default function GamePage() {
  const {
    state, offlineBanner, floatCoins, notification,
    plantBonsai, waterBonsai, fertilizeBonsai, harvestBonsai,
    expandPlot, buyItem, unlockBonsaiType
  } = useBonsaiGame();
  const [tab, setTab] = useState<Tab>("garden");
  const [selectedPlot, setSelectedPlot] = useState<number | null>(null);

  if (!state) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center gap-2 text-xl">
        <TreeIcon className="w-8 h-8" />
        <span>読み込み中...</span>
      </div>
    </div>
  );

  const expandIndex = state.maxPlots - 4;
  const nextExpandCost = expandIndex < PLOT_EXPAND_COST.length ? PLOT_EXPAND_COST[expandIndex] : null;

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative"
      role="application" aria-label="盆栽タイクーン ゲーム">

      {/* Offline banner */}
      {offlineBanner && offlineBanner.coins > 0 && (
        <div className="fixed top-0 left-0 right-0 z-50 max-w-md mx-auto">
          <div className="offline-banner bg-amber-600 text-white text-center py-3 px-4 text-sm font-medium shadow-lg flex items-center justify-center gap-2"
            role="status" aria-live="polite">
            <MoonIcon className="w-4 h-4" />
            お帰りなさい！放置中に {offlineBanner.coins.toLocaleString()} コイン獲得！
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className="fixed top-16 left-0 right-0 z-40 max-w-md mx-auto px-4">
          <div className="bg-gray-900/90 text-white text-center py-2 px-4 rounded-xl text-sm font-medium shadow-lg"
            role="status" aria-live="polite">
            {notification}
          </div>
        </div>
      )}

      {/* Float coins */}
      {floatCoins.map(fc => (
        <div key={fc.id}
          className="fixed z-50 pointer-events-none font-bold text-yellow-500 text-lg float-coin flex items-center gap-1"
          style={{ left: fc.x + "%", top: fc.y + "%" }}
          aria-hidden="true">
          <CoinIcon className="w-5 h-5" />
          +{fc.amount.toLocaleString()}
        </div>
      ))}

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-amber-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg font-bold flex items-center gap-1.5" style={{ color: "#1b4332" }}
            aria-label="トップページに戻る">
            <TreeIcon className="w-5 h-5" />
            盆栽タイクーン
          </Link>
          <div className="flex items-center gap-3">
            <div className="bg-amber-50 border border-amber-300 rounded-xl px-3 py-1 flex items-center gap-1"
              aria-label={`所持コイン: ${state.coins.toLocaleString()}`}>
              <CoinIcon className="w-4 h-4" />
              <span className="text-amber-700 font-bold text-sm">{state.coins.toLocaleString()}</span>
            </div>
            <div className="text-xs text-gray-500">{state.day}日目</div>
          </div>
        </div>
      </header>

      {/* Items bar */}
      <div className="flex gap-2 px-4 py-2 bg-amber-50 border-b border-amber-100"
        aria-label="アイテム在庫">
        <div className="flex items-center gap-1 text-xs">
          <ItemIcon icon="water" className="w-4 h-4" />
          <span className="font-medium" aria-label={`水やり ${state.items.water}個`}>{state.items.water}</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <ItemIcon icon="fertilizer" className="w-4 h-4" />
          <span className="font-medium" aria-label={`肥料 ${state.items.fertilizer}個`}>{state.items.fertilizer}</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <ItemIcon icon="scissors" className="w-4 h-4" />
          <span className="font-medium" aria-label={`剪定ばさみ ${state.items.scissors}個`}>{state.items.scissors}</span>
        </div>
        <div className="ml-auto text-xs text-gray-400">アイテム在庫</div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-24">

        {/* GARDEN TAB */}
        {tab === "garden" && (
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              {state.plots.map((plot, idx) => {
                if (!plot) {
                  return (
                    <div key={idx}
                      className="rounded-2xl border-2 border-dashed border-amber-200 bg-amber-50/50 flex flex-col items-center justify-center min-h-[180px] gap-2">
                      <PotIcon className="w-10 h-10 opacity-40" />
                      <div className="text-xs text-gray-400">空きスロット</div>
                      <button
                        onClick={() => setSelectedPlot(idx)}
                        className="mt-1 bg-green-700 text-white text-xs px-3 py-1.5 rounded-xl hover:bg-green-600 active:scale-95 transition-all min-h-[36px]"
                        aria-label={`スロット${idx + 1}に植える`}>
                        植える
                      </button>
                    </div>
                  );
                }
                const type = getBonsaiTypeById(plot.typeId);
                if (!type) return null;
                return (
                  <BonsaiCard
                    key={plot.id} bonsai={plot} type={type}
                    hasWater={state.items.water > 0}
                    hasFertilizer={state.items.fertilizer > 0}
                    hasScissors={state.items.scissors > 0}
                    onWater={waterBonsai}
                    onFertilize={fertilizeBonsai}
                    onHarvest={harvestBonsai}
                  />
                );
              })}
            </div>

            {/* Expand plot button */}
            {nextExpandCost && (
              <button
                onClick={expandPlot}
                className={"mt-4 w-full py-3 rounded-2xl text-sm font-medium border-2 border-dashed transition-all flex items-center justify-center gap-2 min-h-[44px] " +
                  (state.coins >= nextExpandCost
                    ? "border-green-500 text-green-700 bg-green-50 hover:bg-green-100 active:scale-95"
                    : "border-gray-300 text-gray-400 cursor-not-allowed")}
                aria-label={`庭を拡張する (${nextExpandCost.toLocaleString()}コイン)`}
                disabled={state.coins < nextExpandCost}>
                <SeedlingIcon className="w-4 h-4" />
                庭を拡張する ({nextExpandCost.toLocaleString()}コイン)
              </button>
            )}
          </div>
        )}

        {/* SHOP TAB */}
        {tab === "shop" && (
          <div className="p-4 space-y-5">

            {/* Bonsai unlock */}
            <div>
              <h2 className="font-bold mb-3 text-sm flex items-center gap-1.5" style={{ color: "#1b4332" }}>
                <SeedlingIcon className="w-4 h-4" />
                盆栽の種類
              </h2>
              <div className="space-y-2">
                {BONSAI_TYPES.map(type => {
                  const unlocked = state.unlockedTypes.includes(type.id);
                  return (
                    <div key={type.id}
                      className="bg-white rounded-2xl p-3 border border-amber-100 flex items-center gap-3">
                      <BonsaiIcon icon={type.icon} className="w-10 h-10 flex-shrink-0" aria-label={type.name} />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{type.name}</div>
                        <div className="text-xs text-gray-500">{type.description}</div>
                        <div className="text-xs text-amber-700 mt-0.5">
                          植付: {type.basePrice}コイン / 売値: {type.sellPrice}コイン〜
                        </div>
                      </div>
                      {unlocked ? (
                        <span className="text-green-600 text-xs font-medium">解放済み</span>
                      ) : (
                        <button
                          onClick={() => unlockBonsaiType(type.id)}
                          className={"text-xs px-2 py-1.5 rounded-xl font-medium transition-all min-h-[36px] " +
                            (state.coins >= type.unlockCost
                              ? "bg-amber-500 text-white hover:bg-amber-400 active:scale-95"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed")}
                          aria-label={`${type.name}を${type.unlockCost.toLocaleString()}コインで解放する`}
                          disabled={state.coins < type.unlockCost}>
                          {type.unlockCost.toLocaleString()}コイン
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Items */}
            <div>
              <h2 className="font-bold mb-3 text-sm flex items-center gap-1.5" style={{ color: "#1b4332" }}>
                <ShopIcon className="w-4 h-4" />
                アイテム
              </h2>
              <div className="space-y-2">
                {ITEM_TYPES.map(item => (
                  <div key={item.id}
                    className="bg-white rounded-2xl p-3 border border-amber-100 flex items-center gap-3">
                    <ItemIcon icon={item.icon} className="w-10 h-10 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{item.name} (所持: {state.items[item.id]})</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                      <div className="text-xs text-green-600 font-medium">{item.effect}</div>
                    </div>
                    <button
                      onClick={() => buyItem(item.id)}
                      className={"text-xs px-2 py-1.5 rounded-xl font-medium transition-all min-h-[36px] " +
                        (state.coins >= item.price
                          ? "bg-blue-500 text-white hover:bg-blue-400 active:scale-95"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed")}
                      aria-label={`${item.name}を${item.price}コインで購入する`}
                      disabled={state.coins < item.price}>
                      {item.price}コイン
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STATS TAB */}
        {tab === "stats" && (
          <div className="p-4 space-y-4">
            <h2 className="font-bold text-lg flex items-center gap-2" style={{ color: "#1b4332" }}>
              <StatsIcon className="w-6 h-6" />
              統計
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-4 border border-amber-100 text-center">
                <div className="flex justify-center mb-1"><CoinIcon className="w-8 h-8" /></div>
                <div className="text-2xl font-bold text-amber-700">{state.coins.toLocaleString()}</div>
                <div className="text-xs text-gray-500">現在のコイン</div>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-amber-100 text-center">
                <div className="flex justify-center mb-1"><TrophyIcon className="w-8 h-8" /></div>
                <div className="text-2xl font-bold text-green-700">{state.totalEarned.toLocaleString()}</div>
                <div className="text-xs text-gray-500">総収益</div>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-amber-100 text-center">
                <div className="flex justify-center mb-1"><SeedlingIcon className="w-8 h-8" /></div>
                <div className="text-2xl font-bold" style={{ color: "#1b4332" }}>{state.totalHarvested}</div>
                <div className="text-xs text-gray-500">収穫した盆栽</div>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-amber-100 text-center">
                <div className="flex justify-center mb-1"><HomeIcon className="w-8 h-8" /></div>
                <div className="text-2xl font-bold text-blue-700">{state.maxPlots}</div>
                <div className="text-xs text-gray-500">庭のスロット数</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-amber-100">
              <h3 className="font-medium mb-2 text-sm">解放済み盆栽</h3>
              <div className="flex flex-wrap gap-2">
                {state.unlockedTypes.map(id => {
                  const t = BONSAI_TYPES.find(b => b.id === id);
                  return t ? (
                    <span key={id} className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                      <BonsaiIcon icon={t.icon} className="w-4 h-4" aria-label={t.name} />
                      {t.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom tab bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur border-t border-amber-200 flex z-30"
        aria-label="メインナビゲーション">
        {(["garden", "shop", "stats"] as Tab[]).map(t => {
          const config: { [k in Tab]: { label: string; icon: React.ReactNode } } = {
            garden: { label: "庭", icon: <HomeIcon className="w-5 h-5" /> },
            shop: { label: "ショップ", icon: <ShopIcon className="w-5 h-5" /> },
            stats: { label: "統計", icon: <StatsIcon className="w-5 h-5" /> },
          };
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={"flex-1 py-3 text-xs font-medium transition-all flex flex-col items-center gap-0.5 min-h-[56px] " +
                (tab === t ? "tab-active" : "text-gray-400 hover:text-gray-600")}
              aria-label={config[t].label}
              aria-pressed={tab === t}>
              {config[t].icon}
              {config[t].label}
            </button>
          );
        })}
      </nav>

      {/* Plant selector modal */}
      {selectedPlot !== null && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setSelectedPlot(null)}
          role="dialog" aria-modal="true" aria-label="植える盆栽を選択">
          <div className="bg-white w-full max-w-md mx-auto rounded-t-3xl p-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg" style={{ color: "#1b4332" }}>何を植えますか？</h3>
              <button
                onClick={() => setSelectedPlot(null)}
                className="text-gray-400 text-xl min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="モーダルを閉じる">
                ×
              </button>
            </div>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {BONSAI_TYPES.filter(type => state.unlockedTypes.includes(type.id)).map(type => (
                <button
                  key={type.id}
                  onClick={() => { plantBonsai(selectedPlot, type.id); setSelectedPlot(null); }}
                  className={"w-full flex items-center gap-3 p-3 rounded-2xl border text-left transition-all min-h-[60px] " +
                    (state.coins >= type.basePrice
                      ? "border-amber-200 hover:bg-amber-50 active:scale-95"
                      : "border-gray-200 opacity-50 cursor-not-allowed")}
                  aria-label={`${type.name}を${type.basePrice}コインで植える`}
                  disabled={state.coins < type.basePrice}>
                  <BonsaiIcon icon={type.icon} className="w-10 h-10 flex-shrink-0" aria-label={type.name} />
                  <div className="flex-1">
                    <div className="font-medium">{type.name}</div>
                    <div className="text-xs text-gray-500">{type.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-amber-700">{type.basePrice.toLocaleString()}コイン</div>
                    <div className="text-xs text-gray-400">成長: {type.growthTime}秒</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
