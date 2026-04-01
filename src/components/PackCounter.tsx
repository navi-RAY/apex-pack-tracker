import { useLocalStorage } from '../hooks/useLocalStorage'
import { PACK_CONFIGS, defaultPacksState } from '../data/packs'
import type { PackType, PacksState } from '../data/packs'

const ALSO_COUNTS_SUPER: PackType[] = ['standard']

export default function PackCounter() {
  const [packs, setPacks] = useLocalStorage<PacksState>('packs2', defaultPacksState())

  const increment = (type: PackType) => {
    setPacks(prev => {
      let next = { ...prev }
      const cur = next[type]
      next[type] = { ...cur, count: cur.count + 1, sinceLastLegendary: cur.sinceLastLegendary + 1 }
      if (ALSO_COUNTS_SUPER.includes(type) && type !== 'super') {
        const sup = next['super']
        next['super'] = { ...sup, count: sup.count + 1, sinceLastLegendary: sup.sinceLastLegendary + 1 }
      }
      return next
    })
  }

  const decrement = (type: PackType) => {
    setPacks(prev => {
      let next = { ...prev }
      const cur = next[type]
      if (cur.count === 0) return prev
      next[type] = { ...cur, count: cur.count - 1, sinceLastLegendary: Math.max(0, cur.sinceLastLegendary - 1) }
      if (ALSO_COUNTS_SUPER.includes(type) && type !== 'super') {
        const sup = next['super']
        next['super'] = { ...sup, count: Math.max(0, sup.count - 1), sinceLastLegendary: Math.max(0, sup.sinceLastLegendary - 1) }
      }
      return next
    })
  }

  const gotLegendary = (type: PackType) => {
    setPacks(prev => ({ ...prev, [type]: { ...prev[type], sinceLastLegendary: 0 } }))
  }

  const reset = (type: PackType) => {
    setPacks(prev => {
      const cfg = PACK_CONFIGS.find(c => c.id === type)!
      return { ...prev, [type]: { count: 0, sinceLastLegendary: 0, label: cfg.nameJa } }
    })
  }

  return (
    <div style={{ padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {PACK_CONFIGS.map(cfg => {
        const state = packs[cfg.id]
        const hasPity = cfg.legendaryPity !== null
        const pct = hasPity ? Math.min(state.sinceLastLegendary / cfg.legendaryPity!, 1) : 0
        const remaining = hasPity ? cfg.legendaryPity! - state.sinceLastLegendary : null
        const nearPity = remaining !== null && remaining <= Math.max(1, Math.round(cfg.legendaryPity! * 0.1))
        const isSuper = cfg.id === 'super'

        return (
          <div key={cfg.id} style={{
            background: '#1a1a28',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: `inset 0 0 0 1px ${cfg.color}33`,
          }}>
            {/* ラベル行 */}
            <div style={{
              padding: '9px 14px',
              background: `${cfg.color}14`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: `1px solid ${cfg.color}22`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: cfg.color }}/>
                <span style={{ fontSize: '12px', fontWeight: 700, color: cfg.color, letterSpacing: '0.5px' }}>
                  {cfg.nameJa}
                </span>
                {isSuper && (
                  <span style={{ fontSize: '9px', color: `${cfg.color}66` }}>通常パック連動</span>
                )}
              </div>
              <button onClick={() => reset(cfg.id)} style={{
                background: 'none', border: 'none', color: '#383848', fontSize: '15px',
                cursor: 'pointer', padding: '0 2px',
              }}>↺</button>
            </div>

            {/* カウント表示 */}
            <div style={{ padding: '10px 14px 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '9px', color: '#383848', marginBottom: '2px', letterSpacing: '1px' }}>開封数</div>
                <div style={{
                  fontSize: '80px', fontWeight: 900, lineHeight: 1,
                  color: '#ffffff', letterSpacing: '-3px',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {state.count}
                </div>
              </div>
              {hasPity && (
                <div style={{ textAlign: 'right', paddingBottom: '8px' }}>
                  <div style={{ fontSize: '9px', color: '#383848', marginBottom: '4px', letterSpacing: '1px' }}>天井まで</div>
                  <div style={{
                    fontSize: '40px', fontWeight: 900, lineHeight: 1,
                    color: nearPity ? '#ff3333' : cfg.color,
                    fontVariantNumeric: 'tabular-nums',
                    letterSpacing: '-1px',
                  }}>
                    {remaining}
                  </div>
                </div>
              )}
            </div>

            {/* 天井バー */}
            {hasPity && (
              <div style={{ padding: '10px 14px 12px' }}>
                <div style={{ height: '6px', background: '#0c0c18', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${pct * 100}%`,
                    background: nearPity
                      ? 'linear-gradient(90deg, #550000, #ff3333)'
                      : `linear-gradient(90deg, ${cfg.colorDim}, ${cfg.color})`,
                    borderRadius: '3px',
                    transition: 'width 0.15s',
                    boxShadow: `0 0 8px ${nearPity ? '#ff333366' : `${cfg.color}55`}`,
                  }}/>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                  <span style={{ fontSize: '9px', color: '#2c2c3c', letterSpacing: '1px' }}>天井 {cfg.legendaryPity}</span>
                </div>
              </div>
            )}

            {/* ボタン */}
            <div style={{ display: 'flex', gap: '1px', background: '#0c0c18' }}>
              <button onClick={() => decrement(cfg.id)} style={btnStyle('#1a1a28', '#303045')}>
                <span style={{ fontSize: '24px', lineHeight: 1 }}>－</span>
              </button>
              <button onClick={() => increment(cfg.id)} style={{ ...btnStyle(`${cfg.color}22`, cfg.color), flex: 3 }}>
                <span style={{ fontSize: '15px', fontWeight: 800, letterSpacing: '3px' }}>＋ 開封</span>
              </button>
              {hasPity && (
                <button onClick={() => gotLegendary(cfg.id)} style={btnStyle('#1a1a28', cfg.color)} title="レジェンダリー獲得・天井リセット">
                  <span style={{ fontSize: '20px', lineHeight: 1 }}>★</span>
                  <span style={{ fontSize: '9px', marginTop: '2px' }}>レジェ獲得</span>
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function btnStyle(bg: string, color: string): React.CSSProperties {
  return {
    flex: 1, height: '56px', background: bg, color,
    border: 'none', cursor: 'pointer',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: '2px',
  }
}
