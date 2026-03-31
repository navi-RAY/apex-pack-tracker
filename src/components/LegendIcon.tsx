import type React from 'react'
import type { LegendId } from '../data/legends'

interface Props {
  id: LegendId
  size?: number
  color?: string
}

export default function LegendIcon({ id, size = 44, color = '#e0e0e0' }: Props) {
  const s = { stroke: color, fill: 'none', strokeWidth: 2.5, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }
  const f = { fill: color, stroke: 'none' }
  const dim = { ...s, opacity: 0.35 }

  const icons: Record<LegendId, React.ReactElement> = {
    pathfinder: (
      <>
        <rect x="10" y="5" width="28" height="24" rx="6" {...s}/>
        <circle cx="18" cy="15" r="4.5" {...f}/>
        <circle cx="30" cy="15" r="4.5" {...f}/>
        <circle cx="19.5" cy="13.5" r="1.8" fill="#0c0c12" stroke="none"/>
        <circle cx="31.5" cy="13.5" r="1.8" fill="#0c0c12" stroke="none"/>
        <path d="M15 23 Q24 30 33 23" {...s}/>
        <rect x="20" y="29" width="8" height="4" rx="2" {...f}/>
        <path d="M6 38 Q6 33 24 33 Q42 33 42 38 L40 44 L8 44 Z" {...s}/>
        <line x1="38" y1="18" x2="44" y2="12" {...s} strokeWidth={1.8}/>
        <circle cx="45" cy="11" r="2.5" {...f}/>
      </>
    ),
    wraith: (
      <>
        <path d="M24 4 L13 15 L11 27 L18 29 L24 27 L30 29 L37 27 L35 15 Z" {...s}/>
        <line x1="17" y1="19" x2="22" y2="19" {...s} strokeWidth={2.5}/>
        <line x1="26" y1="19" x2="31" y2="19" {...s} strokeWidth={2.5}/>
        <path d="M18 29 L15 40 L19 45 L29 45 L33 40 L30 29" {...s}/>
        <path d="M11 24 Q5 21 7 14" {...dim}/>
        <path d="M37 24 Q43 21 41 14" {...dim}/>
      </>
    ),
    bloodhound: (
      <>
        <path d="M24 5 L13 10 L9 21 L12 29 L24 32 L36 29 L39 21 L35 10 Z" {...s}/>
        <ellipse cx="18" cy="18" rx="4.5" ry="3.5" {...s} strokeWidth={2}/>
        <ellipse cx="30" cy="18" rx="4.5" ry="3.5" {...s} strokeWidth={2}/>
        <line x1="22.5" y1="18" x2="25.5" y2="18" {...s} strokeWidth={1.5}/>
        <path d="M35 32 Q40 27 45 29 L43 33 Q38 36 34 35" {...s} strokeWidth={2}/>
        <circle cx="45" cy="27" r="2" {...f}/>
        <path d="M15 32 L12 44 L36 44 L33 32" {...s}/>
      </>
    ),
    gibraltar: (
      <>
        <path d="M5 24 Q5 6 24 6 Q43 6 43 24" {...s}/>
        <path d="M10 24 Q10 11 24 11 Q38 11 38 24" {...s} strokeWidth={1} opacity={0.25}/>
        <rect x="11" y="24" width="26" height="18" rx="5" {...s}/>
        <rect x="16" y="15" width="16" height="11" rx="3" {...s} strokeWidth={2}/>
        <path d="M37 28 L44 23 L46 32 L37 37" {...s} strokeWidth={2}/>
      </>
    ),
    lifeline: (
      <>
        <path d="M3 26 L9 26 L13 14 L18 38 L23 20 L27 26 L45 26" {...s}/>
        <rect x="19" y="36" width="10" height="10" rx="2" {...s} strokeWidth={2}/>
        <line x1="24" y1="36" x2="24" y2="46" {...s} strokeWidth={2}/>
        <line x1="19" y1="41" x2="29" y2="41" {...s} strokeWidth={2}/>
      </>
    ),
    bangalore: (
      <>
        <path d="M11 22 L11 15 Q11 5 24 5 Q37 5 37 15 L37 22 Z" {...s}/>
        <rect x="9" y="20" width="30" height="6" rx="3" {...f}/>
        <path d="M13 26 L11 44 L37 44 L35 26 Z" {...s}/>
        <rect x="37" y="28" width="7" height="12" rx="3" {...s} strokeWidth={2}/>
        <path d="M40.5 28 Q38 22 40.5 18" {...dim} strokeWidth={1.5}/>
      </>
    ),
    octane: (
      <>
        <circle cx="24" cy="16" r="11" {...s}/>
        <rect x="12" y="12" width="24" height="10" rx="5" {...s} strokeWidth={2}/>
        <line x1="24" y1="12" x2="24" y2="22" {...s} strokeWidth={1.5}/>
        <path d="M18 27 L14 38 L10 44" {...s}/>
        <path d="M30 27 L34 38 L38 44" {...s}/>
        <line x1="18" y1="27" x2="30" y2="27" {...s}/>
        <line x1="2" y1="38" x2="9" y2="38" {...dim} strokeWidth={1.5}/>
        <line x1="2" y1="42" x2="7" y2="42" {...dim} strokeWidth={1.5}/>
      </>
    ),
    horizon: (
      <>
        <circle cx="24" cy="17" r="12" {...s}/>
        <path d="M17 12 Q20 9 27 11" {...dim} strokeWidth={1.5}/>
        <circle cx="19" cy="16" r="2.5" {...f}/>
        <circle cx="29" cy="16" r="2.5" {...f}/>
        <path d="M14 29 L12 44 L36 44 L34 29 Q34 26 24 26 Q14 26 14 29 Z" {...s}/>
        <ellipse cx="24" cy="17" rx="18" ry="6" {...s} strokeWidth={1.5} strokeDasharray="3 3" opacity={0.4}/>
      </>
    ),
    valkyrie: (
      <>
        <path d="M4 22 Q2 14 10 16 L18 22" {...s}/>
        <path d="M44 22 Q46 14 38 16 L30 22" {...s}/>
        <line x1="6" y1="18" x2="10" y2="24" {...dim} strokeWidth={1.2}/>
        <line x1="42" y1="18" x2="38" y2="24" {...dim} strokeWidth={1.2}/>
        <path d="M16 22 Q16 10 24 10 Q32 10 32 22 L30 26 L18 26 Z" {...s}/>
        <line x1="18" y1="20" x2="30" y2="20" {...s} strokeWidth={2.5}/>
        <path d="M18 26 L16 44 L32 44 L30 26" {...s} strokeWidth={2}/>
        <rect x="20" y="28" width="8" height="10" rx="2" {...s} strokeWidth={1.5} opacity={0.5}/>
      </>
    ),
    loba: (
      <>
        <path d="M14 18 Q10 8 24 6 Q38 8 34 18" {...s}/>
        <ellipse cx="24" cy="20" rx="9" ry="10" {...s}/>
        <path d="M18 18 Q20 16.5 22 18" {...s} strokeWidth={1.8}/>
        <path d="M26 18 Q28 16.5 30 18" {...s} strokeWidth={1.8}/>
        <path d="M15 30 L12 44 L36 44 L33 30" {...s}/>
        <line x1="38" y1="10" x2="44" y2="44" {...s} strokeWidth={2} opacity={0.7}/>
        <circle cx="38" cy="8" r="3" {...s} strokeWidth={2}/>
      </>
    ),
    caustic: (
      <>
        <ellipse cx="24" cy="16" rx="12" ry="13" {...s}/>
        <ellipse cx="18" cy="15" rx="4" ry="4.5" {...s} strokeWidth={2}/>
        <ellipse cx="30" cy="15" rx="4" ry="4.5" {...s} strokeWidth={2}/>
        <circle cx="18" cy="15" r="2" {...f}/>
        <circle cx="30" cy="15" r="2" {...f}/>
        <line x1="12" y1="20" x2="8" y2="23" {...s} strokeWidth={2}/>
        <circle cx="7" cy="26" r="3" {...s} strokeWidth={2}/>
        <path d="M14 29 L11 44 L37 44 L34 29 Q34 26 24 26 Q14 26 14 29 Z" {...s}/>
        <rect x="38" y="20" width="6" height="18" rx="3" {...s} strokeWidth={2}/>
        <line x1="38" y1="25" x2="44" y2="25" {...s} strokeWidth={1.2}/>
        <line x1="38" y1="30" x2="44" y2="30" {...s} strokeWidth={1.2}/>
      </>
    ),
    crypto: (
      <>
        <path d="M14 14 Q14 5 24 5 Q34 5 34 14 L34 24 L14 24 Z" {...s}/>
        <rect x="12" y="18" width="24" height="8" rx="4" {...s} strokeWidth={2}/>
        <circle cx="19" cy="22" r="2.5" {...f}/>
        <circle cx="29" cy="22" r="2.5" {...f}/>
        <path d="M14 24 L11 44 L37 44 L34 24" {...s}/>
        <rect x="18" y="3" width="12" height="5" rx="2" {...s} strokeWidth={2}/>
        <rect x="30" y="6" width="14" height="9" rx="3" {...s} strokeWidth={1.8}/>
        <line x1="30" y1="10" x2="44" y2="10" {...dim} strokeWidth={1.5} strokeDasharray="2 2"/>
        <circle cx="38" cy="8" r="1.5" {...f} opacity={0.6}/>
      </>
    ),
    fuse: (
      <>
        <circle cx="24" cy="13" r="10" {...s}/>
        <line x1="20" y1="5" x2="18" y2="1" {...s} strokeWidth={2}/>
        <line x1="24" y1="3" x2="24" y2="0" {...s} strokeWidth={2}/>
        <line x1="28" y1="5" x2="30" y2="1" {...s} strokeWidth={2}/>
        <circle cx="18" cy="12" r="2.5" {...f}/>
        <circle cx="30" cy="12" r="2.5" {...f}/>
        <path d="M14 23 L12 44 L22 44 L24 32 L26 44 L36 44 L34 23" {...s}/>
        <path d="M34 25 L40 22 L44 26 L42 32 L36 34" {...s} strokeWidth={2}/>
        <circle cx="38" cy="22" r="4" {...s} strokeWidth={2}/>
      </>
    ),
    mirage: (
      <>
        <circle cx="24" cy="12" r="8" {...s}/>
        <path d="M14 22 L12 38 L36 38 L34 22 Q34 20 24 20 Q14 20 14 22 Z" {...s}/>
        <circle cx="14" cy="12" r="6" {...s} opacity={0.35}/>
        <path d="M6 20 L5 32 L22 32" {...s} strokeWidth={1.5} opacity={0.35}/>
        <circle cx="34" cy="12" r="6" {...s} opacity={0.35}/>
        <path d="M42 20 L43 32 L26 32" {...s} strokeWidth={1.5} opacity={0.35}/>
        <line x1="12" y1="42" x2="36" y2="42" {...s} strokeWidth={1.5} opacity={0.5}/>
        <path d="M10 40 Q10 36 24 36 Q38 36 38 40" {...dim} strokeWidth={1.5}/>
      </>
    ),
    rampart: (
      <>
        <rect x="12" y="6" width="24" height="16" rx="3" {...s}/>
        <line x1="10" y1="16" x2="38" y2="16" {...s} strokeWidth={2}/>
        <circle cx="18" cy="12" r="3" {...s} strokeWidth={2}/>
        <circle cx="30" cy="12" r="3" {...s} strokeWidth={2}/>
        <path d="M10 22 L8 44 L40 44 L38 22" {...s}/>
        <rect x="36" y="26" width="10" height="6" rx="2" {...s} strokeWidth={2}/>
        <rect x="38" y="22" width="6" height="5" rx="1" {...s} strokeWidth={1.5}/>
        <line x1="46" y1="27" x2="46" y2="29" {...s} strokeWidth={3}/>
        <line x1="46" y1="31" x2="46" y2="33" {...s} strokeWidth={3}/>
      </>
    ),
    revenant: (
      <>
        <path d="M24 4 Q16 4 15 12 L15 20 L17 24 L24 26 L31 24 L33 20 L33 12 Q32 4 24 4 Z" {...s}/>
        <rect x="20" y="16" width="4" height="5" rx="1" {...f}/>
        <rect x="26" y="16" width="4" height="5" rx="1" {...f}/>
        <line x1="19" y1="22" x2="29" y2="22" {...s} strokeWidth={1.5}/>
        <circle cx="24" cy="28" r="3" {...s} strokeWidth={2}/>
        <path d="M24 31 L24 38" {...s} strokeWidth={3}/>
        <path d="M14 38 L12 48 L20 44 L24 46 L28 44 L36 48 L34 38" {...s}/>
        <path d="M20 34 L24 30 L28 34 L24 38 Z" {...f} opacity={0.6}/>
      </>
    ),
    ash: (
      <>
        <path d="M12 8 L24 5 L36 8 L38 18 L32 24 L24 26 L16 24 L10 18 Z" {...s}/>
        <rect x="10" y="12" width="14" height="12" rx="2" {...f} opacity={0.3}/>
        <line x1="14" y1="16" x2="22" y2="16" {...s} strokeWidth={3}/>
        <circle cx="31" cy="17" r="3.5" {...s} strokeWidth={2}/>
        <path d="M16 26 L14 44 L34 44 L32 26" {...s}/>
        <path d="M32 22 Q38 16 44 20 Q42 28 36 28" {...s} strokeWidth={2}/>
      </>
    ),
    madmaggie: (
      <>
        <circle cx="24" cy="14" r="10" {...s}/>
        <line x1="18" y1="5" x2="16" y2="0" {...s} strokeWidth={2}/>
        <line x1="21" y1="4" x2="20" y2="0" {...s} strokeWidth={2}/>
        <line x1="24" y1="4" x2="24" y2="0" {...s} strokeWidth={2}/>
        <line x1="27" y1="4" x2="28" y2="0" {...s} strokeWidth={2}/>
        <line x1="30" y1="5" x2="32" y2="0" {...s} strokeWidth={2}/>
        <line x1="17" y1="16" x2="22" y2="16" {...s} strokeWidth={3}/>
        <path d="M19 20 Q22 22 24 20 Q26 22 29 20" {...s} strokeWidth={2}/>
        <path d="M14 24 L11 44 L37 44 L34 24" {...s}/>
        <circle cx="40" cy="36" r="6" {...s} strokeWidth={2}/>
        <line x1="34" y1="30" x2="38" y2="34" {...s} strokeWidth={2}/>
        <line x1="40" y1="42" x2="40" y2="46" {...s} strokeWidth={2.5}/>
      </>
    ),
    newcastle: (
      <>
        <rect x="4" y="12" width="22" height="30" rx="3" {...s}/>
        <rect x="8" y="16" width="14" height="8" rx="2" {...s} strokeWidth={2}/>
        <line x1="4" y1="26" x2="26" y2="26" {...s} strokeWidth={1.5} opacity={0.4}/>
        <line x1="4" y1="32" x2="26" y2="32" {...s} strokeWidth={1.5} opacity={0.4}/>
        <path d="M26 16 Q28 12 34 12 Q40 12 40 18 L40 32 L26 36" {...s}/>
        <rect x="30" y="15" width="8" height="10" rx="2" {...s} strokeWidth={2}/>
        <path d="M4 42 L4 46 L8 46 L8 42" {...s} strokeWidth={2}/>
        <path d="M22 42 L22 46 L26 46 L26 42" {...s} strokeWidth={2}/>
      </>
    ),
    seer: (
      <>
        <circle cx="24" cy="14" r="11" {...s}/>
        <line x1="24" y1="3" x2="24" y2="8" {...s} strokeWidth={2}/>
        <line x1="15" y1="18" x2="20" y2="18" {...s} strokeWidth={2}/>
        <line x1="28" y1="18" x2="33" y2="18" {...s} strokeWidth={2}/>
        <circle cx="24" cy="14" r="3" {...f}/>
        <path d="M14 25 L8 20 L4 28 L12 30" {...s} strokeWidth={1.8}/>
        <path d="M34 25 L40 20 L44 28 L36 30" {...s} strokeWidth={1.8}/>
        <path d="M12 30 L10 44 L38 44 L36 30 Q36 28 24 28 Q12 28 12 30 Z" {...s}/>
        <path d="M20 33 Q24 30 28 33 Q32 36 24 40 Q16 36 20 33 Z" {...s} strokeWidth={1.5}/>
      </>
    ),
    vantage: (
      <>
        <circle cx="24" cy="13" r="10" {...s}/>
        <rect x="10" y="10" width="10" height="7" rx="3" {...s} strokeWidth={2}/>
        <line x1="6" y1="13" x2="10" y2="13" {...s} strokeWidth={2}/>
        <circle cx="22" cy="13" r="2" {...f}/>
        <circle cx="28" cy="12" r="2.5" {...f}/>
        <path d="M14 23 L12 44 L36 44 L34 23" {...s}/>
        <path d="M28 8 Q34 4 40 6 Q38 12 34 12" {...s} strokeWidth={1.8}/>
        <circle cx="40" cy="5" r="2.5" {...f}/>
        <line x1="26" y1="26" x2="38" y2="20" {...s} strokeWidth={1.5} opacity={0.5}/>
      </>
    ),
    catalyst: (
      <>
        <circle cx="24" cy="13" r="10" {...s}/>
        <circle cx="19" cy="12" r="2.5" {...f}/>
        <circle cx="29" cy="12" r="2.5" {...f}/>
        <path d="M14 23 L12 38 L36 38 L34 23 Q34 22 24 22 Q14 22 14 23 Z" {...s}/>
        <path d="M12 30 Q6 26 4 32 Q8 38 14 36" {...s} strokeWidth={2} opacity={0.7}/>
        <path d="M8 28 Q4 22 6 16" {...s} strokeWidth={1.5} opacity={0.5}/>
        <path d="M36 30 Q44 24 44 34 Q40 40 34 36" {...s} strokeWidth={2} opacity={0.7}/>
        <line x1="20" y1="38" x2="18" y2="44" {...s} strokeWidth={2} opacity={0.6}/>
        <line x1="24" y1="38" x2="24" y2="46" {...s} strokeWidth={2} opacity={0.6}/>
        <line x1="28" y1="38" x2="30" y2="44" {...s} strokeWidth={2} opacity={0.6}/>
      </>
    ),
    ballistic: (
      <>
        <circle cx="24" cy="13" r="10" {...s}/>
        <path d="M14 8 Q14 5 20 5 L28 5 Q32 5 34 8" {...f} opacity={0.5}/>
        <path d="M16 8 Q16 5 20 5 L28 5 Q32 5 32 8 L30 10 L18 10 Z" {...s} strokeWidth={2}/>
        <circle cx="19" cy="14" r="2.5" {...f}/>
        <circle cx="29" cy="14" r="2.5" {...f}/>
        <path d="M14 23 L12 44 L36 44 L34 23" {...s}/>
        <line x1="16" y1="28" x2="32" y2="26" {...s} strokeWidth={1.5}/>
        <line x1="16" y1="32" x2="32" y2="30" {...s} strokeWidth={1.5}/>
        <rect x="34" y="22" width="12" height="7" rx="2" {...s} strokeWidth={2}/>
        <line x1="36" y1="22" x2="36" y2="29" {...s} strokeWidth={1.5}/>
      </>
    ),
    conduit: (
      <>
        <circle cx="24" cy="13" r="10" {...s}/>
        <circle cx="19" cy="12" r="2.5" {...f}/>
        <circle cx="29" cy="12" r="2.5" {...f}/>
        <path d="M14 23 L12 44 L36 44 L34 23 Q34 22 24 22 Q14 22 14 23 Z" {...s}/>
        <rect x="19" y="28" width="10" height="8" rx="2" {...s} strokeWidth={2}/>
        <line x1="21" y1="30" x2="27" y2="30" {...s} strokeWidth={1.5}/>
        <line x1="21" y1="33" x2="27" y2="33" {...s} strokeWidth={1.5}/>
        <path d="M12 32 Q6 30 4 24 Q6 18 12 20" {...s} strokeWidth={2} opacity={0.7}/>
        <path d="M36 32 Q42 30 44 24 Q42 18 36 20" {...s} strokeWidth={2} opacity={0.7}/>
        <line x1="6" y1="24" x2="3" y2="21" {...s} strokeWidth={1.5} opacity={0.5}/>
        <line x1="6" y1="28" x2="2" y2="27" {...s} strokeWidth={1.5} opacity={0.5}/>
        <line x1="42" y1="24" x2="45" y2="21" {...s} strokeWidth={1.5} opacity={0.5}/>
        <line x1="42" y1="28" x2="46" y2="27" {...s} strokeWidth={1.5} opacity={0.5}/>
      </>
    ),
    alter: (
      <>
        <path d="M12 8 L24 5 L36 8 L38 18 L32 24 L24 26 L16 24 L10 18 Z" {...s}/>
        <rect x="10" y="10" width="16" height="14" rx="2" {...f} opacity={0.25}/>
        <line x1="14" y1="16" x2="22" y2="16" {...s} strokeWidth={3}/>
        <ellipse cx="31" cy="16" rx="6" ry="8" {...s} strokeWidth={2}/>
        <ellipse cx="31" cy="16" rx="3" ry="5" {...s} strokeWidth={1.2} opacity={0.5}/>
        <path d="M16 26 L14 44 L34 44 L32 26" {...s}/>
        <line x1="37" y1="26" x2="44" y2="20" {...s} strokeWidth={1.5} strokeDasharray="2 2" opacity={0.5}/>
        <line x1="37" y1="30" x2="46" y2="28" {...s} strokeWidth={1.5} strokeDasharray="2 2" opacity={0.5}/>
      </>
    ),
  }

  return (
    <svg viewBox="0 0 48 48" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {icons[id]}
    </svg>
  )
}
