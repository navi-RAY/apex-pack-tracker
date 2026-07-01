import { useMemo, useState } from 'react'
import {
  dateStr,
  formatDateLabel,
  serviceById,
  todayStr,
  useShop,
  yen,
} from '../store.ts'

const WD = ['日', '月', '火', '水', '木', '金', '土']

export function Calendar() {
  const shop = useShop()
  const today = todayStr()
  const [cursor, setCursor] = useState(() => {
    const d = new Date(today)
    return { year: d.getFullYear(), month: d.getMonth() } // month: 0-11
  })
  const [selected, setSelected] = useState(today)

  // その月のカレンダーグリッド（前後の空白セル含む）
  const cells = useMemo(() => {
    const first = new Date(cursor.year, cursor.month, 1)
    const startPad = first.getDay()
    const daysInMonth = new Date(cursor.year, cursor.month + 1, 0).getDate()
    const arr: (string | null)[] = []
    for (let i = 0; i < startPad; i++) arr.push(null)
    for (let d = 1; d <= daysInMonth; d++) {
      arr.push(dateStr(new Date(cursor.year, cursor.month, d)))
    }
    while (arr.length % 7 !== 0) arr.push(null)
    return arr
  }, [cursor])

  // 日付ごとの有効予約件数
  const countByDate = useMemo(() => {
    const m = new Map<string, number>()
    for (const b of shop.bookings) {
      if (b.status === 'cancelled' || b.status === 'noshow') continue
      m.set(b.date, (m.get(b.date) ?? 0) + 1)
    }
    return m
  }, [shop.bookings])

  const dayBookings = useMemo(
    () =>
      shop.bookings
        .filter((b) => b.date === selected && b.status !== 'cancelled')
        .sort((a, b) => a.time.localeCompare(b.time)),
    [shop.bookings, selected],
  )

  function move(delta: number) {
    const m = cursor.month + delta
    setCursor({
      year: cursor.year + Math.floor(m / 12),
      month: ((m % 12) + 12) % 12,
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between px-1">
        <button onClick={() => move(-1)} className="px-3 py-1 text-gray-500">
          ‹
        </button>
        <div className="font-extrabold">
          {cursor.year}年 {cursor.month + 1}月
        </div>
        <button onClick={() => move(1)} className="px-3 py-1 text-gray-500">
          ›
        </button>
      </div>

      <div className="mt-2 grid grid-cols-7 gap-1 text-center text-xs text-gray-400">
        {WD.map((w) => (
          <div key={w} className="py-1">
            {w}
          </div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <div key={i} />
          const day = Number(d.split('-')[2])
          const count = countByDate.get(d) ?? 0
          const isToday = d === today
          const isSel = d === selected
          return (
            <button
              key={d}
              onClick={() => setSelected(d)}
              className={
                'flex aspect-square flex-col items-center justify-center rounded-xl text-sm ' +
                (isSel
                  ? 'bg-violet-600 text-white'
                  : isToday
                    ? 'bg-violet-100 text-violet-700'
                    : 'bg-white text-gray-700')
              }
            >
              <span className="font-semibold">{day}</span>
              {count > 0 && (
                <span
                  className={
                    'mt-0.5 h-1.5 w-1.5 rounded-full ' +
                    (isSel ? 'bg-white' : 'bg-violet-500')
                  }
                />
              )}
            </button>
          )
        })}
      </div>

      {/* 選択日の予約 */}
      <div className="mt-5">
        <div className="mb-2 font-bold">{formatDateLabel(selected)} の予約</div>
        {dayBookings.length === 0 && (
          <div className="rounded-2xl bg-white py-8 text-center text-sm text-gray-400">
            予約はありません
          </div>
        )}
        <div className="space-y-2">
          {dayBookings.map((b) => {
            const svc = serviceById(shop, b.serviceId)
            return (
              <div
                key={b.id}
                className="flex items-center justify-between rounded-2xl bg-white p-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-extrabold tabular-nums">{b.time}</span>
                    {b.status === 'done' && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                        来店済み
                      </span>
                    )}
                  </div>
                  <div className="font-semibold">{b.customerName} 様</div>
                  <div className="text-sm text-gray-500">{svc?.name ?? '不明'}</div>
                </div>
                <div className="font-bold text-violet-700">
                  {svc ? yen(svc.priceYen) : ''}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
