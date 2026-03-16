"use client";
import{useState}from"react";
import Link from"next/link";
import{BONSAI_TYPES,ITEM_TYPES,PLOT_EXPAND_COST,getBonsaiTypeById}from"@/lib/bonsai";
import{useBonsaiGame}from"@/hooks/useBonsaiGame";
import BonsaiCard from"@/components/BonsaiCard";

type Tab="garden"|"shop"|"stats";

export default function GamePage(){
  const{state,offlineBanner,floatCoins,notification,plantBonsai,waterBonsai,fertilizeBonsai,harvestBonsai,expandPlot,buyItem,unlockBonsaiType}=useBonsaiGame();
  const[tab,setTab]=useState<Tab>("garden");
  const[selectedPlot,setSelectedPlot]=useState<number|null>(null);

  if(!state)return(
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl">🌲 読み込み中...</div>
    </div>
  );

  const expandIndex=state.maxPlots-4;
  const nextExpandCost=expandIndex<PLOT_EXPAND_COST.length?PLOT_EXPAND_COST[expandIndex]:null;

  return(
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative">

      {/* Offline banner */}
      {offlineBanner&&offlineBanner.coins>0&&(
        <div className="fixed top-0 left-0 right-0 z-50 max-w-md mx-auto">
          <div className="offline-banner bg-amber-600 text-white text-center py-3 px-4 text-sm font-medium shadow-lg">
            🌙 お帰りなさい！放置中に {offlineBanner.coins.toLocaleString()} コイン獲得！
          </div>
        </div>
      )}

      {/* Notification */}
      {notification&&(
        <div className="fixed top-16 left-0 right-0 z-40 max-w-md mx-auto px-4">
          <div className="bg-gray-900/90 text-white text-center py-2 px-4 rounded-xl text-sm font-medium shadow-lg">
            {notification}
          </div>
        </div>
      )}

      {/* Float coins */}
      {floatCoins.map(fc=>(
        <div key={fc.id} className="fixed z-50 pointer-events-none font-bold text-yellow-500 text-lg float-coin"
          style={{left:fc.x+"%",top:fc.y+"%"}}>
          +{fc.amount.toLocaleString()}💰
        </div>
      ))}

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-amber-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg font-bold" style={{color:"#1b4332"}}>🌲 盆栽タイクーン</Link>
          <div className="flex items-center gap-3">
            <div className="bg-amber-50 border border-amber-300 rounded-xl px-3 py-1">
              <span className="text-amber-700 font-bold text-sm">💰 {state.coins.toLocaleString()}</span>
            </div>
            <div className="text-xs text-gray-500">{state.day}日目</div>
          </div>
        </div>
      </header>

      {/* Items bar */}
      <div className="flex gap-2 px-4 py-2 bg-amber-50 border-b border-amber-100">
        <div className="flex items-center gap-1 text-xs"><span>💧</span><span className="font-medium">{state.items.water}</span></div>
        <div className="flex items-center gap-1 text-xs"><span>🌿</span><span className="font-medium">{state.items.fertilizer}</span></div>
        <div className="flex items-center gap-1 text-xs"><span>✂️</span><span className="font-medium">{state.items.scissors}</span></div>
        <div className="ml-auto text-xs text-gray-400">アイテム在庫</div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-24">

        {/* GARDEN TAB */}
        {tab==="garden"&&(
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              {state.plots.map((plot,idx)=>{
                if(!plot){
                  return(
                    <div key={idx} className="rounded-2xl border-2 border-dashed border-amber-200 bg-amber-50/50 flex flex-col items-center justify-center min-h-[180px] gap-2">
                      <span className="text-3xl opacity-30">🪴</span>
                      <div className="text-xs text-gray-400">空きスロット</div>
                      <button onClick={()=>setSelectedPlot(idx)}
                        className="mt-1 bg-green-700 text-white text-xs px-3 py-1.5 rounded-xl hover:bg-green-600 active:scale-95 transition-all">
                        植える
                      </button>
                    </div>
                  );
                }
                const type=getBonsaiTypeById(plot.typeId);
                if(!type)return null;
                return(
                  <BonsaiCard key={plot.id} bonsai={plot} type={type}
                    hasWater={state.items.water>0}
                    hasFertilizer={state.items.fertilizer>0}
                    hasScissors={state.items.scissors>0}
                    onWater={waterBonsai} onFertilize={fertilizeBonsai} onHarvest={harvestBonsai}/>
                );
              })}
            </div>

            {/* Expand plot button */}
            {nextExpandCost&&(
              <button onClick={expandPlot}
                className={"mt-4 w-full py-3 rounded-2xl text-sm font-medium border-2 border-dashed transition-all "+(state.coins>=nextExpandCost?"border-green-500 text-green-700 bg-green-50 hover:bg-green-100 active:scale-95":"border-gray-300 text-gray-400 cursor-not-allowed")}>
                🌿 庭を拡張する ({nextExpandCost.toLocaleString()}コイン)
              </button>
            )}
          </div>
        )}
        {/* SHOP TAB */}
        {tab==="shop"&&(
          <div className="p-4 space-y-5">

            {/* Bonsai unlock */}
            <div>
              <h2 className="font-bold mb-3 text-sm" style={{color:"#1b4332"}}>🌱 盆栽の種類</h2>
              <div className="space-y-2">
                {BONSAI_TYPES.map(type=>{
                  const unlocked=state.unlockedTypes.includes(type.id);
                  return(
                    <div key={type.id} className="bg-white rounded-2xl p-3 border border-amber-100 flex items-center gap-3">
                      <span className="text-2xl">{type.emoji}</span>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{type.name}</div>
                        <div className="text-xs text-gray-500">{type.description}</div>
                        <div className="text-xs text-amber-700 mt-0.5">植付: {type.basePrice}コイン / 売値: {type.sellPrice}コイン〜</div>
                      </div>
                      {unlocked?(
                        <span className="text-green-600 text-xs font-medium">解放済み✓</span>
                      ):(
                        <button onClick={()=>unlockBonsaiType(type.id)}
                          className={"text-xs px-2 py-1.5 rounded-xl font-medium transition-all "+(state.coins>=type.unlockCost?"bg-amber-500 text-white hover:bg-amber-400 active:scale-95":"bg-gray-200 text-gray-400 cursor-not-allowed")}>
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
              <h2 className="font-bold mb-3 text-sm" style={{color:"#1b4332"}}>🛍️ アイテム</h2>
              <div className="space-y-2">
                {ITEM_TYPES.map(item=>(
                  <div key={item.id} className="bg-white rounded-2xl p-3 border border-amber-100 flex items-center gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{item.name} (所持: {state.items[item.id]})</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                      <div className="text-xs text-green-600 font-medium">{item.effect}</div>
                    </div>
                    <button onClick={()=>buyItem(item.id)}
                      className={"text-xs px-2 py-1.5 rounded-xl font-medium transition-all "+(state.coins>=item.price?"bg-blue-500 text-white hover:bg-blue-400 active:scale-95":"bg-gray-200 text-gray-400 cursor-not-allowed")}>
                      {item.price}コイン
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* STATS TAB */}
        {tab==="stats"&&(
          <div className="p-4 space-y-4">
            <h2 className="font-bold text-lg" style={{color:"#1b4332"}}>📊 統計</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-4 border border-amber-100 text-center">
                <div className="text-3xl mb-1">💰</div>
                <div className="text-2xl font-bold text-amber-700">{state.coins.toLocaleString()}</div>
                <div className="text-xs text-gray-500">現在のコイン</div>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-amber-100 text-center">
                <div className="text-3xl mb-1">🏆</div>
                <div className="text-2xl font-bold text-green-700">{state.totalEarned.toLocaleString()}</div>
                <div className="text-xs text-gray-500">総収益</div>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-amber-100 text-center">
                <div className="text-3xl mb-1">🌱</div>
                <div className="text-2xl font-bold" style={{color:"#1b4332"}}>{state.totalHarvested}</div>
                <div className="text-xs text-gray-500">収穫した盆栽</div>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-amber-100 text-center">
                <div className="text-3xl mb-1">🏡</div>
                <div className="text-2xl font-bold text-blue-700">{state.maxPlots}</div>
                <div className="text-xs text-gray-500">庭のスロット数</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-amber-100">
              <h3 className="font-medium mb-2 text-sm">解放済み盆栽</h3>
              <div className="flex flex-wrap gap-2">
                {state.unlockedTypes.map(id=>{
                  const t=BONSAI_TYPES.find(b=>b.id===id);
                  return t?<span key={id} className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs">{t.emoji} {t.name}</span>:null;
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur border-t border-amber-200 flex z-30">
        {(["garden","shop","stats"] as Tab[]).map(t=>{
          const labels:{[k in Tab]:string}={garden:"庭 🏡",shop:"ショップ 🛍️",stats:"統計 📊"};
          return(
            <button key={t} onClick={()=>setTab(t)}
              className={"flex-1 py-3 text-xs font-medium transition-all "+(tab===t?"tab-active":"text-gray-400 hover:text-gray-600")}>
              {labels[t]}
            </button>
          );
        })}
      </nav>

      {/* Plant selector modal */}
      {selectedPlot!==null&&(
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={()=>setSelectedPlot(null)}>
          <div className="bg-white w-full max-w-md mx-auto rounded-t-3xl p-5" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg" style={{color:"#1b4332"}}>何を植えますか？</h3>
              <button onClick={()=>setSelectedPlot(null)} className="text-gray-400 text-xl">✕</button>
            </div>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {BONSAI_TYPES.filter(type=>state.unlockedTypes.includes(type.id)).map(type=>(
                <button key={type.id} onClick={()=>{plantBonsai(selectedPlot,type.id);setSelectedPlot(null);}}
                  className={"w-full flex items-center gap-3 p-3 rounded-2xl border text-left transition-all "+(state.coins>=type.basePrice?"border-amber-200 hover:bg-amber-50 active:scale-95":"border-gray-200 opacity-50 cursor-not-allowed")}>
                  <span className="text-3xl">{type.emoji}</span>
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