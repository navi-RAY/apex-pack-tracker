import { useState } from 'react'
import PackCounter from './components/PackCounter'
import ItemChecker from './components/ItemChecker'

type Tab = 'counter' | 'items'

export default function App() {
  const [tab, setTab] = useState<Tab>('counter')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100svh', background: '#10101c' }}>

      <header style={{
        padding: '0 16px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#10101c',
        borderBottom: '1px solid #1c1c2e',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '16px', fontWeight: 900, color: '#e03030', letterSpacing: '4px' }}>APEX</span>
          <span style={{ fontSize: '10px', color: '#333', letterSpacing: '2px' }}>パック天井トラッカー</span>
        </div>
        <span style={{ fontSize: '9px', color: '#222', letterSpacing: '1px' }}>非公式</span>
      </header>

      <div style={{
        display: 'flex',
        background: '#10101c',
        borderBottom: '1px solid #1c1c2e',
        position: 'sticky',
        top: '48px',
        zIndex: 9,
      }}>
        {(['counter', 'items'] as Tab[]).map(t => {
          const active = tab === t
          const label = t === 'counter' ? 'パック開封' : 'アイテム'
          return (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1,
              padding: '10px 0',
              background: 'none',
              border: 'none',
              borderBottom: `2px solid ${active ? '#e03030' : 'transparent'}`,
              cursor: 'pointer',
              color: active ? '#fff' : '#383848',
              fontSize: '12px',
              fontWeight: active ? 700 : 400,
              letterSpacing: '1px',
              transition: 'all 0.12s',
            }}>
              {label}
            </button>
          )
        })}
      </div>

      <main style={{ flex: 1, overflowY: 'auto', paddingBottom: '24px' }}>
        {tab === 'counter' && <PackCounter />}
        {tab === 'items'   && <ItemChecker />}
      </main>

    </div>
  )
}
