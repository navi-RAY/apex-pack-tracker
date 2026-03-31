import { useState } from 'react'
import PackCounter from './components/PackCounter'
import ItemChecker from './components/ItemChecker'

type Tab = 'counter' | 'items'

export default function App() {
  const [tab, setTab] = useState<Tab>('counter')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100svh', background: '#0c0c12' }}>
      <header style={{
        padding: '14px 16px 10px',
        borderBottom: '1px solid #1a1a24',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        background: '#0c0c12',
        zIndex: 10,
      }}>
        <div>
          <div style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '3px', color: '#cc3333', textTransform: 'uppercase' }}>APEX</div>
          <div style={{ fontSize: '9px', color: '#444', letterSpacing: '2px', textTransform: 'uppercase' }}>Pack Tracker</div>
        </div>
        <div style={{ fontSize: '10px', color: '#333', letterSpacing: '1px' }}>非公式 / Fan Made</div>
      </header>

      <main style={{ flex: 1, overflowY: 'auto', paddingBottom: '80px' }}>
        {tab === 'counter' && <PackCounter />}
        {tab === 'items'   && <ItemChecker />}
      </main>

      <nav style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: '480px', background: '#0e0e16',
        borderTop: '1px solid #1a1a24', display: 'flex',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}>
        {([
          { id: 'counter', label: 'カウンター', icon: '◎' },
          { id: 'items',   label: 'アイテム',   icon: '◈' },
        ] as { id: Tab; label: string; icon: string }[]).map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: '12px 0 10px', background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
            color: tab === t.id ? '#cc3333' : '#444', transition: 'color 0.15s',
          }}>
            <span style={{ fontSize: '20px' }}>{t.icon}</span>
            <span style={{ fontSize: '10px', letterSpacing: '1px' }}>{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
