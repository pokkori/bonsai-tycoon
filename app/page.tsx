import Link from"next/link";
import{BONSAI_TYPES}from"@/lib/bonsai";

export default function HomePage(){
  return(
    <div className="min-h-screen flex flex-col">

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-16 text-center" style={{background:"linear-gradient(160deg,#e8f5e9 0%,#f5f0e8 50%,#fff8e7 100%)"}}>
        <div className="text-7xl mb-4" style={{filter:"drop-shadow(0 4px 8px rgba(0,0,0,0.15))"}}>🌲</div>
        <h1 className="text-3xl font-bold mb-2" style={{color:"#1b4332"}}>盆栽タイクーン</h1>
        <p className="text-xl font-light text-gray-600 mb-1">静かに育て、大きく稼ぐ</p>
        <p className="text-sm text-gray-500 mb-8">起動するたびに報酬あり。放置しても盆栽は育つ。</p>
        <Link href="/game"
          className="bg-green-800 text-white text-lg font-bold px-8 py-4 rounded-2xl shadow-lg hover:bg-green-700 active:scale-95 transition-all">
          🏡 庭を始める
        </Link>
        <p className="text-xs text-gray-400 mt-3">無料・登録不要・すぐ遊べる</p>
      </section>

      {/* Features */}
      <section className="px-6 py-10 bg-white">
        <h2 className="text-center font-bold text-xl mb-6" style={{color:"#1b4332"}}>放置ゲームの醍醐味</h2>
        <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
          {[
            {icon:"💰",title:"起動するたびに報酬",desc:"アプリを閉じている間も盆栽は育ち続ける。次に開いたとき、コインが溜まっている！"},
            {icon:"🌱",title:"育てて売る爽快感",desc:"松→梅→桜→紅葉→藤。希少な盆栽ほど高値で売れる。庭を拡張して収益を最大化！"},
            {icon:"💧",title:"水やり・肥料で加速",desc:"水やりや肥料で成長スピードがアップ。剪定ばさみを使えば売値も20%UP！"},
            {icon:"🏡",title:"庭を広げて大農場",desc:"最初は4スロット。コインを貯めて庭を拡張。いつかは大きな盆栽農園に！"},
          ].map((f,i)=>(
            <div key={i} className="flex gap-4 p-4 rounded-2xl bg-amber-50 border border-amber-100">
              <span className="text-3xl">{f.icon}</span>
              <div>
                <div className="font-semibold text-sm" style={{color:"#1b4332"}}>{f.title}</div>
                <div className="text-xs text-gray-600 mt-1">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bonsai preview */}
      <section className="px-6 py-10" style={{background:"#f5f0e8"}}>
        <h2 className="text-center font-bold text-xl mb-6" style={{color:"#1b4332"}}>育てられる盆栽</h2>
        <div className="flex justify-center gap-3 flex-wrap">
          {BONSAI_TYPES.map(b=>(
            <div key={b.id} className="bg-white rounded-2xl p-4 border border-amber-100 text-center w-24 shadow-sm">
              <div className="text-3xl mb-1">{b.emoji}</div>
              <div className="text-sm font-medium" style={{color:"#1b4332"}}>{b.name}</div>
              <div className="text-xs text-amber-700 mt-1">{b.sellPrice.toLocaleString()}コイン〜</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-12 text-center bg-green-800">
        <div className="text-5xl mb-4">🌲</div>
        <h2 className="text-2xl font-bold text-white mb-2">今すぐ始めよう</h2>
        <p className="text-green-200 text-sm mb-6">登録不要・完全無料・スマホ対応</p>
        <Link href="/game"
          className="bg-yellow-400 text-yellow-900 text-lg font-bold px-8 py-4 rounded-2xl shadow-lg hover:bg-yellow-300 active:scale-95 transition-all inline-block">
          🏡 庭を始める
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 text-center bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-400">© 2026 ポッコリラボ</p>
        <div className="flex justify-center gap-4 mt-2">
          <Link href="/legal" className="text-xs text-gray-400 hover:underline">特定商取引法</Link>
          <Link href="/privacy" className="text-xs text-gray-400 hover:underline">プライバシーポリシー</Link>
        </div>
      </footer>
    </div>
  );
}