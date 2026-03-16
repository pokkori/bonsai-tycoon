import Link from"next/link";
export default function LegalPage(){
  return(
    <div className="min-h-screen py-12 px-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8" style={{color:"#1b4332"}}>特定商取引法に基づく表記</h1>
      <table className="w-full text-sm border-collapse">
        <tbody>
          {[
            ["販売業者","ポッコリラボ"],
            ["運営責任者","代表 新美"],
            ["所在地","〒475-0077 愛知県半田市元山町"],
            ["お問い合わせ","X(Twitter): @levona_design へのDM"],
            ["販売価格","無料（本アプリは現在無料でご利用いただけます）"],
            ["支払方法","なし（無料サービス）"],
            ["サービス提供時期","お申し込み後、即時ご利用いただけます"],
          ].map(([k,v],i)=>(
            <tr key={i} className="border-b border-gray-200">
              <td className="py-3 pr-4 font-medium text-gray-600 w-40 align-top">{k}</td>
              <td className="py-3 text-gray-800">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-8">
        <Link href="/" className="text-green-700 hover:underline text-sm">← トップへ戻る</Link>
      </div>
    </div>
  );
}