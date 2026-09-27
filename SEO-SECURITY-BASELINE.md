<p align="center">
  <img src="../client/public/attached_assets/upcheck-logo.png" alt="Upcheck" width="96" />
</p>

<h1 align="center">SEO &amp; Security Baseline</h1>

<p align="center">
  <b>Upcheck Technologies Private Limited</b><br/>
  <sub>Precision aquaculture for shrimp farmers · <a href="https://www.upcheck.in">www.upcheck.in</a></sub>
</p>

---

| | |
|---|---|
| **Document** | UPC-WEB-SPEC-005 · SEO & Security Baseline (Phase 1 of 2) |
| **Assignee** | Website Team |
| **Owner / reviewer** | Founders (Upcheck Technologies Private Limited) |
| **Status** | Ready to start |
| **Audited on** | 14 Sep 2026, against `main` @ `73dc3ac` and the live site |
| **Scope** | Code, assets, config files in this repo (`vercel.json`, sitemap, robots, headers, scripts) |
| **Out of scope** | Search Console / Bing registration, DNS, Cloudflare, Vercel dashboard settings, env vars. These are listed in [§7 Owner actions](#7-owner-actions-not-for-the-website-team) |

> **Brand notes for anything visitor-facing you touch.** Primary Cyan `#00B4D8`, Deep Ocean Blue `#0077B6`, theme color `#0067B1`, Aqua accent `#90E0EF`. Poppins for headlines, Inter for body. Our voice is plain and honest: Neerani is **in closed beta**, Neero is **in development**. SEO copy must never claim more than the page does. No "AI-powered" and no invented ratings or reviews.

---

## Contents

1. [How the site is built (read first)](#1-how-the-site-is-built-read-first)
2. [Where we stand today](#2-where-we-stand-today)
3. [Decisions already made](#3-decisions-already-made)
4. [SEO tasks](#4-seo-tasks)
5. [Security tasks](#5-security-tasks)
6. [Order of work, PR plan and final checklist](#6-order-of-work-pr-plan-and-final-checklist)
7. [Owner actions (not for the Website Team)](#7-owner-actions-not-for-the-website-team)
8. [Deferred to the advanced spec](#8-deferred-to-the-advanced-spec)

---

## 1. How the site is built (read first)

These points cause most of the surprises below.

- **Vite + React 18 single-page app**, routed with **wouter 3.3.5** (`client/src/App.tsx`). Every page is rendered in the browser. `client/index.html` has an empty `<div id="root">`.
- **Production is Vercel**, configured by `vercel.json`:
  - Static output: `dist/public`.
  - `/api/*` goes to **`api/index.ts`**, the only server code that runs in production.
  - Every other path is rewritten to `index.html`.
- **`server/` is the local dev server only.** `server/index.ts` (Helmet, CORS) and `server/routes.ts` **never run on Vercel**. Any production security or API change goes in `api/index.ts` or `vercel.json`. Changing only `server/` changes nothing live.
- **Host:** `upcheck.in` 308-redirects to **`www.upcheck.in`**, so `www` is the real site.
- **Per-page meta** is set client-side by `client/src/components/RouteMeta.tsx` after JavaScript runs.
- **Articles:** 18 posts, ids `1`–`18`, at `/resources/:id`. Pages start from the bundled `client/src/pages/posts.json`, then refresh from MongoDB through `/api/posts`. Some thumbnails load from `/api/media/:id` (GridFS).
- **Forms** post to Web3Forms (`client/src/config/forms.ts`). The feedback page also posts to `/api/feedback` (MongoDB).
- **Languages:** EN, TA, TE, HI, BN, switched client-side on the same URL (`LanguageContext.tsx` sets `<html lang>`).

---

## 2. Where we stand today

### 2.1 SEO

| Area | State | Evidence |
|---|---|---|
| Canonical host | ❌ **Wrong host** | Canonicals, `og:url`, `og:image`, JSON-LD, `robots.txt` and all 15 sitemap `<loc>` use `https://upcheck.in`, which 308-redirects to `www`. Google is sent to a redirect for every URL. |
| Per-page HTML | ❌ **Same HTML for every URL** | `curl https://www.upcheck.in/products` returns the homepage `<title>`. Titles, descriptions and content exist only after JS runs. |
| Social previews | ❌ Homepage only | WhatsApp, LinkedIn and Slack don't run JS, so every shared link shows the homepage card (noted in `RouteMeta.tsx`). |
| 404 handling | ❌ **Soft 404s** | `curl -I https://www.upcheck.in/does-not-exist` returns `200`. The catch-all rewrite serves `index.html` for everything. |
| 404 page | ❌ Not visitor-ready | `pages/not-found.tsx` reads "Did you forget to add the page to the router?" with no nav or brand. |
| Duplicate URLs | ⚠️ | `/app` = `/download`, `/events` = `/participate/events`, `/events/:slug` = `/participate/events/:slug`. All return 200 with no redirect. |
| Sitemap | ⚠️ Partial | Hand-written, wrong host. Missing all 18 articles and `/participate/events/makeathon-7`. |
| robots.txt | ⚠️ | Allows all (fine), but the `Sitemap:` line points at the redirecting apex. |
| Titles / descriptions | ⚠️ Some too long | Descriptions over ~155 chars get truncated: `/` 164, `/technology` 172, `/welfare` 168. The `/welfare` title is 63 chars. The `index.html` description is ~250 chars. |
| Headings | ⚠️ | `/about` has **no `<h1>`** (only `h2`s in `OurStory`). Other pages have one. |
| Structured data | ⚠️ Minimal | Only `Organization` in `index.html`, with the apex URL. No `WebSite`, `SoftwareApplication` (Neerani) or `Article`. |
| Images | ⚠️ | All 23 `<img>` have `alt` ✅. **None** have `width`/`height` (layout shift). Only 1 uses `loading="lazy"`. |
| Article thumbnails | ❌ Broken in prod | 8 posts use `/api/media/...`, which fails because the API is down (see 2.2). |
| Icons / manifest | ✅ mostly | PNG favicons, apple-touch-icon and manifest are good. No `/favicon.ico` (still requested by browsers and crawlers). |
| OG image | ✅ | `og-image.jpg` 1200×630 serves correctly. |
| Viewport / lang | ✅ | Pinch-zoom allowed, `<html lang>` updates with language. |
| Unused weight | ⚠️ | 17 files in `attached_assets/` appear unreferenced (list in S9). Unused components: `VideoSection`, `DashboardPreview`, `StatisticsSection`, `PondToHandsSection`, `AppDownloadCTA`, `pages/polls.tsx` + `components/polls/*`. |

### 2.2 Security

| Area | State | Evidence |
|---|---|---|
| HTTPS / HSTS | ✅ | Vercel sends `Strict-Transport-Security: max-age=63072000`, and HTTP redirects to HTTPS. |
| Security headers | ❌ **None in production** | No CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` or `Permissions-Policy`. Helmet exists but only in `server/index.ts`, which doesn't run on Vercel. The site can be framed (clickjacking). |
| Production API | ❌ **Down** | `GET /api/posts` returns `500 FUNCTION_INVOCATION_FAILED`, so `/api/media/*` and `/api/feedback` are down too. The feedback form's DB write fails. Root cause **not yet confirmed**; see X2. |
| Dependencies | ❌ | `npm audit --omit=dev`: **18 findings (11 high, 4 moderate, 3 low)**. Includes `express`, `path-to-regexp`, `qs`, `body-parser`, `ws`, `postcss`, `drizzle-orm`. All but `drizzle-orm` fix with `npm audit fix`. |
| Unused server deps | ⚠️ | Template leftovers never imported: `passport`, `passport-local`, `express-session`, `connect-pg-simple`, `memorystore`, `@neondatabase/serverless`, `ws`. `drizzle-orm`/`drizzle-zod` are used only by the unused `shared/schema.ts` → `server/storage.ts` user table. |
| `/api/media/:id` | ⚠️ | Streams any GridFS file with its stored `Content-Type`. If an HTML or SVG file is ever uploaded, it runs as script on our origin. |
| Rate limiting | ⚠️ Partial | `express-rate-limit` is in `api/index.ts`, but in-memory, so per-instance on serverless. Platform WAF is an owner action. |
| Input validation | ✅ | `/api/feedback` uses zod with length caps, a 32 kb body cap and a 5-per-15-min limit. Mongo lookups use string params, with no operator injection. |
| XSS surface | ✅ | No `dangerouslySetInnerHTML`. Articles use `react-markdown` without `rehype-raw`, and its default URL sanitizing blocks `javascript:` links. |
| External links | ✅ | All 8 `target="_blank"` links have `rel="noopener noreferrer"`. |
| Forms abuse | ✅ basic | Web3Forms honeypot and client throttle. The Web3Forms key is public by design; its domain allowlist is an owner action. |
| Source maps | ✅ | Not published (`vite build` default). |
| Secrets | ✅ / ⚠️ | No credentials found in git history. `.gitignore` covers `.env` but **not** `.env.local` / `.env.*`, and `lib/mongo.ts` tells people to use `.env.local`. |
| Repo hygiene | ⚠️ | Replit agent state is committed (`.local/state/replit/**`, `.replit`), and the Replit Vite plugins are still wired. `server/api/posts/**` is dead Next.js-style code. Dev CORS allows `*.repl.co` / `*.gitpod.io`. |
| security.txt | ❌ | No `/.well-known/security.txt`. |
| Edge layer | ❓ | `www.upcheck.in` responses carry Cloudflare headers (`server: cloudflare`, `CF-Ray`); the apex hits Vercel directly. Nobody has confirmed this is intended. Owner action O3. |

---

## 3. Decisions already made

| # | Decision |
|---|---|
| D1 | **`https://www.upcheck.in` is the canonical host.** Every absolute URL we emit uses `www`. |
| D2 | **Build-time prerendering of all public routes is in this scope.** No framework migration (no Next.js). |
| D3 | **Articles and events are indexed.** They go in the sitemap with their own meta, and the production API gets fixed. |
| D4 | The Cloudflare layer is an open question for the owner. Our changes must work with or without it. |
| D5 | Hreflang and per-language URLs are **deferred** (§8). This phase ships English HTML. |

---

## 4. SEO tasks

Each task lists **Why**, **What** and **Done when**. IDs are for PR titles and commits.

### S1 · Switch every absolute URL to `www` (D1)

**Why:** Canonicals and sitemap entries that point at a redirect waste crawl budget and split signals.

**What**
- `client/index.html`: `canonical`, `og:url`, `og:image`, `twitter:image`, JSON-LD `url` / `logo` / `image`.
- `client/src/components/RouteMeta.tsx`: `SITE`.
- `client/public/robots.txt`: `Sitemap: https://www.upcheck.in/sitemap.xml`.
- Sitemap (replaced by the generator in S5).
- Anything else from `grep -rn "https://upcheck.in" client/ scripts/`. Email addresses like `admin@upcheck.in` stay as they are.

**Done when:** `grep -rn "https://upcheck.in" client scripts api` returns nothing.

### S2 · One source of truth for page metadata

**Why:** Meta currently lives in `RouteMeta.tsx`. The prerender (S3), sitemap (S5) and client all need the same data.

**What**
- Move the `ROUTES` map to `client/src/seo/routes.ts`. Per route, include:
  - `title`, `description`
  - optional `ogImage`
  - optional `noindex`
  - optional `jsonLd`
  - `lastmod`
- `RouteMeta.tsx` imports it. Add `/resources/:id` and `/participate/events/:slug` handling: meta comes from the post or event data, not the site fallback.
- Content fixes, in plain honest language:
  - Trim descriptions to **≤155 chars**: `/`, `/technology`, `/welfare`, and the `index.html` default.
  - Keep titles **≤60 chars**: `/welfare`.
  - Articles: `title` = post title + ` · Upcheck`. `description` = the first ~150 chars of the post's plain text. `og:image` = the post thumbnail as an absolute URL.
- `noindex` for `/feedback`, `/participate/survey` and the 404 page (thin form and utility pages). They stay reachable and linked.

**Done when:** No meta strings remain inside `RouteMeta.tsx`, and every public route has an entry.

### S3 · Build-time prerendering (D2)

**Why:** This is the biggest lever. Crawlers and link-preview bots get real HTML per URL: correct `<title>`, description, canonical, OG tags, `<h1>` and body text.

**Approach** (Vite's standard SSR-prerender pattern; no new framework):
1. **`client/src/entry-server.tsx`** exports `render(url)`. It wraps the app in wouter's `<Router ssrPath={url}>` and returns `renderToString(...)` from `react-dom/server`.
2. **`client/src/main.tsx`:** use `hydrateRoot` when `#root` already has children, otherwise `createRoot`.
3. **`scripts/prerender.mjs`**, run after the client build:
   - `vite build --ssr src/entry-server.tsx --outDir ../dist/server`
   - For every route, render the body and write **`dist/public/<route>.html`** (`/` → `index.html`). Replace the `<head>` tags with that route's values from `seo/routes.ts`, and inject its JSON-LD.
   - Routes to cover:
     - All static routes in `App.tsx`
     - `/resources/1` … `/resources/18`, from `posts.json`. If `MONGODB_URI` is available at build, read from MongoDB with a timeout and fall back to `posts.json`.
     - `/participate/events/makeathon-7`
     - `404.html`
   - Also writes the sitemap (S5), so there's one script, not two.
4. **`package.json` and `vercel.json` build commands:** the client build, then SSR build + `node scripts/prerender.mjs`, then the existing esbuild step.

**Watch out for**
- **Browser-only APIs during render** (`window`, `localStorage`, `matchMedia`, `IntersectionObserver`, `navigator`). Move them into `useEffect`, or guard with `typeof window !== "undefined"`. Likely spots: `ThemeProvider`, `LanguageContext`, `forms.ts` callers, hero video, scroll sections.
- **Hydration mismatches.** The server renders English and the default theme. Language and theme from `localStorage` must be applied **after** mount, not in initial state. Check the browser console on the built site: there must be no hydration warnings.
- Framer Motion elements with `initial={{ opacity: 0 }}` still output their text in HTML. That's fine; don't remove animations for this.
- **No inline `<script>` for state injection.** It would break the CSP in X1. The JSON-LD `<script type="application/ld+json">` is fine because it's a data block, not executable.
- **Fallback if full-body rendering hits a wall on a page:** ship head-only prerendering for that route (correct head, SPA body) and log it in the PR. Head tags alone fix titles, canonicals and social previews.

**Done when** (checked on the PR's Vercel preview URL)
- `curl -s <preview>/pricing | grep -o "<title>[^<]*"` shows the pricing title, and same for every route.
- `curl -s <preview>/about | grep -c "<h1"` is ≥ 1, and page text is visible in the raw HTML.
- `curl -s <preview>/resources/3` contains that article's title, canonical and `og:image`.
- No hydration or React errors in the console on any route.
- The LinkedIn Post Inspector or opengraph.xyz (public, no login) shows the correct card for `/pricing` and one article.

### S4 · Real 404s, clean URLs, redirects

**Why:** Soft 404s and duplicate URLs dilute the index. A branded 404 keeps lost visitors on the site.

**What (`vercel.json`)**
- Add `"cleanUrls": true` and `"trailingSlash": false`. `/pricing` then serves `pricing.html`, and `/pricing.html` redirects to `/pricing`.
- **Remove the global catch-all rewrite** `/((?!api/).*) → /index.html`.
- Keep `/api/(.*) → /api`.
- Add narrow SPA fallbacks for content added after a build:
  - `/resources/:id` → `/index.html`
  - `/participate/events/:slug` → `/index.html`

  Vercel checks real files before rewrites, so prerendered pages still win.
- **Permanent redirects** (`"permanent": true`):
  - `/app` → `/download`
  - `/events` → `/participate/events`
  - `/events/:slug` → `/participate/events/:slug`
- The client article and event "not found" state sets `<meta name="robots" content="noindex">`.
- **Rebuild `pages/not-found.tsx` as a branded page:** Navigation + Footer, one `<h1>` ("We couldn't find that page"), and links to Home, Products and Resources. Output it as `404.html`.

**Done when**
- `curl -sI <preview>/does-not-exist` → `404`, and the page is branded.
- `curl -sI <preview>/app` → `308`, `location: /download`.
- `/resources/1` → `200` with prerendered HTML.

### S5 · Generated sitemap + robots

**What**
- `scripts/prerender.mjs` writes `dist/public/sitemap.xml` from `seo/routes.ts` + posts + events:
  - `www` host.
  - `<lastmod>` from post `publishedAt` / route `lastmod`.
  - Skip `noindex` routes.
  - Drop `<changefreq>` / `<priority>`, which Google ignores.
- Delete `client/public/sitemap.xml` so there's no stale copy.
- `robots.txt`: keep `Allow: /`, add `Disallow: /api/`, and point `Sitemap:` at www.

**Done when:** The sitemap validates (xmllint or any public validator), contains 18 article URLs and the event URL, and every `<loc>` returns `200` with no redirect.

### S6 · Structured data (JSON-LD)

Only facts that are true today. Validate every type with the Rich Results Test and validator.schema.org (both public, no login).

| Page | Type | Notes |
|---|---|---|
| All | `Organization` | Fix the URL to www. `logo`: the 512 px PNG. `sameAs`: **only** official Upcheck profiles that exist (confirm with owner; omit if unsure). |
| `/` | `WebSite` | `name`, `url`. No `SearchAction` (there's no site search). |
| `/products`, `/download` | `SoftwareApplication` | Neerani: `operatingSystem: "Android"`, `applicationCategory: "BusinessApplication"`, `offers` price `0` INR. **No `aggregateRating`**: we have no public ratings, and inventing them breaks Google policy and our honesty rule. |
| `/resources/:id` | `Article` | `headline`, `image`, `datePublished`, `author`, `publisher` → Organization. |
| `/participate/events/makeathon-7` | `Event` | Only if the page has a real date and location. |

Skip `FAQPage` (Google limits FAQ rich results to authoritative government and health sites) and `BreadcrumbList` (deferred).

### S7 · Headings and on-page basics

- Add one `<h1>` to `/about` (e.g. in `AboutSection`). Keep one `<h1>` per page across the site. Prerendered HTML makes this visible to crawlers.
- Check every page with `document.querySelectorAll('h1').length === 1` on the preview.
- Internal links use real `<a href>` (wouter `Link` does) so crawlers can follow them. Don't use click-handler-only navigation.

### S8 · Images and Core Web Vitals basics

**Why:** Page experience affects ranking, and farmers visit on slow mobile networks.

**What**
- Add intrinsic `width` and `height` to all 23 `<img>` tags (CSS still controls display size). This removes layout shift.
- `loading="lazy"` + `decoding="async"` on every below-the-fold image. On the hero poster (`HeroSection.tsx:41`), use `fetchpriority="high"` and **no** lazy.
- Article thumbnails from `/api/media` must load once X2 is fixed. Until then, make sure broken images fall back to `/attached_assets/shrimpfarm.webp` (already the default) rather than showing a broken icon.

**Done when:** Lighthouse (Chrome DevTools, mobile) on `/`, `/products`, `/technology` and one article scores **SEO 100** and **Best Practices ≥ 95**, with **CLS < 0.1**.

### S9 · Asset and dead-code cleanup

**What**
- Verify each file below is unreferenced with `grep -rF "<name>" client scripts`, then delete it from `client/public/attached_assets/`:
  - `close-up-shrimp.jpg`, `farmer-field-support.webp`
  - `image_1760003211573.webp`, `image_1760003214929.webp`, `image_1760003627568.webp`, `image_1760003630990.webp`, `image_1760003633844.webp`
  - `problem1.jpg`, `problem4.webp`, `problem5(1).jpg`, `problem5(2).webp`
  - `shrimp-growth-molting.webp`, `shrimpbowl.jpg`, `shrimpimg.jpeg`, `shrimpwhole.jpeg`
  - `tarpaulin-shrimp-pond.webp`, `upcheck-app-screenshot.webp`
- Delete these unused components after the same grep check:
  - `VideoSection`, `DashboardPreview`, `StatisticsSection`, `PondToHandsSection`, `AppDownloadCTA`
  - `pages/polls.tsx` + `components/polls/*` (the route is hidden)
- Add `client/public/favicon.ico`: 32×32, generated from `favicon-32.png` using the existing `sharp` dev dependency or `scripts/generate-social-assets.mjs`.
- Descriptive file names for **new** assets (`neero-sensor-pond.webp`, not `image_1760….webp`). Don't rename existing referenced files in this phase.

---

## 5. Security tasks

"Unavoidable" means we ship none of this phase without them.

### X1 · Security headers in `vercel.json`

**Why:** None exist in production today. The Helmet in `server/index.ts` doesn't run on Vercel.

**What:** add a `headers` block for `source: "/(.*)"`:

| Header | Value |
|---|---|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=(), usb=()` |
| `Cross-Origin-Opener-Policy` | `same-origin` |
| `Content-Security-Policy` | see below |

Starting CSP, built from every origin the site uses today:

```
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data: https:;
media-src 'self';
connect-src 'self' https://api.web3forms.com;
frame-src 'none';
object-src 'none';
base-uri 'self';
form-action 'self' https://api.web3forms.com;
frame-ancestors 'none';
upgrade-insecure-requests
```

**Why these values**
- **`style-src 'unsafe-inline'`:** prerendered HTML carries React and Framer Motion `style=""` attributes. Removing this is deferred.
- **`img-src https:`:** article thumbnails come from several external hosts in MongoDB and `posts.json` (`strapi.jala.tech`, S3, gstatic, `api.qrserver.com`, unsplash).
- **Vercel Web Analytics** loads `/_vercel/insights/*` from our own origin, so `'self'` covers it.
- **`frame-src 'none'`** assumes `VideoSection` (the YouTube embed) is deleted in S9. If it's kept, use `frame-src https://www.youtube-nocookie.com` and switch the embed to that domain.
- Don't add `'unsafe-inline'` or `'unsafe-eval'` to `script-src`. If something breaks, fix the code, not the policy.

**Rollout**
1. First commit ships the policy as `Content-Security-Policy-Report-Only`.
2. On the preview deployment, click through **every route**, submit the contact, newsletter and feedback forms, open an article, and switch language and theme.
3. The DevTools console must show **zero CSP violations**.
4. Then rename the header to `Content-Security-Policy` in the same PR.

**Leave alone**
- HSTS: Vercel already sends it. `includeSubDomains` / `preload` affect the whole domain and are deferred.
- `Access-Control-Allow-Origin: *` on static files is Vercel's default for public assets. Accepted.

**Done when**
- `curl -sI <preview>/` shows all six headers.
- securityheaders.com (public, no login) grades the production URL **A** after merge.
- All forms still submit.

### X2 · Fix the production API, then harden it

**Why:** `/api/posts`, `/api/posts/:id`, `/api/media/:id` and `/api/feedback` all return `500 FUNCTION_INVOCATION_FAILED`. Article images are broken and feedback isn't saved. That's both a visitor and a data-loss problem.

**Diagnose.** The Vercel runtime-error log for the last 7 days shows only old timeouts, not this crash, so it's probably failing **at module load**. Even `/api/posts`, which catches all its own errors, crashes.

Likely suspect, **not confirmed**: `api/index.ts` does `import localPosts from "../client/src/pages/posts.json"`. The package is `"type": "module"`, and Node's ESM loader rejects JSON imports without `with { type: "json" }`.

1. Reproduce locally by bundling the function like Vercel does. Or push a branch and `curl` the preview: `curl -s <preview>/api/posts`.
2. Fix the root cause. For the JSON import, use `import localPosts from "../client/src/pages/posts.json" with { type: "json" }`, or load it with `createRequire`.
3. If the crash is `MONGODB_URI` or Atlas network access instead, that's owner action O4. Document what you found in the PR.

**Harden (`api/index.ts`)**
- `/api/media/:id`:
  - Serve only when `file.contentType` matches `^image/(png|jpe?g|webp|gif|avif)$`; otherwise return `404`.
  - Always set `X-Content-Type-Options: nosniff` (X1 covers it globally; keep it explicit here too).
  - Handle stream errors after headers are sent by calling `res.destroy()`. Right now it calls `res.status(404)` after writing.
- Return generic error messages only (already true). Don't log full request bodies. `server/routes.ts` logs feedback PII with `console.log`, so remove that line when cleaning up.
- Keep the existing rate limits and zod schemas.

**Done when**
- On the preview, `/api/posts` → `200` JSON.
- `/api/media/<a real id from posts.json>` → `200 image/*`.
- A test feedback submission → `201`.
- A non-image GridFS id (if one exists) → `404`.

### X3 · Dependencies

**What**
- Remove unused packages:
  - `passport`, `passport-local`, `express-session`, `connect-pg-simple`, `memorystore`, `@neondatabase/serverless`, `ws`
  - Their `@types/*` packages
- Remove `drizzle-orm`, `drizzle-zod`, `drizzle-kit`, `drizzle.config.ts`, `shared/schema.ts` and `server/storage.ts`, after confirming nothing else imports them. Only `server/storage.ts` imports `@shared/schema` today, and nothing imports `storage.ts` from routes. This also clears the `drizzle-orm` high finding, which otherwise needs a breaking upgrade.
- Remove `@replit/*` Vite plugins and their block in `vite.config.ts`.
- Run `npm audit fix` without `--force`, then `npm run check` and `npm run build`.

**Done when**
- `npm audit --omit=dev` shows **0 high / 0 critical**. Any remaining moderate or low findings are listed in the PR with the reason.
- Build and typecheck pass.

### X4 · Secrets and repo hygiene

- `.gitignore`: replace `.env` with `.env*` + `!.env.example`. Also add `.vercel` and `.local/`.
- `git rm -r --cached .local .replit`. These are Replit agent state; they hold no secrets (checked), but don't belong in the repo.
- Delete dead code: `server/api/posts/**`.
- In `server/index.ts` (dev only), drop the `*.repl.co` / `*.gitpod.io` CORS origins.
- Fix the `lib/mongo.ts` error message to name `.env`.
- Keep `WEB3FORMS_KEY` in `forms.ts`. It's public by design; protection is the domain allowlist (owner action O2).

**Done when:** `git ls-files | grep -E "^\.local|\.replit|\.env$"` returns nothing.

### X5 · `security.txt`

Add `client/public/.well-known/security.txt`:

```
Contact: mailto:admin@upcheck.in
Expires: 2027-09-14T00:00:00.000Z
Preferred-Languages: en, ta
Canonical: https://www.upcheck.in/.well-known/security.txt
```

Put the `Expires` renewal date in the PR description.

**Done when:** `curl -s https://www.upcheck.in/.well-known/security.txt` returns the file with `text/plain`.

### X6 · Keep what's already right (regression guard)

In code review for this phase, reject any change that:
- adds `dangerouslySetInnerHTML` or `rehype-raw`
- adds `target="_blank"` without `rel="noopener noreferrer"`
- enables production source maps
- adds inline `<script>`
- puts a secret in a `VITE_*` variable or in client code
- removes the honeypot or the zod validation

---

## 6. Order of work, PR plan and final checklist

Small PRs, each checked on its Vercel preview before merge.

| PR | Contents | Why this order |
|---|---|---|
| **PR 1 · Security quick wins** | X3, X4, X5, X1 (Report-Only first, then enforced) | Low risk, and immediately shrinks the attack surface. The CSP is in place before prerendering changes the HTML. |
| **PR 2 · API fix** | X2 | Restores article images and feedback, which S3 and S6 need. |
| **PR 3 · SEO foundations** | S1, S2, S7, S8, S9 | Canonical host, meta source of truth, headings, images, cleanup. |
| **PR 4 · Prerender + indexing** | S3, S4, S5, S6 | The largest change. Relies on PR 3's route metadata. |

Re-check the CSP after PR 4: prerendered HTML must still show zero violations.

**Final acceptance checklist** (production, after all PRs merge):

- [ ] `curl -s https://www.upcheck.in/<route>` shows the correct `<title>`, canonical (www) and `<h1>` for every sitemap URL
- [ ] `curl -sI https://www.upcheck.in/nope` → `404`, branded page
- [ ] `/app`, `/events` → `308` to their canonical paths
- [ ] Sitemap has all public routes + 18 articles + the event, every `<loc>` returns `200`, no redirects
- [ ] `robots.txt` points at the www sitemap and disallows `/api/`
- [ ] Rich Results Test passes for `/`, `/products` and one article
- [ ] Shared links for `/pricing` and one article show their own card in the LinkedIn Post Inspector / opengraph.xyz
- [ ] Lighthouse mobile: SEO 100, Best Practices ≥ 95, CLS < 0.1 on `/`, `/products`, `/technology` and one article
- [ ] securityheaders.com: grade A
- [ ] Zero CSP violations and zero hydration warnings across all routes, both themes, all 5 languages
- [ ] `/api/posts`, `/api/media/:id` and `/api/feedback` work in production
- [ ] `npm audit --omit=dev`: 0 high / 0 critical
- [ ] Contact, newsletter and feedback forms submit successfully

---

## 7. Owner actions (not for the Website Team)

The Website Team should **flag, not do**, these. They need account, DNS or dashboard access.

| # | Action | Why |
|---|---|---|
| O1 | After PR 4 ships: submit `https://www.upcheck.in/sitemap.xml` in Google Search Console and Bing Webmaster Tools, and request indexing of key pages. | Speeds up re-crawling with the new canonicals. |
| O2 | Web3Forms dashboard: allowlist **only** `www.upcheck.in` and `upcheck.in`. | The key is public, so the allowlist is the real protection. |
| O3 | Confirm whether Cloudflare should sit in front of `www.upcheck.in`. If not, fix DNS to point straight at Vercel. If yes, make sure Cloudflare doesn't strip our headers or cache 404s. | `www` responses show Cloudflare headers; the apex doesn't. Nobody has confirmed this setup. |
| O4 | Verify `MONGODB_URI` is set for Production **and** Preview on Vercel, and that MongoDB Atlas network access allows Vercel. | Needed if X2's root cause turns out to be config. |
| O5 | Vercel Firewall: add a rate-limit rule on `/api/feedback` and `/api/media/*`. | In-app limits are per-instance only. |
| O6 | Review the Vercel plan. The project is on a **Hobby** team, and Vercel's Hobby terms are for non-commercial use. | This is a company website. |

---

## 8. Deferred to the advanced spec

Not in this phase. Listed so nobody half-starts them.

- **SEO:**
  - Per-language URLs (`/ta/...`) with `hreflang`
  - Translated meta
  - `BreadcrumbList`
  - Image sitemap
  - Content and keyword strategy, new landing pages
  - Local business schema
  - Backlinks
  - Self-hosting Google Fonts
  - Automatic rebuild when new articles are published (webhook → redeploy)
- **Security:**
  - Nonce- or hash-based CSP without `style-src 'unsafe-inline'`
  - CSP violation reporting endpoint
  - HSTS `includeSubDomains` + preload
  - Durable, shared rate limiting (Upstash / WAF)
  - CAPTCHA / BotID on forms
  - Dependabot / Renovate + CI audit gate
  - Subresource Integrity
  - Admin authentication for content upload
  - Formal penetration test

---

<p align="center"><sub>© 2026 Upcheck Technologies Private Limited · Internal document for the Website Team · Chennai, Tamil Nadu</sub></p>
