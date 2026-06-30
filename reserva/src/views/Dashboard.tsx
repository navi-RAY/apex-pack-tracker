import { useMemo, useState } from 'react'
import { go } from '../App.tsx'
import {
  addBooking,
  dateStr,
  formatDateLabel,
  resetDemo,
  serviceById,
  setBookingStatus,
  slotsForDate,
  todayStr,
  useShop,
  yen,
  type Booking,
  type BookingStatus,
} from '../store.ts'

const STATUS_META: Record<BookingStatus, { label: string; cls: string }> = {
  confirmed: { label: '予約確定', cls: 'bg-violet-100 text-violet-700' },
  done: { label: '来店済み', cls: 'bg-green-100 text-green-700' },
  noshow: { label: '無断キャンセル', cls: 'bg-red-100 text-red-600' },
  cancelled: { label: '取消', cls: 'bg-gray-100 text-gray-500' },
}

type Range = 'today' | 'week' | 'all'

function withinThisWeek(ymd: string): boolean {
  const today = new Date(todayStr())
  const start = new Date(today)
  start.setDate(today.getDate() - today.getDay())
  const end = new Date(start)
  end.setDate(start.getDate() + 7)
  const d = new Date(ymd)
  return d >= start && d < end
}

function Kpi({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-1 text-2xl font-extrabold">{value}</div>
      {sub && <div className="text-xs text-gray-400">{sub}</div>}
    </div>
  )
}

