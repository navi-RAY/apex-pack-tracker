import { go } from '../App.tsx'

function Pricing({
  name,
  price,
  unit,
  features,
  highlight,
}: {
  name: string
  price: string
  unit: string
  features: string[]
  highlight?: boolean
}) {
  return (
    <div
      className={
        'rounded-2xl border p-6 ' +
        (highlight
          ? 'border-violet-500 bg-violet-50 shadow-lg shadow-violet-100'
          : 'border-gray-200 bg-white')
      }
    >
      {highlight && (
        <div className="mb-2 inline-block rounded-full bg-violet-600 px-2.5 py-0.5 text-xs font-bold text-white">
          おすすめ
        </div>
      )}
      <div className="text-lg font-bold">{name}</div>
      <div className="mt-2 flex items-end gap-1">
        <span className="text-3xl font-extrabold">{price}</span>
        <span className="mb-1 text-sm text-gray-500">{unit}</span>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-gray-700">
        {features.map((f) => (
          <li key={f} className="flex gap-2">
            <span className="text-violet-600">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Landing() {
  return (
    <div className="mx-auto max-w-5xl px-5 pb-20">
      {/* ヘッダー */}
      <header className="flex items-center justify-between py-5">
        <div className="text-xl font-extrabold tracking-tight">
          Reserva<span className="text-violet-600">.</span>
        </div>
        <button
          onClick={() => go('owner')}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white"
        >
          管理画面を見る
        </button>
      </header>

      {/* ヒーロー */}
      <section className="pt-10 pb-12 text-center">
        <div className="mb-4 inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
          1人店・自宅サロンのための予約システム
        </div>
        <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
          予約帳もLINEも、
          <br />
          これひとつに。
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-gray-600">
          お客様はネットから24時間予約。前日リマインドで無断キャンセルを減らし、
          二重予約のミスをなくす。1人で店を回すあなたのための、いちばんシンプルな予約システムです。
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => go('owner')}
            className="w-full rounded-xl bg-violet-600 px-6 py-3 font-bold text-white shadow-lg shadow-violet-200 sm:w-auto"
          >
            管理画面のデモを触る
          </button>
          <button
            onClick={() => go('book')}
            className="w-full rounded-xl border border-gray-300 bg-white px-6 py-3 font-bold text-gray-800 sm:w-auto"
          >
            お客様の予約画面を見る
          </button>
        </div>
        <p className="mt-3 text-xs text-gray-400">
          ※ 登録不要のデモです。データはこの端末にだけ保存されます。
        </p>
      </section>

      {/* 課題 */}
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          ['😵', '二重予約のミス', '手帳とLINEの転記でうっかりダブルブッキング'],
          ['💸', '無断キャンセル', '1人店は1枠の損失が大きい。月数件で売上が削れる'],
          ['🌙', '営業時間外の取り逃し', '施術中・就寝中の予約に対応できず機会損失'],
        ].map(([emoji, title, body]) => (
          <div key={title} className="rounded-2xl bg-white p-5">
            <div className="text-2xl">{emoji}</div>
            <div className="mt-2 font-bold">{title}</div>
            <div className="mt-1 text-sm text-gray-600">{body}</div>
          </div>
        ))}
      </section>

      {/* 機能 */}
      <section className="mt-14">
        <h2 className="text-center text-2xl font-extrabold">Reserva でできること</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            ['公開予約ページ', 'あなた専用のURLを共有するだけ。お客様が空き枠を選んで自分で予約できます。'],
            ['予約管理ダッシュボード', '今日・今週の予約がひと目で。追加・変更・キャンセルもここで完結。'],
            ['自動リマインド', '前日に自動でメール（有料プランはLINE）。無断キャンセルを減らします。'],
            ['顧客カルテ', '誰がいつ来たか、好みのメニューを記録。リピートに繋げます。'],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-gray-100 bg-white p-6">
              <div className="font-bold text-violet-700">{title}</div>
              <div className="mt-1.5 text-sm text-gray-600">{body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 料金 */}
      <section className="mt-14">
        <h2 className="text-center text-2xl font-extrabold">料金プラン</h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          まずは無料から。必要になったらアップグレード。
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Pricing
            name="Free"
            price="¥0"
            unit="/月"
            features={['予約 月30件まで', 'メールリマインド', '公開予約ページ']}
          />
          <Pricing
            name="Pro"
            price="¥1,480"
            unit="/月"
            highlight
            features={['予約 無制限', 'LINEリマインド', '顧客カルテ', 'メニュー複数設定']}
          />
          <Pricing
            name="Business"
            price="¥3,980"
            unit="/月"
            features={['複数スタッフ', '事前決済', '売上レポート', 'Pro の全機能']}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 rounded-3xl bg-gray-900 px-6 py-12 text-center text-white">
        <h2 className="text-2xl font-extrabold">まずはデモを触ってみてください</h2>
        <p className="mt-2 text-sm text-gray-300">
          実際の管理画面とお客様の予約フローを、その場で体験できます。
        </p>
        <button
          onClick={() => go('owner')}
          className="mt-6 rounded-xl bg-violet-600 px-8 py-3 font-bold text-white"
        >
          管理画面のデモを開く
        </button>
      </section>

      <footer className="mt-12 text-center text-xs text-gray-400">
        Reserva — 予約SaaSのプロトタイプ / 企画書: docs/saas/PLAN.md
      </footer>
    </div>
  )
}
