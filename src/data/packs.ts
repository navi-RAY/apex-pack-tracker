export type PackType = 'standard' | 'super' | 'event'

export interface PackConfig {
  id: PackType
  nameJa: string
  legendaryPity: number | null
  color: string
  colorDim: string
}

export const PACK_CONFIGS: PackConfig[] = [
  {
    id: 'standard',
    nameJa: '通常パック',
    legendaryPity: 30,
    color: '#00B8D9',
    colorDim: '#00B8D920',
  },
  {
    id: 'super',
    nameJa: 'スーパーレジェンダリー',
    legendaryPity: 500,
    color: '#7DC900',
    colorDim: '#7DC90020',
  },
  {
    id: 'event',
    nameJa: 'イベントパック',
    legendaryPity: null,
    color: '#F0C000',
    colorDim: '#F0C00020',
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
