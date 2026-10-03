# Upcheck Pond Icon Set

Custom icon library for Upcheck — the branded replacement for generic
(Lucide-style) icons on the website and in the Neerani Android app.

**Style: "pond-duotone"** — 24px grid, 1.75px stroke, round caps/joins, 2px
padding. Every icon's outline follows `currentColor`, and every icon carries
exactly **one filled water accent** (a droplet, beacon, pellets or ripple dot)
that fills with `var(--uc-accent)` — defaulting to brand cyan `#00C9E4`.
Set `--uc-accent` in CSS to re-tint the accent; set the text colour to change
the outline (works on light and dark surfaces).

Full spec: [style-spec.json](./style-spec.json). Review the whole set in a
browser: open [preview.html](./preview.html).

## Using on this website

```tsx
import { IconShrimp, IconWaterDrop } from "@/components/icons";

<IconShrimp className="w-8 h-8 text-[#0067B1]" />
```

The React components live in `client/src/components/icons/index.tsx` and are
mirrored from the raw SVGs here. `--uc-accent: #00C9E4` is defined in
`client/src/index.css`.

## Using on other websites

Copy any `.svg` from this folder and inline it. The accent picks up the
`--uc-accent` CSS variable with a built-in cyan fallback:

```html
<style>:root { --uc-accent: #00C9E4; }</style>
<svg ...>...</svg> <!-- stroke inherits the text colour -->
```

For React Native, paste an icon's paths into a `react-native-svg` `<Svg>` with
the same viewBox, stroke and fill rules.

## Using in mobile apps (Android / iOS)

Regenerate tinted PNGs from the raw SVGs:

```
npm run icons:export
```

Output (gitignored — regenerate on demand):

- `icons/export/android/{brand,white}/mipmap-{mdpi…xxxhdpi}/<name>.png`
  — drop into `res/` (brand = deep-blue outline + cyan accent; white = white
  outline + cyan accent for dark surfaces)
- `icons/export/ios/{brand,white}/<name>@{1,2,3}x.png`
  — add to an asset catalogue (24/48/72px)

The same run also refreshes `icons/preview.html`.

## Adding an icon

1. Add `<name>.svg` here following the rules above (see any existing file).
2. Mirror it as a component in `client/src/components/icons/index.tsx`.
3. Add the name to `style-spec.json`.
4. Run `npm run icons:export` to refresh the preview and PNG exports.
