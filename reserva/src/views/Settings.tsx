import { useState } from 'react'
import { go } from '../App.tsx'
import {
  addService,
  removeService,
  updateShop,
  useShop,
  yen,
} from '../store.ts'

export function Settings() {
  const shop = useShop()
  const [svcName, setSvcName] = useState('')
  const [svcDur, setSvcDur] = useState('60')
  const [svcPrice, setSvcPrice] = useState('5000')

  function addNewService() {
    const name = svcName.trim()
    const durationMin = Number(svcDur)
    const priceYen = Number(svcPrice)
    if (!name || !durationMin || Number.isNaN(priceYen)) return
    addService({ name, durationMin, priceYen })
    setSvcName('')
  }

  return (
    <div className="mx-auto max-w-2xl px-4 pb-24">
      <header className="sticky top-0 z-10 -mx-4 flex items-center justify-between border-b border-gray-100 bg-[#f6f7f9]/90 px-4 py-3 backdrop-blur">
        <button onClick={() => go('owner')} className="text-sm text-gray-500">
          ← ダッシュボード
        </button>
        <div className="font-extrabold">設定</div>
        <span className="w-20" />
      </header>

      {/* 店舗情報 */}
      <section className="mt-5 rounded-2xl bg-white p-5">
        <h2 className="font-extrabold">店舗情報</h2>

        <label className="mt-4 block text-xs font-semibold text-gray-500">店名</label>
        <input
          value={shop.shopName}
          onChange={(e) => updateShop({ shopName: e.target.value })}
          className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5"
        />

        <label className="mt-3 block text-xs font-semibold text-gray-500">
          予約ページURL
        </label>
        <div className="mt-1 flex items-center rounded-xl border border-gray-200 px-3">
          <span className="text-sm text-gray-400">reserva.app/</span>
          <input
            value={shop.slug}
            onChange={(e) => updateShop({ slug: e.target.value })}
            className="flex-1 py-2.5 outline-none"
          />
        </div>

        <div className="mt-3 grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-500">開店</label>
            <input
              type="time"
              value={shop.openTime}
              onChange={(e) => updateShop({ openTime: e.target.value })}
              className="mt-1 w-full rounded-xl border border-gray-200 px-2 py-2.5"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500">閉店</label>
            <input
              type="time"
              value={shop.closeTime}
              onChange={(e) => updateShop({ closeTime: e.target.value })}
              className="mt-1 w-full rounded-xl border border-gray-200 px-2 py-2.5"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500">予約間隔</label>
            <select
              value={shop.slotStepMin}
              onChange={(e) => updateShop({ slotStepMin: Number(e.target.value) })}
              className="mt-1 w-full rounded-xl border border-gray-200 px-2 py-2.5"
            >
              <option value={15}>15分</option>
              <option value={30}>30分</option>
              <option value={60}>60分</option>
            </select>
          </div>
        </div>
      </section>

      {/* メニュー */}
      <section className="mt-4 rounded-2xl bg-white p-5">
        <h2 className="font-extrabold">メニュー</h2>
        <div className="mt-3 space-y-2">
          {shop.services.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3"
            >
              <div>
                <div className="font-semibold">{s.name}</div>
                <div className="text-sm text-gray-500">
                  {s.durationMin}分・{yen(s.priceYen)}
                </div>
              </div>
              <button
                onClick={() => removeService(s.id)}
                className="text-sm text-red-500"
              >
                削除
              </button>
            </div>
          ))}
          {shop.services.length === 0 && (
            <div className="py-4 text-center text-sm text-gray-400">
              メニューがありません
            </div>
          )}
        </div>

        <div className="mt-4 rounded-xl border border-dashed border-gray-300 p-4">
          <div className="text-xs font-semibold text-gray-500">メニューを追加</div>
          <input
            value={svcName}
            onChange={(e) => setSvcName(e.target.value)}
            placeholder="メニュー名（例: ジェルオフ）"
            className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2.5"
          />
          <div className="mt-2 grid grid-cols-2 gap-2">
            <label className="text-xs text-gray-500">
              所要時間（分）
              <input
                type="number"
                value={svcDur}
                onChange={(e) => setSvcDur(e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5"
              />
            </label>
            <label className="text-xs text-gray-500">
              料金（円）
              <input
                type="number"
                value={svcPrice}
                onChange={(e) => setSvcPrice(e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5"
              />
            </label>
          </div>
          <button
            onClick={addNewService}
            className="mt-3 w-full rounded-xl bg-violet-600 py-2.5 font-bold text-white"
          >
            追加する
          </button>
        </div>
      </section>

      <p className="mt-5 text-center text-xs text-gray-400">
        変更は自動保存され、この端末に記録されます。
      </p>
    </div>
  )
}
