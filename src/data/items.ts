import type { LegendId } from './legends'

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic'
export type ItemCategory =
  | 'legend_skin' | 'weapon_skin' | 'banner_frame' | 'banner_pose'
  | 'banner_tracker' | 'intro_quip' | 'kill_quip' | 'finisher'
  | 'emote' | 'skydive_emote' | 'loading_screen' | 'music_pack'

export interface Item {
  id: string
  name: string
  category: ItemCategory
  rarity: Rarity
  legendId?: LegendId
  weaponId?: string
}

export const RARITY_CONFIG: Record<Rarity, { label: string; color: string; bg: string; border: string }> = {
  common:    { label: 'コモン',         color: '#888',    bg: '#1a1a1a', border: '#333' },
  rare:      { label: 'レア',           color: '#4a8aff', bg: '#0a1030', border: '#1a3a8a' },
  epic:      { label: 'エピック',       color: '#bf60ff', bg: '#1a0a30', border: '#6a2a8a' },
  legendary: { label: 'レジェンダリー', color: '#e0a840', bg: '#2a1a00', border: '#8a6010' },
  mythic:    { label: 'ミシック',       color: '#40e0d0', bg: '#001a1a', border: '#10888a' },
}

export const CATEGORY_LABELS: Record<ItemCategory, string> = {
  legend_skin:    'レジェンドスキン',
  weapon_skin:    'ウェポンスキン',
  banner_frame:   'バナーフレーム',
  banner_pose:    'バナーポーズ',
  banner_tracker: 'バナートラッカー',
  intro_quip:     'イントロセリフ',
  kill_quip:      'キルセリフ',
  finisher:       'フィニッシャー',
  emote:          'エモート',
  skydive_emote:  'スカイダイブエモート',
  loading_screen: 'ローディング画面',
  music_pack:     'ミュージックパック',
}

// Mock items — to be expanded with full dataset
export const ITEMS: Item[] = [
  { id: 'b_skin_legendary_01', name: 'Heat Sync',         category: 'legend_skin',    rarity: 'legendary', legendId: 'bangalore' },
  { id: 'b_skin_epic_01',      name: 'Daemon Hunter',     category: 'legend_skin',    rarity: 'epic',      legendId: 'bangalore' },
  { id: 'b_skin_rare_01',      name: 'Roll Call',         category: 'legend_skin',    rarity: 'rare',      legendId: 'bangalore' },
  { id: 'b_skin_common_01',    name: 'Soldier',           category: 'legend_skin',    rarity: 'common',    legendId: 'bangalore' },

  { id: 'bh_skin_legendary_01', name: 'Imperial Warrior', category: 'legend_skin',   rarity: 'legendary', legendId: 'bloodhound' },
  { id: 'bh_skin_epic_01',      name: 'Plague Doctor',    category: 'legend_skin',   rarity: 'epic',      legendId: 'bloodhound' },
  { id: 'bh_skin_rare_01',      name: 'Witness',          category: 'legend_skin',   rarity: 'rare',      legendId: 'bloodhound' },

  { id: 'pf_skin_legendary_01', name: 'Model P',          category: 'legend_skin',   rarity: 'legendary', legendId: 'pathfinder' },
  { id: 'pf_skin_epic_01',      name: 'Prime Pathfinder', category: 'legend_skin',   rarity: 'epic',      legendId: 'pathfinder' },

  { id: 'wr_skin_legendary_01', name: 'Void Specialist',  category: 'legend_skin',   rarity: 'legendary', legendId: 'wraith' },
  { id: 'wr_skin_epic_01',      name: 'Quarantine 722',   category: 'legend_skin',   rarity: 'epic',      legendId: 'wraith' },

  { id: 'r301_skin_legendary_01', name: 'Wild Speed',     category: 'weapon_skin',   rarity: 'legendary', weaponId: 'r301' },
  { id: 'r301_skin_epic_01',      name: 'Carbon',         category: 'weapon_skin',   rarity: 'epic',      weaponId: 'r301' },
  { id: 'peacekeeper_leg_01',     name: 'Gold Standard',  category: 'weapon_skin',   rarity: 'legendary', weaponId: 'peacekeeper' },

  { id: 'frame_leg_01',  name: 'Gilded Age',    category: 'banner_frame',   rarity: 'legendary' },
  { id: 'frame_epic_01', name: 'Circuit Board', category: 'banner_frame',   rarity: 'epic' },
  { id: 'frame_rare_01', name: 'Neon Jungle',   category: 'banner_frame',   rarity: 'rare' },

  { id: 'pose_leg_01',  name: 'Power Stance',   category: 'banner_pose',    rarity: 'legendary' },
  { id: 'pose_epic_01', name: 'Shadow Walk',    category: 'banner_pose',    rarity: 'epic' },

  { id: 'emote_leg_01',  name: 'Most Wanted',   category: 'emote',          rarity: 'legendary' },
  { id: 'emote_epic_01', name: 'Cocky',         category: 'emote',          rarity: 'epic' },

  { id: 'sky_leg_01',   name: 'Drop the Bass',  category: 'skydive_emote',  rarity: 'legendary' },
  { id: 'music_leg_01', name: 'War Games',      category: 'music_pack',     rarity: 'legendary' },
  { id: 'load_leg_01',  name: 'Apex Pride',     category: 'loading_screen', rarity: 'legendary' },
]
