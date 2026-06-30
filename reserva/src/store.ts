import { useSyncExternalStore } from 'react'
import { seedState } from './seed.ts'

// ---- 型定義 ----
export type ServiceItem = {
  id: string
  name: string
  durationMin: number
  priceYen: number
}

export type BookingStatus = 'confirmed' | 'done' | 'noshow' | 'cancelled'

export type Booking = {
  id: string
  serviceId: string
  date: string // YYYY-MM-DD
  time: string // HH:mm
  customerName: string
  customerContact: string
  note: string
  status: BookingStatus
  createdAt: number
}

export type ShopState = {
  shopName: string
  slug: string
  openTime: string // HH:mm
  closeTime: string // HH:mm
  slotStepMin: number
  services: ServiceItem[]
  bookings: Booking[]
}

// ---- 永続化 ----
const KEY = 'reserva.v1'

function load(): ShopState {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw) as ShopState
  } catch {
    // 壊れていたら初期データに戻す
  }
  return seedState()
}

let state: ShopState = load()
const listeners = new Set<() => void>()

function emit() {
  localStorage.setItem(KEY, JSON.stringify(state))
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useShop(): ShopState {
  return useSyncExternalStore(subscribe, () => state)
}

// ---- 更新操作 ----
export function updateShop(patch: Partial<ShopState>) {
  state = { ...state, ...patch }
  emit()
}

export function resetDemo() {
  state = seedState()
  emit()
}

export function addService(s: Omit<ServiceItem, 'id'>) {
  state = { ...state, services: [...state.services, { ...s, id: genId('svc') }] }
  emit()
}

export function removeService(id: string) {
  state = { ...state, services: state.services.filter((s) => s.id !== id) }
  emit()
}

export function addBooking(b: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking {
  const booking: Booking = {
    ...b,
    id: genId('bkg'),
    status: 'confirmed',
    createdAt: Date.now(),
  }
  state = { ...state, bookings: [...state.bookings, booking] }
  emit()
  return booking
}

export function setBookingStatus(id: string, status: BookingStatus) {
  state = {
    ...state,
    bookings: state.bookings.map((b) => (b.id === id ? { ...b, status } : b)),
  }
  emit()
}

// ---- ヘルパー ----
export function genId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`
}

export function serviceById(state: ShopState, id: string): ServiceItem | undefined {
  return state.services.find((s) => s.id === id)
}

export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export function toHHMM(min: number): string {
  const h = Math.floor(min / 60)
  const m = min % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export function todayStr(): string {
  return dateStr(new Date())
}

export function dateStr(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const WD = ['日', '月', '火', '水', '木', '金', '土']

export function formatDateLabel(ymd: string): string {
  const [y, m, d] = ymd.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return `${m}月${d}日(${WD[date.getDay()]})`
}

export type Slot = { time: string; available: boolean }

// 指定日・指定所要時間で予約可能な時間枠を生成する
export function slotsForDate(
  state: ShopState,
  date: string,
  durationMin: number,
): Slot[] {
  const open = toMinutes(state.openTime)
  const close = toMinutes(state.closeTime)
  const step = state.slotStepMin

  // その日の有効な予約（取消・無断キャンセル以外）の占有区間
  const busy = state.bookings
    .filter((b) => b.date === date && b.status !== 'cancelled')
    .map((b) => {
      const start = toMinutes(b.time)
      const svc = serviceById(state, b.serviceId)
      return { start, end: start + (svc?.durationMin ?? step) }
    })

  const slots: Slot[] = []
  for (let t = open; t + durationMin <= close; t += step) {
    const end = t + durationMin
    const overlap = busy.some((x) => t < x.end && end > x.start)
    slots.push({ time: toHHMM(t), available: !overlap })
  }
  return slots
}

export function yen(n: number): string {
  return `¥${n.toLocaleString('ja-JP')}`
}
