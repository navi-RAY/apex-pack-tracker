export type PackType = 'standard' | 'super' | 'event'

export interface PackConfig {
  id: PackType
  nameJa: string
  legendaryPity: number | null  // null = no guaranteed pity
  color: string
  colorDim: string
}

export const PACK_CONFIGS: PackConfig[] = [
  {
    id: 'standard',
    nameJa: '通常パック',
    legendaryPity: 30,
    color: '#e0a840',
    colorDim: '#4a3a10',
  },
  {
    id: 'super',
    nameJa: 'スーパーレジェンダリー',
    legendaryPity: 500,
    color: '#cc3333',
    colorDim: '#3a0808',
  },
  {
    id: 'event',
    nameJa: 'イベントパック',
    legendaryPity: null,
    color: '#bf60ff',
    colorDim: '#3a1060',
  },
]

export interface PackState {
  count: number
  sinceLastLegendary: number
  label: string
}

export type PacksState = Record<PackType, PackState>

export const defaultPacksState = (): PacksState => ({
  standard: { count: 0, sinceLastLegendary: 0, label: '通常パック' },
  super:    { count: 0, sinceLastLegendary: 0, label: 'スーパーレジェンダリー' },
  event:    { count: 0, sinceLastLegendary: 0, label: 'イベントパック' },
})
