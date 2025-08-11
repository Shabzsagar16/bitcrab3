export const metadata = {
  title: 'Bitcrab ($CRAB) — Pinch the dip, ride the tide',
  description: 'Bitcrab ($CRAB) — the beach-loving meme coin. Pinch the dip, ride the tide!',
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
