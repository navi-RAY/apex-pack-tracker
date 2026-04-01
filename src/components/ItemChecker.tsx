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

  const filtered = ITEMS.filter(item => {
    if (selectedLegend && item.legendId !== selectedLegend) return false
    if (filterRarity !== 'all' && item.rarity !== filterRarity) return false
    return true
  })

  const legend = selectedLegend ? LEGENDS.find(l => l.id === selectedLegend) : null

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Total bar */}
      <div style={{ background: '#11111a', border: '1px solid #1e1e28', borderRadius: '14px', padding: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '10px', color: '#555', letterSpacing: '2px', textTransform: 'uppercase' }}>総所有率</span>
          <span style={{ fontSize: '22px', fontWeight: 700, color: '#e0a840' }}>{totalPct}%</span>
        </div>
        <div style={{ height: '4px', background: '#1e1e28', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${totalPct}%`, background: 'linear-gradient(90deg,#4a3a10,#e0a840)', borderRadius: '2px', transition: 'width 0.3s' }}/>
        </div>
        <div style={{ fontSize: '10px', color: '#444', marginTop: '4px', textAlign: 'right' }}>{totalOwned} / {ITEMS.length}</div>
      </div>

      {/* Legend section label */}
      <div style={{ fontSize: '11px', color: '#555', letterSpacing: '2px', textTransform: 'uppercase', borderLeft: '2px solid #cc3333', paddingLeft: '8px' }}>
        Legends
      </div>

      {/* Legend grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(68px, 1fr))', gap: '10px' }}>
        {LEGENDS.map(l => {
          const legendItems = ITEMS.filter(i => i.legendId === l.id)
          const legendOwned = legendItems.filter(i => owned[i.id]).length
          const isSelected = selectedLegend === l.id
          return (
            <div key={l.id} onClick={() => setSelectedLegend(isSelected ? null : l.id)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                cursor: 'pointer',
              }}>
              <div style={{
                width: '64px', height: '64px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${isSelected ? '#cc3333' : '#1e1e28'}`,
                borderRadius: '10px',
                background: isSelected ? '#1a0a0a' : '#11111a',
                transition: 'all 0.15s',
              }}>
                <LegendIcon id={l.id} size={44} color={isSelected ? '#cc3333' : '#e0e0e0'}/>
              </div>
              <span style={{ fontSize: '9px', color: isSelected ? '#cc3333' : '#555', textAlign: 'center', letterSpacing: '0.3px' }}>
                {l.nameJa}
              </span>
              {legendItems.length > 0 && (
                <span style={{ fontSize: '8px', color: '#444' }}>{legendOwned}/{legendItems.length}</span>
              )}
            </div>
          )
        })}
      </div>

      {/* Item list (only when legend selected) */}
      {selectedLegend && (
        <>
          <div style={{ fontSize: '11px', color: '#555', letterSpacing: '2px', textTransform: 'uppercase', borderLeft: '2px solid #cc3333', paddingLeft: '8px' }}>
            {legend?.nameJa} — Items
          </div>

          {/* Rarity filter */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }}>
            {(['all', ...RARITIES] as const).map(r => {
              const cfg = r !== 'all' ? RARITY_CONFIG[r] : null
              const active = filterRarity === r
              return (
                <button key={r} onClick={() => setFilterRarity(r)} style={{
                  flexShrink: 0, padding: '5px 12px', borderRadius: '20px',
                  fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600,
                  cursor: 'pointer',
                  border: `1px solid ${active ? (cfg?.border ?? '#555') : '#222'}`,
                  background: active ? (cfg?.bg ?? '#222') : 'transparent',
                  color: active ? (cfg?.color ?? '#888') : '#444',
                }}>
                  {r === 'all' ? 'ALL' : cfg?.label}
                </button>
              )
            })}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {filtered.map(item => {
              const cfg = RARITY_CONFIG[item.rarity]
              const isOwned = owned[item.id]
              return (
                <div key={item.id} onClick={() => toggle(item.id)} style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '12px',
                  background: isOwned ? '#141420' : '#0e0e16',
                  border: `1px solid ${isOwned ? cfg.border : '#1a1a22'}`,
                  borderRadius: '10px', cursor: 'pointer', transition: 'all 0.15s',
                }}>
                  <div style={{
                    width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isOwned ? cfg.bg : '#111', borderRadius: '8px', flexShrink: 0,
                  }}>
                    <LegendIcon id={selectedLegend} size={28} color={isOwned ? cfg.color : '#333'}/>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: isOwned ? '#e0e0e0' : '#555', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '10px', color: isOwned ? cfg.color : '#333', marginTop: '2px' }}>
                      {cfg.label} · {CATEGORY_LABELS[item.category]}
                    </div>
                  </div>
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
            {filtered.length === 0 && (
              <div style={{ color: '#444', fontSize: '13px', textAlign: 'center', padding: '32px' }}>
                アイテムなし
              </div>
            )}
          </div>
        </>
      )}

      <div style={{ fontSize: '10px', color: '#2a2a2a', textAlign: 'center', paddingBottom: '8px' }}>
        ※ アイテムデータは随時追加予定
      </div>
    </div>
  )
}
