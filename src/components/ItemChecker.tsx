import { useState } from 'react'
import { ITEMS, RARITY_CONFIG, CATEGORY_LABELS } from '../data/items'
import type { Rarity, ItemCategory } from '../data/items'
import { LEGENDS } from '../data/legends'
import LegendIcon from './LegendIcon'
import type { LegendId } from '../data/legends'
import { useLocalStorage } from '../hooks/useLocalStorage'

const RARITIES: Rarity[] = ['legendary', 'epic', 'rare', 'common']

export default function ItemChecker() {
  const [owned, setOwned] = useLocalStorage<Record<string, boolean>>('owned_items', {})
  const [filterRarity, setFilterRarity] = useState<Rarity | 'all'>('all')
  const [filterLegend, setFilterLegend] = useState<LegendId | 'all'>('all')
  const [filterCategory] = useState<ItemCategory | 'all'>('all')

  const toggle = (id: string) => {
    setOwned(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const filtered = ITEMS.filter(item => {
    if (filterRarity !== 'all' && item.rarity !== filterRarity) return false
    if (filterLegend !== 'all' && item.legendId !== filterLegend) return false
    if (filterCategory !== 'all' && item.category !== filterCategory) return false
    return true
  })

  const ownedCount = filtered.filter(i => owned[i.id]).length
  const pct = filtered.length > 0 ? Math.round((ownedCount / filtered.length) * 100) : 0

  const totalOwned = ITEMS.filter(i => owned[i.id]).length
  const totalPct = ITEMS.length > 0 ? Math.round((totalOwned / ITEMS.length) * 100) : 0

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

      {/* Total ownership */}
      <div style={{ background: '#11111a', border: '1px solid #1e1e28', borderRadius: '14px', padding: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '10px', color: '#555', letterSpacing: '2px', textTransform: 'uppercase' }}>
            総所有率
          </span>
          <span style={{ fontSize: '22px', fontWeight: 700, color: '#e0a840' }}>{totalPct}%</span>
        </div>
        <div style={{ height: '4px', background: '#1e1e28', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${totalPct}%`, background: 'linear-gradient(90deg,#4a3a10,#e0a840)', borderRadius: '2px', transition: 'width 0.3s' }}/>
        </div>
        <div style={{ fontSize: '10px', color: '#444', marginTop: '4px', textAlign: 'right' }}>{totalOwned} / {ITEMS.length}</div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Rarity filter */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }}>
          {(['all', ...RARITIES] as const).map(r => {
            const cfg = r !== 'all' ? RARITY_CONFIG[r] : null
            const active = filterRarity === r
            return (
              <button key={r} onClick={() => setFilterRarity(r)} style={{
                flexShrink: 0,
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '10px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                fontWeight: 600,
                cursor: 'pointer',
                border: `1px solid ${active ? (cfg?.border ?? '#555') : '#222'}`,
                background: active ? (cfg?.bg ?? '#222') : 'transparent',
                color: active ? (cfg?.color ?? '#888') : '#444',
                transition: 'all 0.15s',
              }}>
                {r === 'all' ? 'ALL' : cfg?.label}
              </button>
            )
          })}
        </div>

        {/* Legend filter */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }}>
          <button onClick={() => setFilterLegend('all')} style={chipStyle(filterLegend === 'all')}>ALL</button>
          {LEGENDS.map(l => (
            <button key={l.id} onClick={() => setFilterLegend(l.id)}
              style={{ ...chipStyle(filterLegend === l.id), display: 'flex', alignItems: 'center', gap: '4px' }}>
              <LegendIcon id={l.id} size={14} color={filterLegend === l.id ? '#e0e0e0' : '#555'}/>
              <span>{l.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results summary */}
      {filterRarity !== 'all' || filterLegend !== 'all' || filterCategory !== 'all' ? (
        <div style={{ fontSize: '11px', color: '#555' }}>
          フィルター結果: {ownedCount}/{filtered.length} ({pct}%)
        </div>
      ) : null}

      {/* Item list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {filtered.length === 0 && (
          <div style={{ color: '#444', fontSize: '13px', textAlign: 'center', padding: '32px' }}>
            アイテムなし
          </div>
        )}
        {filtered.map(item => {
          const cfg = RARITY_CONFIG[item.rarity]
          const isOwned = owned[item.id]
          const legend = item.legendId ? LEGENDS.find(l => l.id === item.legendId) : null
          return (
            <div key={item.id} onClick={() => toggle(item.id)} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              background: isOwned ? '#141420' : '#0e0e16',
              border: `1px solid ${isOwned ? cfg.border : '#1a1a22'}`,
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}>
              {/* Legend icon or category */}
              <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isOwned ? cfg.bg : '#111', borderRadius: '8px', flexShrink: 0 }}>
                {legend
                  ? <LegendIcon id={legend.id} size={24} color={isOwned ? cfg.color : '#333'}/>
                  : <span style={{ fontSize: '16px', opacity: isOwned ? 1 : 0.3 }}>◆</span>
                }
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: isOwned ? '#e0e0e0' : '#555',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.name}
                </div>
                <div style={{ fontSize: '10px', color: isOwned ? cfg.color : '#333', marginTop: '2px' }}>
                  {cfg.label} · {CATEGORY_LABELS[item.category]}
                  {legend ? ` · ${legend.nameJa}` : ''}
                </div>
              </div>

              {/* Check */}
              <div style={{
                width: '24px', height: '24px', borderRadius: '6px', flexShrink: 0,
                background: isOwned ? cfg.color : 'transparent',
                border: `2px solid ${isOwned ? cfg.color : '#2a2a36'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', color: '#0c0c12', fontWeight: 700,
              }}>
                {isOwned ? '✓' : ''}
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ fontSize: '10px', color: '#333', textAlign: 'center', paddingBottom: '8px' }}>
        ※ アイテムデータは随時追加予定
      </div>
    </div>
  )
}

function chipStyle(active: boolean): React.CSSProperties {
  return {
    flexShrink: 0,
    padding: '5px 10px',
    borderRadius: '20px',
    fontSize: '10px',
    letterSpacing: '0.5px',
    cursor: 'pointer',
    border: `1px solid ${active ? '#444' : '#1e1e1e'}`,
    background: active ? '#1e1e2a' : 'transparent',
    color: active ? '#e0e0e0' : '#444',
    transition: 'all 0.15s',
  }
}