export function Dashboard() {
  const shop = useShop()
  const [range, setRange] = useState<Range>('today')
  const [adding, setAdding] = useState(false)

  const active = shop.bookings.filter((b) => b.status !== 'cancelled')

  const kpi = useMemo(() => {
    const today = todayStr()
    const todays = active.filter((b) => b.date === today)
    const weekSales = active
      .filter((b) => withinThisWeek(b.date) && b.status !== 'noshow')
      .reduce((sum, b) => sum + (serviceById(shop, b.serviceId)?.priceYen ?? 0), 0)
    const total = shop.bookings.filter((b) => b.status === 'done' || b.status === 'noshow')
    const noshow = shop.bookings.filter((b) => b.status === 'noshow').length
    const rate = total.length ? Math.round((noshow / total.length) * 100) : 0
    return { todayCount: todays.length, weekSales, noshowRate: rate }
  }, [active, shop])

  const list = useMemo(() => {
    let items = [...shop.bookings]
    if (range === 'today') items = items.filter((b) => b.date === todayStr())
    else if (range === 'week') items = items.filter((b) => withinThisWeek(b.date))
    items.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    return items
  }, [shop.bookings, range])

  return (
    <div className="mx-auto max-w-2xl px-4 pb-24">
      {/* ナビ */}
      <header className="sticky top-0 z-10 -mx-4 flex items-center justify-between border-b border-gray-100 bg-[#f6f7f9]/90 px-4 py-3 backdrop-blur">
        <button onClick={() => go('landing')} className="text-sm text-gray-500">
          ← トップ
        </button>
        <div className="font-extrabold">{shop.shopName}</div>
        <button onClick={() => go('settings')} className="text-sm text-gray-500">
          設定
        </button>
      </header>

      <div className="flex items-center justify-between pt-5">
        <h1 className="text-lg font-extrabold">予約ダッシュボード</h1>
        <button
          onClick={() => go('book')}
          className="text-xs font-semibold text-violet-600"
        >
          公開予約ページ →
        </button>
      </div>

      {/* KPI */}
      <div className="mt-3 grid grid-cols-3 gap-3">
        <Kpi label="今日の予約" value={`${kpi.todayCount}件`} />
        <Kpi label="今週の売上見込" value={yen(kpi.weekSales)} />
        <Kpi label="無断キャンセル率" value={`${kpi.noshowRate}%`} sub="実績ベース" />
      </div>

      {/* フィルタ + 追加 */}
      <div className="mt-5 flex items-center justify-between">
        <div className="inline-flex rounded-xl bg-gray-200/60 p-1 text-sm">
          {(
            [
              ['today', '今日'],
              ['week', '今週'],
              ['all', 'すべて'],
            ] as [Range, string][]
          ).map(([r, label]) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={
                'rounded-lg px-3 py-1.5 font-semibold ' +
                (range === r ? 'bg-white shadow-sm' : 'text-gray-500')
              }
            >
              {label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setAdding(true)}
          className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white"
        >
          ＋ 予約追加
        </button>
      </div>

      {/* 一覧 */}
      <div className="mt-4 space-y-2">
        {list.length === 0 && (
          <div className="rounded-2xl bg-white py-12 text-center text-sm text-gray-400">
            この期間の予約はありません
          </div>
        )}
        {list.map((b) => (
          <BookingCard key={b.id} booking={b} showDate={range !== 'today'} />
        ))}
      </div>

      {adding && <AddBookingSheet onClose={() => setAdding(false)} />}

      <div className="mt-10 text-center">
        <button onClick={resetDemo} className="text-xs text-gray-400 underline">
          デモデータを初期状態に戻す
        </button>
      </div>
    </div>
  )
}

function BookingCard({ booking, showDate }: { booking: Booking; showDate: boolean }) {
  const shop = useShop()
  const svc = serviceById(shop, booking.serviceId)
  const meta = STATUS_META[booking.status]
  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-extrabold tabular-nums">{booking.time}</span>
            {showDate && (
              <span className="text-xs text-gray-400">{formatDateLabel(booking.date)}</span>
            )}
          </div>
          <div className="mt-0.5 font-semibold">{booking.customerName} 様</div>
          <div className="text-sm text-gray-500">
            {svc ? `${svc.name}・${svc.durationMin}分・${yen(svc.priceYen)}` : 'メニュー不明'}
          </div>
          {booking.note && (
            <div className="mt-1 text-xs text-gray-400">📝 {booking.note}</div>
          )}
        </div>
        <span className={'rounded-full px-2 py-0.5 text-xs font-bold ' + meta.cls}>
          {meta.label}
        </span>
      </div>

      {booking.status === 'confirmed' && (
        <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3">
          <button
            onClick={() => setBookingStatus(booking.id, 'done')}
            className="flex-1 rounded-lg bg-green-50 py-1.5 text-sm font-semibold text-green-700"
          >
            来店済み
          </button>
          <button
            onClick={() => setBookingStatus(booking.id, 'noshow')}
            className="flex-1 rounded-lg bg-red-50 py-1.5 text-sm font-semibold text-red-600"
          >
            無断キャンセル
          </button>
          <button
            onClick={() => setBookingStatus(booking.id, 'cancelled')}
            className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-semibold text-gray-500"
          >
            取消
          </button>
        </div>
      )}
    </div>
  )
}

function AddBookingSheet({ onClose }: { onClose: () => void }) {
  const shop = useShop()
  const [serviceId, setServiceId] = useState(shop.services[0]?.id ?? '')
  const [date, setDate] = useState(todayStr())
  const [time, setTime] = useState('')
  const [name, setName] = useState('')

  const svc = serviceById(shop, serviceId)
  const slots = useMemo(
    () => (svc ? slotsForDate(shop, date, svc.durationMin) : []),
    [shop, date, svc],
  )

  const dateOptions = useMemo(() => {
    const out: string[] = []
    const base = new Date(todayStr())
    for (let i = 0; i < 14; i++) {
      const d = new Date(base)
      d.setDate(base.getDate() + i)
      out.push(dateStr(d))
    }
    return out
  }, [])

  const canSubmit = serviceId && date && time && name.trim()

  function submit() {
    if (!canSubmit) return
    addBooking({ serviceId, date, time, customerName: name.trim(), customerContact: '', note: '' })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-20 flex items-end justify-center bg-black/40 sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-3xl bg-white p-5 sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 text-lg font-extrabold">予約を追加</div>

        <label className="text-xs font-semibold text-gray-500">メニュー</label>
        <select
          value={serviceId}
          onChange={(e) => {
            setServiceId(e.target.value)
            setTime('')
          }}
          className="mt-1 mb-3 w-full rounded-xl border border-gray-200 px-3 py-2.5"
        >
          {shop.services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}（{s.durationMin}分・{yen(s.priceYen)}）
            </option>
          ))}
        </select>

        <label className="text-xs font-semibold text-gray-500">日付</label>
        <select
          value={date}
          onChange={(e) => {
            setDate(e.target.value)
            setTime('')
          }}
          className="mt-1 mb-3 w-full rounded-xl border border-gray-200 px-3 py-2.5"
        >
          {dateOptions.map((d) => (
            <option key={d} value={d}>
              {formatDateLabel(d)}
            </option>
          ))}
        </select>

        <label className="text-xs font-semibold text-gray-500">時間</label>
        <div className="mt-1 mb-3 grid grid-cols-4 gap-2">
          {slots.map((s) => (
            <button
              key={s.time}
              disabled={!s.available}
              onClick={() => setTime(s.time)}
              className={
                'rounded-lg py-2 text-sm font-semibold ' +
                (time === s.time
                  ? 'bg-violet-600 text-white'
                  : s.available
                    ? 'bg-gray-100 text-gray-800'
                    : 'cursor-not-allowed bg-gray-50 text-gray-300 line-through')
              }
            >
              {s.time}
            </button>
          ))}
        </div>

        <label className="text-xs font-semibold text-gray-500">お客様名</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="山田 花子"
          className="mt-1 mb-4 w-full rounded-xl border border-gray-200 px-3 py-2.5"
        />

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-200 py-3 font-semibold text-gray-600"
          >
            やめる
          </button>
          <button
            onClick={submit}
            disabled={!canSubmit}
            className="flex-1 rounded-xl bg-violet-600 py-3 font-bold text-white disabled:opacity-40"
          >
            登録する
          </button>
        </div>
      </div>
    </div>
  )
}
