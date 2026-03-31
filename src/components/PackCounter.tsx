import { PACK_CONFIGS, defaultPacksState } from '../data/packs'
import type { PackType, PacksState } from '../data/packs'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function PackCounter() {
  const [packs, setPacks] = useLocalStorage<PacksState>('packs', defaultPacksState())

  const increment = (type: PackType) => {
    setPacks(prev => {
      const cur = prev[type]
      const next = cur.sinceLastLegendary + 1
      return { ...prev, [type]: { count: cur.count + 1, sinceLastLegendary: next } }
    })
  }

  const decrement = (type: PackType) => {
    setPacks(prev => {
      const cur = prev[type]
      if (cur.count === 0) return prev
      return { ...prev, [type]: { count: cur.count - 1, sinceLastLegendary: Math.max(0, cur.sinceLastLegendary - 1) } }
    })
  }

  const gotLegendary = (type: PackType) => {
    setPacks(prev => ({ ...prev, [type]: { ...prev[type], sinceLastLegendary: 0 } }))
  }

  const reset = (type: PackType) => {
    setPacks(prev => ({ ...prev, [type]: { count: 0, sinceLastLegendary: 0 } }))
  }

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h2 style={{ margin: 0, fontSize: '13px', letterSpacing: '2px', color: '#555', textTransform: 'uppercase' }}>
        Pack Counter
      </h2>

      {PACK_CONFIGS.map(cfg => {
        const state = packs[cfg.id]
        const pct = Math.min(state.sinceLastLegendary / cfg.legendaryPity, 1)
        const remaining = cfg.legendaryPity - state.sinceLastLegendary
        const nearPity = remaining <= 5

        return (
          <div key={cfg.id} style={{
            background: '#11111a',
            border: `1px solid #1e1e28`,
            borderRadius: '14px',
            padding: '16px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <div style={{ fontSize: '10px', color: '#555', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {cfg.nameJa}
                </div>
                <div style={{ fontSize: '42px', fontWeight: 700, lineHeight: 1, letterSpacing: '-1px', color: '#e0e0e0' }}>
                  {state.count}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '10px', color: '#555', marginBottom: '2px' }}>次のレジェまで</div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: nearPity ? '#ff4444' : cfg.color }}>
                  あと{remaining}
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ height: '4px', background: '#1e1e28', borderRadius: '2px', marginBottom: '4px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${pct * 100}%`,
                background: `linear-gradient(90deg, ${cfg.colorDim}, ${cfg.color})`,
                borderRadius: '2px',
                transition: 'width 0.3s ease',
              }}/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '9px', color: '#333' }}>0</span>
              <span style={{ fontSize: '9px', color: cfg.color }}>天井 {cfg.legendaryPity}</span>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => decrement(cfg.id)} style={btnStyle('#1a1a26', '#e0e0e0')}>－</button>
              <button onClick={() => increment(cfg.id)} style={{ ...btnStyle(cfg.colorDim, cfg.color), flex: 2, fontSize: '15px', fontWeight: 700 }}>
                ＋ 開封
              </button>
              <button onClick={() => gotLegendary(cfg.id)} style={btnStyle('#1a1a26', cfg.color)} title="レジェンダリー獲得">
                ★
              </button>
              <button onClick={() => reset(cfg.id)} style={btnStyle('#1a1a26', '#555')} title="リセット">
                ↺
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function btnStyle(bg: string, color: string) {
  return {
    flex: 1,
    height: '44px',
    background: bg,
    color,
    border: 'none',
    borderRadius: '10px',
    fontSize: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as React.CSSProperties
}
