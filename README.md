# Bitcrab ($CRAB) — static site

A responsive, animated landing page for the meme coin Bitcrab ($CRAB). Beach-and-crab theme with waves, bubbles, and playful UI.

## Features
- Themed hero with animated waves, bubbles, sun, and clouds
- Sections: About, Tokenomics, How to Buy, Roadmap, Community, Chart, Docs, FAQ
- Zero/zero tax, LP locked, renounced placeholders
- Clipboard copy for contract address
- Mobile nav, reveal-on-scroll, accessible accordion

## Customize
- Contract: edit the text and `data-address` in `index.html` under the hero contract block.
- Social links: update hrefs in the Community section.
- Chart: replace the `iframe` src in the Chart section with your DEX chart URL.
- Colors/branding: tweak CSS variables in `css/styles.css` under `:root`.
- Assets: SVGs live under `assets/svg/`.

## Run locally
Open `index.html` directly in a browser or serve the folder:

- macOS quick server:
  - Python 3: `python3 -m http.server 5173`
  - Then visit http://localhost:5173

## Deploy
This is a static site. Host on any static hosting (GitHub Pages, Netlify, Vercel, etc.).

## License
MIT for this template. Replace assets/text as needed for your project.
# bitcrab3
