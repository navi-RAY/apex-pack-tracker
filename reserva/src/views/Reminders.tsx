import { useMemo, useState } from 'react'
import {
  dateStr,
  formatDateLabel,
  markReminded,
  reminderMessage,
  serviceById,
  todayStr,
  useShop,
  type Booking,
} from '../store.ts'

export function Reminders() {
  const shop = useShop()

  // 明日以降の確定予約を対象にする（過去は除く）
  const targets = useMemo(() => {
    const today = todayStr()
    return shop.bookings
      .filter((b) => b.status === 'confirmed' && b.date >= today)
      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
  }, [shop.bookings])

  const tomorrow = useMemo(() => {
    const d = new Date(todayStr())
    d.setDate(d.getDate() + 1)
    return dateStr(d)
  }, [])

  const pending = targets.filter((b) => !b.reminded)

  return (
    <div>
      <div className="rounded-2xl bg-violet-50 p-4 text-sm text-violet-800">
        <div className="font-bold">前日リマインドで無断キャンセルを防ぐ</div>
        <div className="mt-1 text-violet-700">
          明日の予約 {targets.filter((b) => b.date === tomorrow).length}件 ／ 未送信{' '}
          {pending.length}件。ボタンひとつでお客様に確認メッセージを送れます。
        </div>
      </div>

      {targets.length === 0 && (
        <div className="mt-4 rounded-2xl bg-white py-12 text-center text-sm text-gray-400">
          リマインド対象の予約はありません
        </div>
      )}

      <div className="mt-3 space-y-3">
        {targets.map((b) => (
          <ReminderCard key={b.id} booking={b} isTomorrow={b.date === tomorrow} />
        ))}
      </div>
    </div>
  )
}

function ReminderCard({ booking, isTomorrow }: { booking: Booking; isTomorrow: boolean }) {
  const shop = useShop()
  const [open, setOpen] = useState(false)
  const svc = serviceById(shop, booking.serviceId)
  const msg = reminderMessage(shop, booking)

  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold">{booking.customerName} 様</span>
            {isTomorrow && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
                明日
              </span>
            )}
          </div>
          <div className="mt-0.5 text-sm text-gray-500">
            {formatDateLabel(booking.date)} {booking.time}〜 ／ {svc?.name ?? ''}
          </div>
        </div>
        {booking.reminded ? (
          <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700">
            送信済み ✓
          </span>
        ) : (
          <button
            onClick={() => markReminded(booking.id)}
            className="rounded-lg bg-violet-600 px-3 py-1.5 text-sm font-bold text-white"
          >
            リマインド送信
          </button>
        )}
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="mt-2 text-xs font-semibold text-violet-600"
      >
        {open ? '文面を閉じる' : '送信される文面を見る'}
      </button>

      {open && (
        <div className="mt-2 rounded-2xl rounded-tl-sm bg-[#8de055] p-3 text-sm whitespace-pre-wrap text-[#15201a]">
          {msg}
        </div>
      )}
    </div>
  )
}
