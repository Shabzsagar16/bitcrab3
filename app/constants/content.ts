export const BRAND = {
  name: 'Bitcrab',
  ticker: '$CRAB',
}

export const CONTRACT = {
  address: 'DzJL3RfctCxZsC72SvvRtcpud7nSMKPNajZ2nHCFY1cu',
}

export const LINKS = {
  phantom: 'https://phantom.app/',
  solflare: 'https://solflare.com/',
  jupiter: 'https://jup.ag/swap',
  orca: 'https://www.orca.so/',
  raydium: 'https://raydium.io/swap/',
  twitter: 'https://twitter.com/0x_bitcrab',
  telegram: 'https://t.me/bitcrab0x',
  whitepaper: '/assets/docs/bitcrab-whitepaper.pdf',
  tokenomicsChart: '/assets/img/bitcrab_tokenomics_chart.png',
  solscanToken: (addr: string) => `https://solscan.io/token/${addr}`,
}

export const TEXT = {
  aria: {
    home: (brand: string) => `${brand} home`,
    hero: (brand: string) => `${brand} hero section`,
  },
  nav: {
    about: 'About',
    tokenomics: 'Tokenomics',
    howToBuy: 'How to Buy',
    roadmap: 'Roadmap',
    chart: 'Chart',
    docs: 'Docs',
    faq: 'FAQ',
    game: 'Game',
    community: 'Community',
  },
  labels: {
    contract: 'Contract (Solana):',
  },
  hero: {
    tagline: 'Pinch the dip. Ride the tide. Meme the dream.',
  },
  howToBuy: {
    title: (ticker: string) => `How to Buy ${ticker}`,
  },
  wallet: {
    connect: 'Connect Wallet',
    disconnect: 'Disconnect wallet',
    modalTitle: 'Connect a wallet',
    footerBadge: 'On Solana',
    hints: {
      popular: 'Popular',
      trusted: 'Trusted',
      multi: 'Multi-wallet',
      wallet: 'Wallet',
    },
  },
}
