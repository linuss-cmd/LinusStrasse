// Single source of truth for all buildings on the street.
// To add a new building: append one entry to the `buildings` array.
// Order in the array = order on the street (left to right).

export type BuildingAction =
  | { type: 'external'; target: string }  // opens in new tab
  | { type: 'internal'; target: string }  // vue-router push
  | { type: 'overlay'; target: string }   // shows overlay panel (future)
  | { type: 'none' }                      // no interaction — decorative building

export interface Building {
  id: string            // unique key — used as Vue :key
  image: string         // path from /public root, e.g. /buildings/my-facade.png
  alt: string           // descriptive alt text — required for accessibility
  naturalWidth: number  // natural image width in px — prevents layout shift
  naturalHeight: number // natural image height in px — prevents layout shift
  action: BuildingAction
}

// Street order (left to right):
// Spielhalle (edge) | LinkedIn | YouTube | Contact Kiosk | About Me Barber | SoundCloud | Spielhalle (edge)
// About Me + Contact are in the center — first visible on load.
// Spielhalle has no action (placeholder, future projects).
export const buildings: Building[] = [
  {
    id: 'spielhalle-left',
    image: '/buildings/spielhalle.png',
    alt: 'Spielhalle — zukünftige Projekte und Spielereien',
    naturalWidth: 1448,
    naturalHeight: 1086,
    action: { type: 'none' },
  },
  {
    id: 'linkedin',
    image: '/buildings/linkedin-office.png',
    alt: 'LinkedIn Büro — Linus auf LinkedIn',
    naturalWidth: 1506,
    naturalHeight: 922,
    action: { type: 'external', target: 'https://www.linkedin.com/in/linus' },
  },
  {
    id: 'youtube',
    image: '/buildings/youtube-kino.png',
    alt: 'YouTube Kino — Linus auf YouTube',
    naturalWidth: 1537,
    naturalHeight: 1023,
    action: { type: 'external', target: 'https://www.youtube.com' },
  },
  {
    id: 'contact',
    image: '/buildings/contact-kiosk.png',
    alt: 'Contact Kiosk — Kontakt aufnehmen mit Linus',
    naturalWidth: 1254,
    naturalHeight: 1254,
    action: { type: 'internal', target: '/contact' },
  },
  {
    id: 'about',
    image: '/buildings/placeholder-about.svg',
    alt: 'Friseursalon — Über Linus',
    naturalWidth: 800,
    naturalHeight: 1000,
    action: { type: 'internal', target: '/about' },
  },
  {
    id: 'soundcloud',
    image: '/buildings/soundcloud-store.png',
    alt: 'SoundCloud Plattenladen — Linus auf SoundCloud',
    naturalWidth: 1129,
    naturalHeight: 1254,
    action: { type: 'external', target: 'https://soundcloud.com' },
  },
  {
    id: 'spielhalle-right',
    image: '/buildings/spielhalle.png',
    alt: 'Spielhalle — zukünftige Projekte und Spielereien',
    naturalWidth: 1448,
    naturalHeight: 1086,
    action: { type: 'none' },
  },
]
