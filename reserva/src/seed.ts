import type { Booking, ShopState } from './store.ts'

// store.ts と循環参照しないよう、seed 内で完結する小さなヘルパーを持つ
function pad(n: number): string {
  return String(n).padStart(2, '0')
}
function ymd(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
function shift(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return ymd(d)
}
let n = 0
function id(prefix: string): string {
  n += 1
  return `${prefix}_seed${n}`
}

// デモ用の初期データ（自宅ネイルサロンを想定）
export function seedState(): ShopState {
  const services = [
    { id: 'svc_a', name: 'ワンカラー', durationMin: 60, priceYen: 5500 },
    { id: 'svc_b', name: 'デザインコース', durationMin: 90, priceYen: 8800 },
    { id: 'svc_c', name: 'オフのみ', durationMin: 30, priceYen: 2200 },
  ]

  const mk = (
    serviceId: string,
    date: string,
    time: string,
    customerName: string,
    status: Booking['status'],
    note = '',
  ): Booking => ({
    id: id('bkg'),
    serviceId,
    date,
    time,
    customerName,
    customerContact: 'demo@example.com',
    note,
    status,
    createdAt: Date.now(),
  })

  const bookings: Booking[] = [
    mk('svc_a', shift(0), '10:00', '佐藤 みき', 'confirmed', '前回と同じ色で'),
    mk('svc_b', shift(0), '13:00', '田中 ゆり', 'confirmed'),
    mk('svc_c', shift(0), '16:00', '鈴木 あや', 'done'),
    mk('svc_a', shift(1), '11:00', '高橋 さき', 'confirmed'),
    mk('svc_b', shift(2), '14:00', '伊藤 のぞみ', 'confirmed'),
    mk('svc_a', shift(-1), '10:00', '渡辺 かな', 'done'),
    mk('svc_b', shift(-1), '13:00', '山本 えり', 'noshow'),
  ]

  return {
    shopName: 'miki nail',
    slug: 'miki-nail',
    openTime: '10:00',
    closeTime: '18:00',
    slotStepMin: 30,
    services,
    bookings,
  }
}
