export type LegendId =
  | 'bangalore' | 'bloodhound' | 'caustic' | 'crypto' | 'fuse'
  | 'gibraltar' | 'horizon' | 'lifeline' | 'loba' | 'mirage'
  | 'octane' | 'pathfinder' | 'rampart' | 'revenant' | 'valkyrie'
  | 'wraith' | 'ash' | 'madmaggie' | 'newcastle' | 'seer'
  | 'vantage' | 'catalyst' | 'ballistic' | 'conduit' | 'alter'
  | 'wattson' | 'sparrow'

export interface Legend {
  id: LegendId
  name: string
  nameJa: string
}

export const LEGENDS: Legend[] = [
  { id: 'bangalore',  name: 'Bangalore',   nameJa: 'バンガロール' },
  { id: 'bloodhound', name: 'Bloodhound',  nameJa: 'ブラッドハウンド' },
  { id: 'caustic',    name: 'Caustic',     nameJa: 'コースティック' },
  { id: 'crypto',     name: 'Crypto',      nameJa: 'クリプト' },
  { id: 'fuse',       name: 'Fuse',        nameJa: 'フューズ' },
  { id: 'gibraltar',  name: 'Gibraltar',   nameJa: 'ジブラルタル' },
  { id: 'horizon',    name: 'Horizon',     nameJa: 'ホライゾン' },
  { id: 'lifeline',   name: 'Lifeline',    nameJa: 'ライフライン' },
  { id: 'loba',       name: 'Loba',        nameJa: 'ローバ' },
  { id: 'mirage',     name: 'Mirage',      nameJa: 'ミラージュ' },
  { id: 'octane',     name: 'Octane',      nameJa: 'オクタン' },
  { id: 'pathfinder', name: 'Pathfinder',  nameJa: 'パスファインダー' },
  { id: 'rampart',    name: 'Rampart',     nameJa: 'ランパート' },
  { id: 'revenant',   name: 'Revenant',    nameJa: 'レヴナント' },
  { id: 'valkyrie',   name: 'Valkyrie',    nameJa: 'ヴァルキリー' },
  { id: 'wraith',     name: 'Wraith',      nameJa: 'レイス' },
  { id: 'ash',        name: 'Ash',         nameJa: 'アッシュ' },
  { id: 'madmaggie',  name: 'Mad Maggie',  nameJa: 'マッドマギー' },
  { id: 'newcastle',  name: 'Newcastle',   nameJa: 'ニューキャッスル' },
  { id: 'seer',       name: 'Seer',        nameJa: 'シア' },
  { id: 'vantage',    name: 'Vantage',     nameJa: 'ヴァンテージ' },
  { id: 'catalyst',   name: 'Catalyst',    nameJa: 'カタリスト' },
  { id: 'ballistic',  name: 'Ballistic',   nameJa: 'バリスティック' },
  { id: 'conduit',    name: 'Conduit',     nameJa: 'コンデュイット' },
  { id: 'alter',      name: 'Alter',       nameJa: 'オルター' },
  { id: 'wattson',    name: 'Wattson',     nameJa: 'ワトソン' },
  { id: 'sparrow',    name: 'Sparrow',     nameJa: 'スパロー' },
]
