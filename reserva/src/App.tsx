import { useEffect, useState } from 'react'
import { Landing } from './views/Landing.tsx'
import { Dashboard } from './views/Dashboard.tsx'
import { PublicBooking } from './views/PublicBooking.tsx'
import { Settings } from './views/Settings.tsx'

type Route = 'landing' | 'owner' | 'book' | 'settings'

function parseHash(): Route {
  const h = window.location.hash.replace(/^#\/?/, '')
  if (h === 'owner') return 'owner'
  if (h === 'book') return 'book'
  if (h === 'settings') return 'settings'
  return 'landing'
}

export function go(route: Route) {
  window.location.hash = route === 'landing' ? '/' : `/${route}`
}

export function App() {
  const [route, setRoute] = useState<Route>(parseHash())

  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (route === 'owner') return <Dashboard />
  if (route === 'book') return <PublicBooking />
  if (route === 'settings') return <Settings />
  return <Landing />
}
