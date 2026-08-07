// Single source of truth for all buildings on the street.
// To add a new building: append one entry to the `buildings` array.
// Order in the array = order on the street (left to right).

export type BuildingAction =
  | { type: 'external'; target: string }  // opens in new tab
  | { type: 'internal'; target: string }  // vue-router push (future)
  | { type: 'overlay'; target: string }   // shows overlay panel (future)

export interface Building {
  id: string            // unique key — used as Vue :key
  image: string         // path from /public root, e.g. /buildings/my-facade.png
  alt: string           // descriptive alt text — required for accessibility
  naturalWidth: number  // natural image width in px — prevents layout shift
  naturalHeight: number // natural image height in px — prevents layout shift
  action: BuildingAction
}

export const buildings: Building[] = [
  {
    id: 'linkedin',
    image: '/buildings/placeholder-linkedin.svg',
    alt: 'Bürogebäude — LinkedIn Profil von Linus',
    naturalWidth: 420,
    naturalHeight: 800,
    action: { type: 'external', target: 'https://www.linkedin.com' },
  },
  {
    id: 'youtube',
    image: '/buildings/placeholder-youtube.svg',
    alt: 'Kino — YouTube Kanal von Linus',
    naturalWidth: 520,
    naturalHeight: 800,
    action: { type: 'external', target: 'https://www.youtube.com' },
  },
  {
    id: 'soundcloud',
    image: '/buildings/placeholder-soundcloud.svg',
    alt: 'Plattenladen — SoundCloud Musik von Linus',
    naturalWidth: 380,
    naturalHeight: 800,
    action: { type: 'external', target: 'https://soundcloud.com' },
  },
]
