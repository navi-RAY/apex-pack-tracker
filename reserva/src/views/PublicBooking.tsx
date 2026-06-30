import { useMemo, useState } from 'react'
import { go } from '../App.tsx'
import {
  addBooking,
  dateStr,
  formatDateLabel,
  serviceById,
  slotsForDate,
  todayStr,
  useShop,
  yen,
} from '../store.ts'

type Step = 'service' | 'datetime' | 'detail' | 'done'

export function PublicBooking() {
  const shop = useShop()
  const [step, setStep] = useState<Step>('service')
  const [serviceId, setServiceId] = useState('')
  const [date, setDate] = useState(todayStr())
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')

  const svc = serviceById(shop, serviceId)

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

  const slots = useMemo(
    () => (svc ? slotsForDate(shop, date, svc.durationMin) : []),
    [shop, date, svc],
  )

  function confirm() {
    if (!svc || !time || !name.trim()) return
    addBooking({
      serviceId,
      date,
      time,
      customerName: name.trim(),
      customerContact: contact.trim(),
      note: '',
    })
    setStep('done')
  }

  return (
    <div className="mx-auto min-h-svh max-w-md bg-white">
      {/* お店ヘッダー */}
      <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 px-5 pb-8 pt-6 text-white">
        <button
          onClick={() => go('owner')}
          className="text-xs text-white/70"
        >
          ← 管理画面に戻る
        </button>
        <div className="mt-3 text-2xl font-extrabold">{shop.shopName}</div>
        <div className="mt-1 text-sm text-white/80">
          ネット予約 / 営業 {shop.openTime}〜{shop.closeTime}
        </div>
      </div>

      <div className="px-5 py-6">
        {step !== 'done' && <Stepper step={step} />}

        {step === 'service' && (
          <div className="space-y-3">
            <h2 className="font-extrabold">メニューを選ぶ</h2>
            {shop.services.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setServiceId(s.id)
                  setTime('')
                  setStep('datetime')
                }}
                className="flex w-full items-center justify-between rounded-2xl border border-gray-200 p-4 text-left active:bg-gray-50"
              >
                <div>
                  <div className="font-bold">{s.name}</div>
                  <div className="text-sm text-gray-500">{s.durationMin}分</div>
                </div>
                <div className="font-extrabold text-violet-700">{yen(s.priceYen)}</div>
              </button>
            ))}
          </div>
        )}

        {step === 'datetime' && svc && (
          <div>
            <h2 className="font-extrabold">日時を選ぶ</h2>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
              {dateOptions.map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setDate(d)
                    setTime('')
                  }}
                  className={
                    'shrink-0 rounded-xl px-3 py-2 text-sm font-semibold ' +
                    (date === d ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-700')
                  }
                >
                  {formatDateLabel(d)}
                </button>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-4 gap-2">
              {slots.map((s) => (
                <button
                  key={s.time}
                  disabled={!s.available}
                  onClick={() => setTime(s.time)}
                  className={
                    'rounded-lg py-2.5 text-sm font-semibold ' +
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
            {slots.every((s) => !s.available) && (
              <div className="mt-3 text-center text-sm text-gray-400">
                この日は空きがありません
              </div>
            )}

            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setStep('service')}
                className="rounded-xl border border-gray-200 px-4 py-3 font-semibold text-gray-600"
              >
                戻る
              </button>
              <button
                onClick={() => setStep('detail')}
                disabled={!time}
                className="flex-1 rounded-xl bg-violet-600 py-3 font-bold text-white disabled:opacity-40"
              >
                次へ
              </button>
            </div>
          </div>
        )}

        {step === 'detail' && svc && (
          <div>
            <h2 className="font-extrabold">お客様情報</h2>
            <div className="mt-3 rounded-2xl bg-violet-50 p-4 text-sm">
              <div className="font-bold">{svc.name}</div>
              <div className="mt-0.5 text-gray-600">
                {formatDateLabel(date)} {time}〜 ／ {svc.durationMin}分 ／ {yen(svc.priceYen)}
              </div>
            </div>

            <label className="mt-4 block text-xs font-semibold text-gray-500">お名前</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="山田 花子"
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5"
            />

            <label className="mt-3 block text-xs font-semibold text-gray-500">
              メール or 電話番号
            </label>
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="hanako@example.com"
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5"
            />

            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setStep('datetime')}
                className="rounded-xl border border-gray-200 px-4 py-3 font-semibold text-gray-600"
              >
                戻る
              </button>
              <button
                onClick={confirm}
                disabled={!name.trim()}
                className="flex-1 rounded-xl bg-violet-600 py-3 font-bold text-white disabled:opacity-40"
              >
                この内容で予約する
              </button>
            </div>
          </div>
        )}

        {step === 'done' && svc && (
          <div className="py-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
              ✓
            </div>
            <h2 className="mt-4 text-xl font-extrabold">予約が完了しました</h2>
            <div className="mx-auto mt-4 max-w-xs rounded-2xl bg-gray-50 p-4 text-left text-sm">
              <Row label="お店" value={shop.shopName} />
              <Row label="メニュー" value={svc.name} />
              <Row label="日時" value={`${formatDateLabel(date)} ${time}〜`} />
              <Row label="お名前" value={`${name} 様`} />
            </div>
            <p className="mt-4 text-xs text-gray-400">
              前日にリマインドをお送りします（デモのため実際の送信はありません）。
            </p>
            <button
              onClick={() => go('owner')}
              className="mt-6 rounded-xl bg-gray-900 px-6 py-3 font-bold text-white"
            >
              管理画面で予約を確認する
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function Stepper({ step }: { step: Step }) {
  const steps: Step[] = ['service', 'datetime', 'detail']
  const idx = steps.indexOf(step)
  return (
    <div className="mb-5 flex items-center gap-2">
      {steps.map((s, i) => (
        <div
          key={s}
          className={
            'h-1.5 flex-1 rounded-full ' + (i <= idx ? 'bg-violet-600' : 'bg-gray-200')
          }
        />
      ))}
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-gray-400">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  )
}
