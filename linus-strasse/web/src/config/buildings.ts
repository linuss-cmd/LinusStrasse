// Single source of truth for all buildings on the street.
// To add a new building: append one entry to the `buildings` array.
// Order in the array = order on the street (left to right).

export type BuildingAction =
  | { type: 'external'; target: string }  // opens in new tab
  | { type: 'internal'; target: string }  // vue-router push
  | { type: 'overlay'; target: string }   // shows overlay panel (future)

export interface Building {
  id: string            // unique key — used as Vue :key
  image: string         // path from /public root, e.g. /buildings/my-facade.png
  alt: string           // descriptive alt text — required for accessibility
  naturalWidth: number  // natural image width in px — prevents layout shift
  naturalHeight: number // natural image height in px — prevents layout shift
  action: BuildingAction
}

// Street order (left to right):
// Spielhalle | YouTube | LinkedIn | Contact Kiosk | About Me Friseur | SoundCloud | Instagram Café
// Contact Kiosk + About Me Friseur are in the center — first visible on load.
export const buildings: Building[] = [
  {
    id: 'spielhalle-left',
    image: '/buildings/spielhalle.png',
    alt: 'Spielhalle — zukünftige Projekte und Spielereien',
    naturalWidth: 1448,
    naturalHeight: 1086,
    action: { type: 'external', target: 'https://dirtyclarks.com' },
  },
  {
    id: 'youtube',
    image: '/buildings/youtube-kino.png',
    alt: 'YouTube Kino — Linus auf YouTube',
    naturalWidth: 1537,
    naturalHeight: 838,
    action: { type: 'external', target: 'https://www.youtube.com' },
  },
  {
    id: 'linkedin',
    image: '/buildings/linkedin-office.png',
    alt: 'LinkedIn Büro — Linus auf LinkedIn',
    naturalWidth: 1506,
    naturalHeight: 922,
    action: { type: 'external', target: 'https://www.linkedin.com/in/linus-saschek-b31a1a426' },
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
    image: '/buildings/about-friseur.png',
    alt: 'About Me Friseur — Über Linus',
    naturalWidth: 1420,
    naturalHeight: 959,
    action: { type: 'internal', target: '/about' },
  },
  {
    id: 'soundcloud',
    image: '/buildings/soundcloud-store.png',
    alt: 'SoundCloud Plattenladen — Linus auf SoundCloud',
    naturalWidth: 1129,
    naturalHeight: 1254,
    action: { type: 'external', target: 'https://soundcloud.com/user-378441491' },
  },
  {
    id: 'instagram',
    image: '/buildings/instagram-cafe.png',
    alt: 'Instagram Café — Linus auf Instagram',
    naturalWidth: 1254,
    naturalHeight: 1254,
    action: { type: 'external', target: 'https://www.instagram.com/linusferrari.de' },
  },
]
