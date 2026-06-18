# CLAUDE.md

## What this project is

An Astro site presenting content as a **Japanese book** — **vertical text, read right-to-left**, scrolling horizontally. Think of a physical 縦書き book or scroll: text columns run top-to-bottom, and you progress through the page **from right to left**. The whole page is a horizontal filmstrip of full-height "pages" rather than a normal vertically-scrolling web page.

Always assume this reading direction when reasoning about layout, ordering, spacing, and "left/right". Getting the axis wrong is the most common mistake here.

## The core mental model

Read this before touching layout CSS:

- **Block axis = vertical** (text flows top→bottom within a column).
- **Inline axis = horizontal**, but **reversed** — the inline-start edge is on the **right**, inline-end on the **left**.
- Page/section order runs **right → left**. The first item the reader sees is the rightmost one.

Consequences that trip people up:
- "The next page" is to the **left**. "Earlier content" is to the **right**.
- `margin-right` / `right` act on the **start** (leading) side; `margin-left` / `left` act on the **end** (trailing) side.
- Wider screens get *more pages visible at once* along the horizontal axis — they do **not** make pages wider.

## How the direction is implemented

- **Vertical text:** `writing-mode: vertical-rl; text-orientation: mixed;` (see `.vertical`, `.card-title`, `.hero-overlay`).
- **Right-to-left page order:** flex containers use `flex-direction: row-reverse` so DOM order maps to right→left visual order. Key containers: `.scroll-wrapper` and `.blog-post-wrapper` ([src/layouts/MainLayout.astro](src/layouts/MainLayout.astro)), `.scroll-wrapper` in [src/styles/verticalBlog.css](src/styles/verticalBlog.css).
- **Horizontal scrolling:** the page does **not** scroll vertically. `.scroll-wrapper` is `height: 100vh` (or `100vh - var(--header-height)`), `overflow-x: auto; overflow-y: hidden`. `overflow-x: hidden` on `html, body` keeps the page itself from scrolling sideways — horizontal scroll lives inside `.scroll-wrapper`.
- **Pages are full-height, fixed-width columns:** each section/card is `flex: 0 0 …` (never shrinks) and fills the viewport height.

## Key files

- [src/layouts/MainLayout.astro](src/layouts/MainLayout.astro) — the horizontal-scroll shell: hero (rightmost) → description → `<slot />` post strip. Owns `.scroll-wrapper` / `.blog-post-wrapper`.
- [src/components/PostCard.astro](src/components/PostCard.astro) — a single book "page"/card in the strip. Full-height, narrow. Scoped styles live in its own `<style>` block.
- [src/styles/verticalBlog.css](src/styles/verticalBlog.css) — shared vertical-layout styles for the long-form reading view (`.content-section`, `.vertical`, `.top`/`.bottom`, 漢文/ruby/media helpers).
- [src/scripts/categories.ts](src/scripts/categories.ts) — `categoryConfig`: per-category (`za`, `es`, `hs`, `bk`) title prefix/suffix (e.g. 第〇座), decorations, and a data-driven `layout` object that PostCard turns into inline styles. **Add per-category visual tweaks here, not by hardcoding in the component.**
- Content: `src/content/posts/*.mdx`, routed via [src/pages/[category]/[slug].astro](src/pages/[category]/[slug].astro) and [src/pages/[category].astro](src/pages/[category].astro).

## Conventions

- **Prefer CSS logical properties** over physical ones so they follow the writing mode: `inline-size`/`block-size` (not width/height), `margin-block`/`margin-inline`, `padding-block`/`padding-inline`, `inset-inline-start`. The codebase already uses these widely — match that style.
- When you *do* use physical `width`/`left`/`right`, remember the reversed inline axis above and double-check the side.
- **Size full-height pages from the height, not the viewport width.** Tying widths to `vw` makes cards collapse on narrow (mobile) screens; the page height is the stable dimension in this layout. Prefer `vh`-based widths or `aspect-ratio` for the book-page columns.
- Per-category styling is data-driven through `categoryConfig.layout` → inline styles in `PostCard.astro`. Extend the config's type and object rather than branching in markup.
- Japanese typography helpers already exist in `verticalBlog.css`: 漢文 (`.kanbun`, `.okuri` 送り仮名, `.kaeri` 返り点), ruby (`ruby`, `.nt`, `.bouten` 傍点), `.chapter`, `.note`. Reuse these.
- Fonts are Japanese serif/Mincho (`Noto Serif JP`, `Hiragino Mincho ProN`, `Yu Mincho`).

## Commands

- `npm run dev` — local dev server (Astro)
- `npm run build` — production build
- `npm run preview` — preview the build

## When testing layout

Check **both** desktop and mobile widths. Desktop shows several pages across; phones are narrow, so width-from-`vw` sizing breaks there. The reading flow (right→left, top→bottom) and full-height pages must hold at every viewport.
