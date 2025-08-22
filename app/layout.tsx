import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bitcrab ($CRAB) — The Beach-Loving Meme Coin on Solana | Official Website',
  description: 'Bitcrab ($CRAB) is the ultimate beach-loving meme coin on Solana. Fair launch, 0% tax, LP locked, contract renounced. Join the crab community and pinch the dip!',
  keywords: 'Bitcrab, $CRAB, CRAB token, Solana meme coin, cryptocurrency, DeFi, beach coin, crab coin, meme token, fair launch, zero tax',
  authors: [{ name: 'Bitcrab Team' }],
  creator: 'Bitcrab Team',
  publisher: 'Bitcrab',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bitcrab.io/',
    title: 'Bitcrab ($CRAB) — The Beach-Loving Meme Coin on Solana',
    description: 'Join the Bitcrab community! Fair launch meme coin on Solana with 0% tax, locked LP, and renounced contract. Pinch the dip, ride the tide!',
    siteName: 'Bitcrab',
    images: [
      {
        url: 'https://bitcrab.io/assets/img/bitcrab.png',
        width: 1200,
        height: 630,
        alt: 'Bitcrab ($CRAB) Logo - Beach-loving meme coin mascot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bitcrab ($CRAB) — The Beach-Loving Meme Coin on Solana',
    description: 'Join the Bitcrab community! Fair launch meme coin on Solana with 0% tax, locked LP, and renounced contract. Pinch the dip, ride the tide!',
    creator: '@0x_bitcrab',
    images: ['https://bitcrab.io/assets/img/bitcrab.png'],
  },
  alternates: {
    canonical: 'https://bitcrab.io/',
  },
  other: {
    'coin-ticker': 'CRAB',
    'blockchain': 'Solana',
    'contract-address': 'DzJL3RfctCxZsC72SvvRtcpud7nSMKPNajZ2nHCFY1cu',
  },
};

// import '@solana/wallet-adapter-react-ui/styles.css'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/assets/img/bitcrab.png" />
        <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Urbanist:wght@300;400;600;800&display=swap" rel="stylesheet" />
        <link rel="preload" href="/assets/svg/crab.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/assets/svg/wave.svg" as="image" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
