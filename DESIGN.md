# Travelo Design Reference

This site's look comes from the **Travelo** Framer template (a saved copy is in `D:\Anveet\_ref\travelo`). The values below were taken from its compiled HTML and CSS. Use the tokens; don't hard-code values.

## Brand
- Name: **Travelo**. Logo: the three-blob mark plus a "Travelo" wordmark in Golos Text, weight 415, letter-spacing -0.057em. See `components/layout/Logo.tsx`; the original SVG is `public/images/travelo/logo.svg`.
- Content: India and Germany travel **discovery** only. No prices, ratings, testimonials, stats or booking.

## Color (`styles/tokens.css`)
| Token | Hex | Use |
|---|---|---|
| `navy` | #1B2978 | Text, headings, dark buttons |
| `navy-deep` | #0E1954 | Hover and pressed states |
| `navy-night` | #0A1345 | Dark sections (Featured) and overlays |
| `mist` | #F5F9FC | Light section background (About) |
| `tint` | #EDF4FA | Soft fills |
| `paper` | #FAFAFA | Page background |
| `accent` | #F46D2B | Cursor arrow disc, small dots, focus ring. Never a large fill |

Glass tag: `bg-white/55` with a 10px backdrop blur and navy-night text.

## Type
- **Spectral 400** for headings, with tight tracking: h1/h2 -0.06em, h3 -0.045em.
  - Display: 45–64px
  - h2: 36–46px
  - h3: 24–29px
- **Golos Text** for body text, 17px. Lead paragraphs are 20px at 85% opacity on images.
- Eyebrow label: lowercase, 14px, between two flourishes (a 60px hairline plus a 3px dot rotated 138°). See `SectionLabel`.

## Shape and layout
- Radius:
  - Cards: 24px
  - Hero card: 30px, with a 22px inner image
  - Small: 14px
  - Buttons and tags: pill
- Content max width 1340px. Section padding 120px top and bottom on desktop, 32px at the sides.
- Shadows are soft, stacked and navy-tinted (`shadow-sm` / `shadow-lg`).

## Components
- **Primary button**: a 53px pill with a 45px round arrow badge on the right. On hover, the label rolls up as a second copy slides in, and the arrow rotates 45°. Use `light` over images and `dark` on light backgrounds.
- **Card hover**: an 82px orange arrow disc follows the pointer over the image, scaling in from 0. It's mouse-only (`CursorArrow`). The image scales to 1.03.
- **Value card**: 280×340, white, with the icon at the top and text at the bottom. In the image variant, a blurred dark mask sits under the text.

## Motion (`lib/motion.ts`)
- **Heading reveal** (`WordReveal`): word by word, each word goes from blur(8px), opacity 0 and y 20 to clear. Uses spring `travelo` (stiffness 200, damping 80), 60ms between words. Plays on view, or on load in the hero.
- **Block appear**: opacity 0 and y 30, same spring. Hero delays are 0.6s for the paragraph, 0.75s for the button and 0.9s for the card.
- **Hero background**: scales from 1.1 to 1 over 1.8s.
- **About heading** (`ScrollWords`): each word goes from 15% to 100% opacity as you scroll through it.
- Respect reduced motion: `MotionConfig reducedMotion="user"` is set, and the global CSS shortens animations.

## Home sections (in order)
1. **Hero**: full-bleed island photo. Copy at top-left, destination card slideshow at top-right, a giant "TRAVELO" wordmark along the bottom edge.
2. **About** (`mist` background): eyebrow, scroll-highlight paragraph, "More about us" button, three value cards.
3. **Featured** (`navy-night` background): eyebrow, word-reveal h2, a scroll-snap carousel with a centred card (up to 820px wide) and side peeks, round arrows below, and a CTA row.

## Pages
| Route | What's on it |
|---|---|
| `/` | Hero, About, Featured |
| `/explore` | Two country cards: image zoom, dimming of the other card, 4° tilt |
| `/india`, `/germany` | Banner, category chips (synced to `?category=`), animated grid |
| `/[country]/[slug]` | Hero (morphs from the card image), heart, share, sticky sub-nav, tabs: Attractions, Best Time, How to Reach, Nearby (mini map) |
| `.../videos` | Lite YouTube embed (poster first, iframe on click) and a highlights list |
| `.../gallery` | Masonry grid and lightbox (arrow keys, swipe, swipe down or Esc to close, double-click to zoom) |
| `/map` | Country switcher (flyTo), layer toggles, list ↔ pin hover, popup card. MapLibre with OpenFreeMap tiles |
| `/favorites` | Saved cards (localStorage) with an Undo toast |
| `/about` | Story, mission, and the home About section |

Search: Ctrl/⌘K or the header icon opens `CommandPalette`. It matches names, regions, themes and attraction names, groups results by country, and stores recent searches locally.

## Content
- `content/destinations.ts`: core data (name, region, tag, categories, description, coordinates, hero image).
- `content/details.ts`: attractions, best months with notes per month, how to reach, nearby places.
- `content/places.json`: about 100 generated places from Wikidata, Wikipedia and Commons. Rebuild it with `npm run fetch:places` (takes about 20 minutes). Generated places show a description, a Wikipedia link, a gallery, a map, and the 3 closest places. Curated places with the same slug take priority.
- `content/media.json`: 3 YouTube videos and 8 Wikimedia gallery photos per destination. Generated by `_ref/media.py`.

## Images
- Destination photos: Wikimedia Commons originals, resized to 2560px wide WebP and stored in `public/images/destinations/`. Credit the photographers on any public page.
- Hero: Travelo's island photo, `public/images/travelo/hero.webp`.
