import { useState } from 'react'
import { ITEMS, RARITY_CONFIG, CATEGORY_LABELS } from '../data/items'
import type { Rarity } from '../data/items'
import { LEGENDS } from '../data/legends'
import type { LegendId } from '../data/legends'
import LegendIcon from './LegendIcon'
import { useLocalStorage } from '../hooks/useLocalStorage'

const RARITIES: Rarity[] = ['legendary', 'epic', 'rare', 'common']

export default function ItemChecker() {
  const [owned, setOwned] = useLocalStorage<Record<string, boolean>>('owned_items', {})
  const [selectedLegend, setSelectedLegend] = useState<LegendId | null>(null)
  const [filterRarity, setFilterRarity] = useState<Rarity | 'all'>('all')

  const toggle = (id: string) => setOwned(prev => ({ ...prev, [id]: !prev[id] }))

  const totalOwned = ITEMS.filter(i => owned[i.id]).length
  const totalPct = ITEMS.length > 0 ? Math.round((totalOwned / ITEMS.length) * 100) : 0
  const legend = selectedLegend ? LEGENDS.find(l => l.id === selectedLegend) : null

  const filtered = ITEMS.filter(item => {
    if (selectedLegend && item.legendId !== selectedLegend) return false
    if (filterRarity !== 'all' && item.rarity !== filterRarity) return false
    return true
  })

  return (
    <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

      {/* 総所有率 */}
      <div style={{ background: '#fff', borderRadius: '10px', padding: '14px', borderLeft: '5px solid #F0C000' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#F0C000' }}>総所有率</span>
          <span style={{ fontSize: '28px', fontWeight: 900, color: '#111', letterSpacing: '-1px' }}>{totalPct}<span style={{ fontSize: '14px' }}>%</span></span>
        </div>
        <div style={{ height: '4px', background: '#f0f0ec', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${totalPct}%`, background: '#F0C000', borderRadius: '2px', transition: 'width 0.3s' }}/>
        </div>
        <div style={{ fontSize: '10px', color: '#ccc', marginTop: '4px', textAlign: 'right' }}>{totalOwned} / {ITEMS.length}</div>
      </div>

      {/* レジェンド一覧 */}
      <div style={{ background: '#fff', borderRadius: '10px', padding: '14px' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, color: '#00B8D9', marginBottom: '12px', letterSpacing: '0.5px' }}>レジェンド</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))', gap: '8px' }}>
          {LEGENDS.map(l => {
            const legendItems = ITEMS.filter(i => i.legendId === l.id)
            const legendOwned = legendItems.filter(i => owned[i.id]).length
            const isSelected = selectedLegend === l.id
            return (
              <div key={l.id} onClick={() => setSelectedLegend(isSelected ? null : l.id)} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                cursor: 'pointer',
              }}>
                <div style={{
                  width: '60px', height: '60px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `2px solid ${isSelected ? '#00B8D9' : '#e8e8e2'}`,
                  borderRadius: '10px',
                  background: isSelected ? '#e8f8ff' : '#f8f8f4',
                  transition: 'all 0.12s',
                }}>
                  <LegendIcon id={l.id} size={40} color={isSelected ? '#00B8D9' : '#bbb'}/>
                </div>
                <span style={{ fontSize: '9px', color: isSelected ? '#00B8D9' : '#aaa', textAlign: 'center', fontWeight: isSelected ? 700 : 400 }}>
                  {l.nameJa}
                </span>
                {legendItems.length > 0 && (
                  <span style={{ fontSize: '8px', color: '#ccc' }}>{legendOwned}/{legendItems.length}</span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* アイテム一覧 */}
      {selectedLegend && (
        <div style={{ background: '#fff', borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#7DC900' }}>{legend?.nameJa}</div>

          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }}>
            {(['all', ...RARITIES] as const).map(r => {
              const cfg = r !== 'all' ? RARITY_CONFIG[r] : null
              const active = filterRarity === r
              return (
                <button key={r} onClick={() => setFilterRarity(r)} style={{
                  flexShrink: 0, padding: '5px 12px', borderRadius: '20px',
                  fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px',
                  cursor: 'pointer',
                  border: `1.5px solid ${active ? (cfg?.color ?? '#111') : '#e0e0e0'}`,
                  background: active ? (cfg?.color ?? '#111') : '#fff',
                  color: active ? '#fff' : '#aaa',
                  transition: 'all 0.12s',
                }}>
                  {r === 'all' ? 'すべて' : cfg?.label}
                </button>
              )
            })}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {filtered.map(item => {
              const cfg = RARITY_CONFIG[item.rarity]
              const isOwned = owned[item.id]
              return (
                <div key={item.id} onClick={() => toggle(item.id)} style={{
                  display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
                  background: isOwned ? `${cfg.color}12` : '#f8f8f4',
                  border: `1.5px solid ${isOwned ? `${cfg.color}66` : '#e8e8e2'}`,
                  borderRadius: '8px', cursor: 'pointer', transition: 'all 0.12s',
                }}>
                  <div style={{
                    width: '36px', height: '36px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isOwned ? `${cfg.color}22` : '#ececea',
                    borderRadius: '7px', flexShrink: 0,
                  }}>
                    <LegendIcon id={selectedLegend} size={24} color={isOwned ? cfg.color : '#ccc'}/>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: isOwned ? '#111' : '#aaa', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '10px', color: isOwned ? cfg.color : '#ccc', marginTop: '1px' }}>
                      {cfg.label} · {CATEGORY_LABELS[item.category]}
                    </div>
                  </div>
                  <div style={{
                    width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                    background: isOwned ? cfg.color : 'transparent',
                    border: `2px solid ${isOwned ? cfg.color : '#ddd'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '12px', color: '#fff', fontWeight: 700,
                  }}>
                    {isOwned ? '✓' : ''}
                  </div>
                </div>
              )
            })}
            {filtered.length === 0 && (
              <div style={{ color: '#ccc', fontSize: '13px', textAlign: 'center', padding: '24px' }}>
                アイテムなし
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{ fontSize: '10px', color: '#ddd', textAlign: 'center' }}>
        ※ アイテムデータは随時追加予定
      </div>
    </div>
  )
}
