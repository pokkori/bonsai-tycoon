"use client";
import { BonsaiInstance, BonsaiType, calcSellValue } from "@/lib/bonsai";
import { BonsaiIcon, ItemIcon } from "@/components/BonsaiIcon";

interface BonsaiCardProps {
  bonsai: BonsaiInstance;
  type: BonsaiType;
  hasWater: boolean;
  hasFertilizer: boolean;
  hasScissors: boolean;
  onWater: (idx: number) => void;
  onFertilize: (idx: number) => void;
  onHarvest: (idx: number) => void;
}

function getIconSize(level: number, progress: number): string {
  const effective = Math.min(level * 20 + progress * 0.3, 100);
  if (effective < 20) return "w-8 h-8";
  if (effective < 40) return "w-10 h-10";
  if (effective < 60) return "w-12 h-12";
  if (effective < 80) return "w-14 h-14";
  return "w-16 h-16";
}

function formatTime(secs: number): string {
  if (secs <= 0) return "完了";
  if (secs < 60) return secs + "秒";
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return m + "分" + s + "秒";
}

export default function BonsaiCard({
  bonsai, type, hasWater, hasFertilizer, hasScissors,
  onWater, onFertilize, onHarvest
}: BonsaiCardProps) {
  const progress = bonsai.growthProgress ?? 0;
  const isReady = progress >= 100 || bonsai.state === "ready";
  const iconSize = getIconSize(bonsai.level, progress);
  const sellVal = calcSellValue(bonsai, false);
  const sellValScissors = calcSellValue(bonsai, true);
  const waterBonus = (1 + bonsai.waterings * 0.1);
  const fertBonus = (1 + bonsai.fertilizers * 0.25);
  const totalBonus = waterBonus * fertBonus;
  const remainingMs = isReady ? 0 : ((100 - progress) / 100) * type.growthTime * bonsai.level * 1000 / totalBonus;
  const remainingSecs = Math.ceil(remainingMs / 1000);

  return (
    <div
      className={"relative rounded-2xl p-3 border-2 transition-all duration-300 " +
        (isReady ? "border-yellow-400 bg-yellow-50 ready-glow" : "border-amber-200 bg-white/80")}
      role="article"
      aria-label={`${type.name} Lv.${bonsai.level} ${isReady ? "収穫準備完了" : "成長中"}`}
    >
      {/* Bonsai icon */}
      <div className="flex flex-col items-center mb-2">
        <BonsaiIcon
          icon={type.icon}
          className={iconSize + (isReady ? " grow-pulse" : "")}
          aria-label={type.name}
        />
        <div className="mt-1 font-semibold text-sm text-center" style={{ color: "#1b4332" }}>{type.name}</div>
        <div className="text-xs text-gray-500">Lv.{bonsai.level}</div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-amber-100 rounded-full h-2 mb-1 overflow-hidden" role="progressbar"
        aria-valuenow={Math.min(Math.round(progress), 100)} aria-valuemin={0} aria-valuemax={100}
        aria-label={`成長進捗 ${Math.min(Math.round(progress), 100)}%`}>
        <div className={"h-2 rounded-full transition-all duration-1000 " + (isReady ? "bg-yellow-400" : "progress-shimmer")}
          style={{ width: Math.min(progress, 100) + "%" }}/>
      </div>
      <div className="text-xs text-center text-gray-500 mb-2">
        {isReady
          ? <span className="text-yellow-600 font-bold">収穫準備完了！</span>
          : formatTime(remainingSecs)
        }
      </div>

      {/* Bonuses */}
      {(bonsai.waterings > 0 || bonsai.fertilizers > 0) && (
        <div className="flex gap-1 justify-center mb-2 text-xs">
          {bonsai.waterings > 0 && (
            <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
              <ItemIcon icon="water" className="w-3 h-3"/>
              x{bonsai.waterings}
            </span>
          )}
          {bonsai.fertilizers > 0 && (
            <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
              <ItemIcon icon="fertilizer" className="w-3 h-3"/>
              x{bonsai.fertilizers}
            </span>
          )}
        </div>
      )}

      {/* Sell value */}
      <div className="text-center text-xs mb-3">
        <span className="text-amber-700 font-medium">
          売値: {hasScissors ? sellValScissors.toLocaleString() : sellVal.toLocaleString()}コイン
          {hasScissors && <span className="text-green-600 ml-1">(+20%)</span>}
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex gap-1">
        {!isReady && (
          <>
            <button
              onClick={() => onWater(bonsai.plotIndex)}
              className={"flex-1 text-xs py-1.5 rounded-xl font-medium transition-all min-h-[36px] flex items-center justify-center gap-1 " +
                (hasWater ? "bg-blue-100 text-blue-700 active:scale-95 hover:bg-blue-200" : "bg-gray-100 text-gray-400 cursor-not-allowed")}
              aria-label="水やりをする"
              disabled={!hasWater}>
              <ItemIcon icon="water" className="w-3.5 h-3.5"/>
              水やり
            </button>
            <button
              onClick={() => onFertilize(bonsai.plotIndex)}
              className={"flex-1 text-xs py-1.5 rounded-xl font-medium transition-all min-h-[36px] flex items-center justify-center gap-1 " +
                (hasFertilizer ? "bg-green-100 text-green-700 active:scale-95 hover:bg-green-200" : "bg-gray-100 text-gray-400 cursor-not-allowed")}
              aria-label="肥料を与える"
              disabled={!hasFertilizer}>
              <ItemIcon icon="fertilizer" className="w-3.5 h-3.5"/>
              肥料
            </button>
          </>
        )}
        {isReady && (
          <button
            onClick={() => onHarvest(bonsai.plotIndex)}
            className="w-full py-2 rounded-xl text-sm font-bold bg-yellow-400 text-yellow-900 active:scale-95 hover:bg-yellow-300 transition-all shadow-md min-h-[44px]"
            aria-label={`${type.name}を収穫する`}>
            収穫する
          </button>
        )}
      </div>
    </div>
  );
}
