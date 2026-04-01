import type React from 'react'
import type { LegendId } from '../data/legends'

interface Props { id: LegendId; size?: number; color?: string }

export default function LegendIcon({ id, size = 44, color = '#e0e0e0' }: Props) {
  const f = { fill: color, stroke: 'none' }
  const o = { fill: color, stroke: 'none', opacity: 0.3 }
  const bg = '#0c0c12'

  const icons: Record<LegendId, React.ReactElement> = {

    // PATHFINDER — smiley robot face (circle + dot eyes + smile)
    pathfinder: (<>
      <circle cx="24" cy="23" r="17" {...f}/>
      <circle cx="17" cy="21" r="4.5" fill={bg}/>
      <circle cx="31" cy="21" r="4.5" fill={bg}/>
      <path d="M15 28 Q24 38 33 28" stroke={bg} strokeWidth={3.5} fill="none" strokeLinecap="round"/>
      <rect x="21" y="5" width="6" height="5" rx="2" {...f}/>
      <circle cx="24" cy="3" r="3" {...f}/>
    </>),

    // WRAITH — void portal: tall oval with hollow center
    wraith: (<>
      <ellipse cx="24" cy="25" rx="12" ry="19" {...f}/>
      <ellipse cx="24" cy="25" rx="6" ry="11" fill={bg}/>
      <circle cx="24" cy="4" r="3.5" {...f}/>
      <circle cx="24" cy="46" r="3.5" {...f}/>
      <path d="M14 20 Q8 16 6 22" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round"/>
      <path d="M34 20 Q40 16 42 22" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round"/>
    </>),

    // BLOODHOUND — plague mask: two goggles + downward beak triangle
    bloodhound: (<>
      <circle cx="16" cy="16" r="9" {...f}/>
      <circle cx="32" cy="16" r="9" {...f}/>
      <rect x="16" y="13" width="16" height="6" {...f}/>
      <circle cx="16" cy="16" r="4" fill={bg}/>
      <circle cx="32" cy="16" r="4" fill={bg}/>
      <path d="M14 24 L24 44 L34 24 Z" {...f}/>
    </>),

    // GIBRALTAR — filled dome shield + inner ring + gem
    gibraltar: (<>
      <path d="M5 36 Q5 5 24 5 Q43 5 43 36 L43 41 Q43 47 24 47 Q5 47 5 41 Z" {...f}/>
      <path d="M11 36 Q11 16 24 16 Q37 16 37 36" stroke={bg} strokeWidth={2.5} fill="none"/>
      <circle cx="24" cy="28" r="5" fill={bg}/>
    </>),

    // LIFELINE — fat medical cross
    lifeline: (<>
      <rect x="8" y="17" width="32" height="14" rx="5" {...f}/>
      <rect x="17" y="8" width="14" height="32" rx="5" {...f}/>
    </>),

    // BANGALORE — smoke grenade: cylinder + cap + smoke wisps
    bangalore: (<>
      <rect x="15" y="16" width="18" height="27" rx="5" {...f}/>
      <rect x="19" y="10" width="10" height="8" rx="2" {...f}/>
      <rect x="22" y="5" width="4" height="6" rx="1.5" {...f}/>
      <path d="M10 28 Q3 24 3 32 Q3 40 11 38" stroke={color} strokeWidth={2.5} fill="none" strokeLinecap="round"/>
      <path d="M38 28 Q45 24 45 32 Q45 40 37 38" stroke={color} strokeWidth={2.5} fill="none" strokeLinecap="round"/>
    </>),

    // OCTANE — lightning bolt (speed / stim)
    octane: (<>
      <path d="M30 2 L14 27 L22 27 L18 46 L36 19 L28 19 Z" {...f}/>
    </>),

    // HORIZON — sphere + saturn ring
    horizon: (<>
      <ellipse cx="24" cy="24" rx="22" ry="7" stroke={color} strokeWidth={3.5} fill="none"/>
      <circle cx="24" cy="24" r="13" {...f}/>
      <circle cx="18" cy="22" r="3.5" fill={bg}/>
      <circle cx="30" cy="22" r="3.5" fill={bg}/>
    </>),

    // VALKYRIE — wing pair + body
    valkyrie: (<>
      <path d="M1 17 Q3 6 16 13 L22 30 L24 26 L26 30 L32 13 Q45 6 47 17 L36 44 L28 34 L24 40 L20 34 Z" {...f}/>
    </>),

    // LOBA — diamond jewel
    loba: (<>
      <path d="M24 4 L42 20 L24 46 L6 20 Z" {...f}/>
      <path d="M6 20 L24 4 L42 20 L24 22 Z" fill={bg} opacity={0.35}/>
      <path d="M15 19 L24 10 L33 19" stroke={bg} strokeWidth={1.5} fill="none"/>
    </>),

    // CAUSTIC — gas mask: wide canisters on sides + center facepiece + visor
    caustic: (<>
      <circle cx="10" cy="24" r="9" {...f}/>
      <circle cx="38" cy="24" r="9" {...f}/>
      <circle cx="10" cy="24" r="4.5" fill={bg}/>
      <circle cx="38" cy="24" r="4.5" fill={bg}/>
      <ellipse cx="24" cy="24" rx="12" ry="10" {...f}/>
      <rect x="18" y="22" width="12" height="4" {...f}/>
      <ellipse cx="24" cy="21" rx="6" ry="4" fill={bg}/>
    </>),

    // CRYPTO — surveillance drone: rect body + 4 rotors + camera eye
    crypto: (<>
      <rect x="8" y="16" width="32" height="16" rx="5" {...f}/>
      <ellipse cx="8" cy="16" rx="5" ry="4" {...f}/>
      <ellipse cx="40" cy="16" rx="5" ry="4" {...f}/>
      <ellipse cx="8" cy="32" rx="5" ry="4" {...f}/>
      <ellipse cx="40" cy="32" rx="5" ry="4" {...f}/>
      <circle cx="24" cy="24" r="6" fill={bg}/>
      <circle cx="24" cy="24" r="2.5" {...f}/>
    </>),

    // FUSE — frag grenade: round sphere + lever top + ring pin
    fuse: (<>
      <circle cx="24" cy="30" r="14" {...f}/>
      <rect x="20" y="14" width="8" height="10" rx="2" {...f}/>
      <path d="M20 14 Q18 8 22 6 Q27 3 30 8 Q32 12 24 14" stroke={color} strokeWidth={2.5} fill="none" strokeLinecap="round"/>
      <path d="M14 26 Q13 20 24 20 Q35 20 34 26" stroke={bg} strokeWidth={2.5} fill="none"/>
    </>),

    // MIRAGE — center figure + two ghost clones
    mirage: (<>
      <circle cx="24" cy="11" r="8" {...f}/>
      <path d="M16 20 L14 42 L34 42 L32 20 Q32 18 24 18 Q16 18 16 20 Z" {...f}/>
      <circle cx="8" cy="12" r="5.5" {...o}/>
      <path d="M2 20 L1 38 L15 38 L16 22" fill={color} stroke="none" opacity={0.3}/>
      <circle cx="40" cy="12" r="5.5" {...o}/>
      <path d="M46 20 L47 38 L33 38 L32 22" fill={color} stroke="none" opacity={0.3}/>
    </>),

    // RAMPART — triple-barrel minigun + muzzle
    rampart: (<>
      <rect x="4" y="8" width="34" height="9" rx="4.5" {...f}/>
      <rect x="4" y="19" width="34" height="9" rx="4.5" {...f}/>
      <rect x="4" y="30" width="34" height="9" rx="4.5" {...f}/>
      <circle cx="10" cy="12.5" r="3.5" fill={bg}/>
      <circle cx="10" cy="23.5" r="3.5" fill={bg}/>
      <circle cx="10" cy="34.5" r="3.5" fill={bg}/>
      <rect x="38" y="6" width="8" height="35" rx="3" {...f}/>
    </>),

    // REVENANT — skull face with hollow eyes and teeth
    revenant: (<>
      <path d="M24 3 Q11 3 10 17 L10 28 L13 33 L35 33 L38 28 L38 17 Q37 3 24 3 Z" {...f}/>
      <rect x="14" y="35" width="8" height="12" rx="2" {...f}/>
      <rect x="26" y="35" width="8" height="12" rx="2" {...f}/>
      <rect x="22" y="35" width="4" height="9" {...f}/>
      <rect x="15" y="13" width="7" height="12" rx="1.5" fill={bg}/>
      <rect x="26" y="13" width="7" height="12" rx="1.5" fill={bg}/>
    </>),

    // ASH — split face: left half filled, right half outline only
    ash: (<>
      <path d="M24 4 A20 20 0 0 1 24 44 Z" {...f}/>
      <circle cx="24" cy="24" r="20" stroke={color} strokeWidth={2.5} fill="none"/>
      <line x1="24" y1="4" x2="24" y2="44" stroke={color} strokeWidth={2.5}/>
      <circle cx="30" cy="21" r="5" fill={bg}/>
      <circle cx="30" cy="21" r="2" {...f}/>
    </>),

    // MAD MAGGIE — wrecking ball + chain
    madmaggie: (<>
      <circle cx="31" cy="34" r="13" {...f}/>
      <path d="M25 22 Q18 14 13 8" stroke={color} strokeWidth={4} fill="none" strokeLinecap="round"/>
      <path d="M29 23 Q24 17 20 15" stroke={color} strokeWidth={3} fill="none" strokeLinecap="round"/>
      <circle cx="11" cy="6" r="5" {...f}/>
    </>),

    // NEWCASTLE — castle tower with battlements
    newcastle: (<>
      <rect x="13" y="18" width="22" height="30" {...f}/>
      <rect x="8" y="8" width="9" height="14" rx="1" {...f}/>
      <rect x="20" y="8" width="8" height="14" rx="1" {...f}/>
      <rect x="31" y="8" width="9" height="14" rx="1" {...f}/>
      <rect x="19" y="26" width="10" height="14" rx="2" fill={bg}/>
    </>),

    // SEER — butterfly wings (4 wings + body)
    seer: (<>
      <path d="M22 22 Q8 2 2 12 Q2 28 18 26 Z" {...f}/>
      <path d="M26 22 Q40 2 46 12 Q46 28 30 26 Z" {...f}/>
      <path d="M22 26 Q10 26 6 38 Q10 46 21 40 Z" {...f}/>
      <path d="M26 26 Q38 26 42 38 Q38 46 27 40 Z" {...f}/>
      <ellipse cx="24" cy="24" rx="3" ry="10" {...f}/>
    </>),

    // VANTAGE — scope crosshair
    vantage: (<>
      <circle cx="24" cy="22" r="16" {...f}/>
      <circle cx="24" cy="22" r="9" fill={bg}/>
      <circle cx="24" cy="22" r="3" {...f}/>
      <rect x="4" y="20" width="9" height="4" {...f}/>
      <rect x="35" y="20" width="9" height="4" {...f}/>
      <rect x="22" y="2" width="4" height="9" {...f}/>
      <rect x="22" y="31" width="4" height="9" {...f}/>
    </>),

    // CATALYST — ferrofluid spike crown
    catalyst: (<>
      <path d="M11 26 L14 8 L17 24 L19 6 L22 22 L24 2 L26 22 L29 6 L31 24 L34 8 L37 26 Q36 40 24 42 Q12 40 11 26 Z" {...f}/>
      <circle cx="24" cy="30" r="5" fill={bg}/>
    </>),

    // BALLISTIC — bullet cartridge
    ballistic: (<>
      <path d="M14 18 Q14 4 24 4 Q34 4 34 18 L34 40 Q34 46 24 46 Q14 46 14 40 Z" {...f}/>
      <path d="M14 18 Q14 8 24 8 Q34 8 34 18 L14 18 Z" fill={bg} opacity={0.4}/>
      <rect x="14" y="34" width="20" height="4" fill={bg} opacity={0.35}/>
    </>),

    // CONDUIT — EVOシールド + 稲妻ボルト抜き
    conduit: (<>
      <path d="M24 3 L7 12 L7 32 Q7 45 24 47 Q41 45 41 32 L41 12 Z" {...f}/>
      <path d="M29 12 L18 27 L25 27 L20 42 L33 23 L26 23 Z" fill={bg}/>
    </>),

    // ALTER — void portal: concentric horizontal ovals
    alter: (<>
      <ellipse cx="24" cy="24" rx="22" ry="16" stroke={color} strokeWidth={2} fill="none" opacity={0.4}/>
      <ellipse cx="24" cy="24" rx="19" ry="13" {...f}/>
      <ellipse cx="24" cy="24" rx="12" ry="7" fill={bg}/>
      <ellipse cx="24" cy="24" rx="5" ry="2.5" {...f}/>
    </>),
  }

  return (
    <svg viewBox="0 0 48 48" width={size} height={size} xmlns="http://www.w3.org/2000/svg" overflow="visible">
      {icons[id]}
    </svg>
  )
}
