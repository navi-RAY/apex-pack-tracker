import { useMemo, useState } from 'react'
import {
  customersFrom,
  formatDateLabel,
  serviceById,
  useShop,
  yen,
  type CustomerSummary,
} from '../store.ts'

export function Customers() {
  const shop = useShop()
  const [openName, setOpenName] = useState<string | null>(null)
  const customers = useMemo(() => customersFrom(shop), [shop])

  if (customers.length === 0) {
    return (
      <div className="rounded-2xl bg-white py-12 text-center text-sm text-gray-400">
        まだ顧客がいません
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="mb-1 flex items-center justify-between px-1 text-xs text-gray-400">
        <span>顧客 {customers.length}人</span>
        <span>利用額の多い順</span>
      </div>
      {customers.map((c) => (
        <CustomerRow
          key={c.name}
          c={c}
          open={openName === c.name}
          onToggle={() => setOpenName(openName === c.name ? null : c.name)}
        />
      ))}
    </div>
  )
}

function CustomerRow({
  c,
  open,
  onToggle,
}: {
  c: CustomerSummary
  open: boolean
  onToggle: () => void
}) {
  const shop = useShop()
  const history = useMemo(
    () =>
      shop.bookings
        .filter((b) => b.customerName.trim() === c.name && b.status !== 'cancelled')
        .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time)),
    [shop.bookings, c.name],
  )

  return (
    <div className="overflow-hidden rounded-2xl bg-white">
      <button onClick={onToggle} className="flex w-full items-center justify-between p-4 text-left">
        <div>
          <div className="font-bold">{c.name} 様</div>
          <div className="mt-0.5 text-xs text-gray-500">
            来店 {c.visits}回 ・ お気に入り: {c.favoriteService}
            {c.lastVisit && ` ・ 最終 ${formatDateLabel(c.lastVisit)}`}
          </div>
        </div>
        <div className="text-right">
          <div className="font-extrabold text-violet-700">{yen(c.totalSpent)}</div>
          {c.noshows > 0 && (
            <div className="text-xs text-red-500">無断 {c.noshows}回</div>
          )}
        </div>
      </button>

      {open && (
        <div className="border-t border-gray-100 px-4 py-3">
          {c.upcoming > 0 && (
            <div className="mb-2 inline-block rounded-full bg-violet-50 px-2 py-0.5 text-xs font-semibold text-violet-700">
              今後の予約 {c.upcoming}件
            </div>
          )}
          {c.contact && (
            <div className="mb-2 text-xs text-gray-500">連絡先: {c.contact}</div>
          )}
          <div className="text-xs font-semibold text-gray-400">来店・予約履歴</div>
          <div className="mt-1 space-y-1">
            {history.map((b) => {
              const svc = serviceById(shop, b.serviceId)
              return (
                <div key={b.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {formatDateLabel(b.date)} {b.time}
                  </span>
                  <span className="text-gray-800">
                    {svc?.name ?? '不明'}
                    {b.status === 'noshow' && (
                      <span className="ml-1 text-red-500">(無断)</span>
                    )}
                    {b.status === 'confirmed' && (
                      <span className="ml-1 text-violet-600">(予約中)</span>
                    )}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
