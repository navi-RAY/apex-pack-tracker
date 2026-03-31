export type PackType = 'standard' | 'event' | 'collection'

export interface PackConfig {
  id: PackType
  name: string
  nameJa: string
  legendaryPity: number
  color: string
  colorDim: string
}

export const PACK_CONFIGS: PackConfig[] = [
  {
    id: 'standard',
    name: 'Apex Pack',
    nameJa: '通常パック',
    legendaryPity: 30,
    color: '#e0a840',
    colorDim: '#4a3a10',
  },
  {
    id: 'event',
    name: 'Event Pack',
    nameJa: 'イベントパック',
    legendaryPity: 24,
    color: '#bf60ff',
    colorDim: '#3a1060',
  },
  {
    id: 'collection',
    name: 'Collection Event',
    nameJa: 'コレクションイベント',
    legendaryPity: 24,
    color: '#40c0e0',
    colorDim: '#103040',
  },
]

export interface PackState {
  count: number
  sinceLastLegendary: number
}

export type PacksState = Record<PackType, PackState>

export const defaultPacksState = (): PacksState => ({
  standard:   { count: 0, sinceLastLegendary: 0 },
  event:      { count: 0, sinceLastLegendary: 0 },
  collection: { count: 0, sinceLastLegendary: 0 },
})
