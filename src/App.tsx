import { useState } from 'react'
import PackCounter from './components/PackCounter'
import ItemChecker from './components/ItemChecker'

type Tab = 'counter' | 'items'

export default function App() {
  const [tab, setTab] = useState<Tab>('counter')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100svh', background: '#f2f2ee' }}>

      <header style={{
        padding: '14px 18px 12px',
        background: '#fff',
        borderBottom: '2px solid #e8e8e2',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: '26px', fontWeight: 900, letterSpacing: '2px', lineHeight: 1, color: '#111' }}>
            APEX
            <span style={{ color: '#00B8D9' }}>·</span>
            <span style={{ color: '#7DC900' }}>·</span>
            <span style={{ color: '#F0C000' }}>·</span>
          </div>
          <div style={{ fontSize: '10px', color: '#aaa', letterSpacing: '2px', marginTop: '3px' }}>パック天井トラッカー</div>
        </div>
        <span style={{ fontSize: '9px', color: '#ccc', letterSpacing: '1px' }}>非公式</span>
      </header>

      <div style={{
        display: 'flex',
        background: '#fff',
        borderBottom: '2px solid #e8e8e2',
        position: 'sticky',
        top: '64px',
        zIndex: 9,
      }}>
        {(['counter', 'items'] as Tab[]).map(t => {
          const active = tab === t
          return (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1,
              padding: '10px 0',
              background: 'none',
              border: 'none',
              borderBottom: `3px solid ${active ? '#111' : 'transparent'}`,
              cursor: 'pointer',
              color: active ? '#111' : '#bbb',
              fontSize: '12px',
              fontWeight: active ? 800 : 400,
              letterSpacing: '1px',
              transition: 'all 0.12s',
            }}>
              {t === 'counter' ? 'パック開封' : 'アイテム'}
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
