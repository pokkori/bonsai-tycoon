import Link from"next/link";
export default function PrivacyPage(){
  return(
    <div className="min-h-screen py-12 px-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8" style={{color:"#1b4332"}}>プライバシーポリシー</h1>
      <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="font-bold text-base mb-2">1. 収集する情報</h2>
          <p>本アプリはゲームの進行状況（コイン、盆栽の状態など）をお使いのブラウザのlocalStorageに保存します。この情報は端末内にのみ保存され、外部サーバーには送信されません。</p>
        </section>
        <section>
          <h2 className="font-bold text-base mb-2">2. 個人情報の取得</h2>
          <p>本アプリは個人情報（氏名、メールアドレス等）を一切収集しません。アカウント登録は不要です。</p>
        </section>
        <section>
          <h2 className="font-bold text-base mb-2">3. アクセス解析</h2>
          <p>本サイトではサービス改善のためアクセス解析ツールを使用することがあります。これらのツールはCookieを使用することがありますが、個人を特定する情報は収集しません。</p>
        </section>
        <section>
          <h2 className="font-bold text-base mb-2">4. お問い合わせ</h2>
          <p>プライバシーに関するお問い合わせは X(Twitter): @levona_design へのDMにてお願いいたします。</p>
        </section>
        <section>
          <h2 className="font-bold text-base mb-2">5. 改定</h2>
          <p>本ポリシーは必要に応じて改定することがあります。</p>
          <p className="mt-1 text-gray-500">制定日: 2026年3月16日 / 運営: ポッコリラボ</p>
        </section>
      </div>
      <div className="mt-8">
        <Link href="/" className="text-green-700 hover:underline text-sm">← トップへ戻る</Link>
      </div>
    </div>
  );
}