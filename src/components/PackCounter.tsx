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
    <div style={{ padding: '14px 14px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
      {PACK_CONFIGS.map((cfg, i) => {
        const state = packs[cfg.id]
        const hasPity = cfg.legendaryPity !== null
        const pct = hasPity ? Math.min(state.sinceLastLegendary / cfg.legendaryPity!, 1) : 0
        const remaining = hasPity ? cfg.legendaryPity! - state.sinceLastLegendary : null
        const nearPity = remaining !== null && remaining <= Math.max(1, Math.round(cfg.legendaryPity! * 0.1))
        const isSuper = cfg.id === 'super'
        const radius = i === 0 ? '12px 12px 0 0' : i === PACK_CONFIGS.length - 1 ? '0 0 12px 12px' : '0'

        return (
          <div key={cfg.id} style={{
            background: '#fff',
            borderRadius: radius,
            overflow: 'hidden',
            borderLeft: `5px solid ${cfg.color}`,
          }}>
            {/* 上段: ラベル＋リセット */}
            <div style={{
              padding: '10px 14px 0 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: cfg.color, letterSpacing: '0.5px' }}>
                  {cfg.nameJa}
                </span>
                {isSuper && (
                  <span style={{ fontSize: '9px', color: '#bbb' }}>通常パック連動</span>
                )}
              </div>
              <button onClick={() => reset(cfg.id)} style={{
                background: 'none', border: 'none', color: '#ccc', fontSize: '15px',
                cursor: 'pointer', padding: '0 2px',
              }}>↺</button>
            </div>

            {/* 中段: 開封数 ＋ 天井まで */}
            <div style={{
              padding: '4px 14px 0 12px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
            }}>
              <div>
                <div style={{
                  fontSize: '88px',
                  fontWeight: 900,
                  lineHeight: 1,
                  color: '#111',
                  letterSpacing: '-4px',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {state.count}
                </div>
              </div>

              {hasPity && (
                <div style={{ textAlign: 'right', paddingBottom: '10px' }}>
                  <div style={{ fontSize: '9px', color: '#bbb', marginBottom: '2px' }}>天井まで</div>
                  <div style={{
                    fontSize: '44px',
                    fontWeight: 900,
                    lineHeight: 1,
                    letterSpacing: '-2px',
                    fontVariantNumeric: 'tabular-nums',
                    color: nearPity ? '#e03030' : cfg.color,
                  }}>
                    {remaining}
                  </div>
                </div>
              )}
            </div>

            {/* 天井バー */}
            {hasPity && (
              <div style={{ padding: '6px 14px 10px 12px' }}>
                <div style={{ height: '4px', background: '#f0f0ec', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${pct * 100}%`,
                    background: nearPity ? '#e03030' : cfg.color,
                    borderRadius: '2px',
                    transition: 'width 0.15s',
                  }}/>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3px' }}>
                  <span style={{ fontSize: '9px', color: '#ccc' }}>天井 {cfg.legendaryPity}</span>
                </div>
              </div>
            )}

            {/* ボタン行 */}
            <div style={{ display: 'flex', borderTop: '1px solid #f0f0ec', marginTop: hasPity ? 0 : '8px' }}>
              <button onClick={() => decrement(cfg.id)} style={btnStyle('#fff', '#ccc')}>
                <span style={{ fontSize: '22px', lineHeight: 1 }}>－</span>
              </button>
              <button onClick={() => increment(cfg.id)} style={{ ...btnStyle(cfg.color, '#fff'), flex: 3 }}>
                <span style={{ fontSize: '14px', fontWeight: 800, letterSpacing: '3px' }}>＋ 開封</span>
              </button>
              {hasPity && (
                <button onClick={() => gotLegendary(cfg.id)} style={btnStyle('#fff', cfg.color)}>
                  <span style={{ fontSize: '18px', lineHeight: 1 }}>★</span>
                  <span style={{ fontSize: '9px', marginTop: '1px', fontWeight: 700 }}>レジェ獲得</span>
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
    flex: 1, height: '54px', background: bg, color,
    border: 'none', cursor: 'pointer',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: '2px',
  }
}
