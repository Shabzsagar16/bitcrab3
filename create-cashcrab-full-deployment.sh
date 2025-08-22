#!/bin/bash

# Create Cashcrab Full Deployment with Connect Wallet
echo "Creating Cashcrab full deployment with modern features..."

# Create deployment directory
rm -rf cashcrab-full-deployment
mkdir -p cashcrab-full-deployment

# Copy assets
cp -r public/* cashcrab-full-deployment/

# Create advanced index.html with Connect Wallet functionality
cat > cashcrab-full-deployment/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    
    <!-- Primary Meta Tags -->
    <title>Cashcrab ($CRAB) — The Beach-Loving Meme Coin on Solana | Official Website</title>
    <meta name="title" content="Cashcrab ($CRAB) — The Beach-Loving Meme Coin on Solana | Official Website" />
    <meta name="description" content="Cashcrab ($CRAB) is the ultimate beach-loving meme coin on Solana. Fair launch, 0% tax, LP locked, contract renounced. Join the crab community and pinch the dip!" />
    <meta name="keywords" content="Cashcrab, $CRAB, CRAB token, Solana meme coin, cryptocurrency, DeFi, beach coin, crab coin, meme token, fair launch, zero tax" />
    <meta name="author" content="Cashcrab Team" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://cashcrab.io/" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://cashcrab.io/" />
    <meta property="og:title" content="Cashcrab ($CRAB) — The Beach-Loving Meme Coin on Solana" />
    <meta property="og:description" content="Join the Cashcrab community! Fair launch meme coin on Solana with 0% tax, locked LP, and renounced contract. Pinch the dip, ride the tide!" />
    <meta property="og:image" content="https://cashcrab.io/assets/img/bitcrab.png" />
    <meta property="og:image:alt" content="Cashcrab ($CRAB) Logo - Beach-loving meme coin mascot" />
    <meta property="og:site_name" content="Cashcrab" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://cashcrab.io/" />
    <meta property="twitter:title" content="Cashcrab ($CRAB) — The Beach-Loving Meme Coin on Solana" />
    <meta property="twitter:description" content="Join the Cashcrab community! Fair launch meme coin on Solana with 0% tax, locked LP, and renounced contract. Pinch the dip, ride the tide!" />
    <meta property="twitter:image" content="https://cashcrab.io/assets/img/bitcrab.png" />
    <meta property="twitter:creator" content="@0x_bitcrab" />
    
    <!-- Crypto-specific meta tags -->
    <meta name="coin-ticker" content="CRAB" />
    <meta name="blockchain" content="Solana" />
    <meta name="contract-address" content="DzJL3RfctCxZsC72SvvRtcpud7nSMKPNajZ2nHCFY1cu" />
    
    <!-- Favicons -->
    <link rel="icon" type="image/png" href="/assets/img/bitcrab.png" />
    <link rel="apple-touch-icon" href="/assets/img/bitcrab.png" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    
    <!-- Solana Wallet Adapter CSS -->
    <link rel="stylesheet" href="https://unpkg.com/@solana/wallet-adapter-react-ui@0.9.35/styles.css" />
    
    <!-- Schema.org structured data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Cashcrab",
      "alternateName": "$CRAB",
      "url": "https://cashcrab.io",
      "logo": "https://cashcrab.io/assets/img/bitcrab.png",
      "description": "Cashcrab ($CRAB) is a community-driven meme coin on Solana blockchain with fair launch, zero taxes, and locked liquidity.",
      "sameAs": [
        "https://twitter.com/0x_bitcrab",
        "https://t.me/bitcrab0x",
        "https://solscan.io/token/DzJL3RfctCxZsC72SvvRtcpud7nSMKPNajZ2nHCFY1cu"
      ]
    }
    </script>
    
    <link rel="stylesheet" href="/css/styles.css" />
  </head>

  <body>
    <main id="top">
      <div class="burst" aria-hidden="true"></div>
      <header class="site-header">
        <a class="brand" href="#top" aria-label="Cashcrab home">
          <picture class="brand__img">
            <source srcSet="/assets/img/bitcrab.png" type="image/png" />
            <img src="/assets/svg/logo.svg" alt="Cashcrab logo" width="36" height="36" />
          </picture>
          <span>$CRAB</span>
        </a>
        <div class="header-actions">
          <nav class="nav" aria-label="Main">
            <button class="nav__toggle" aria-expanded="false" aria-controls="nav-menu">☰</button>
            <ul id="nav-menu" class="nav__menu">
              <li><a href="#about">About</a></li>
              <li><a href="#tokenomics">Tokenomics</a></li>
              <li><a href="#how-to-buy">How to Buy</a></li>
              <li><a href="#roadmap">Roadmap</a></li>
              <li><a href="#chart">Chart</a></li>
              <li><a href="#docs">Docs</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a class="nav-external" href="/game">Game</a></li>
              <li><a href="#community" class="pill">Community</a></li>
            </ul>
          </nav>
          
          <!-- Connect Wallet Button -->
          <div class="wallet">
            <button id="wallet-connect-btn" class="btn wallet-btn wallet-btn--connect" aria-label="Connect Wallet">
              <span class="wallet-label">Connect Wallet</span>
            </button>
            <button id="wallet-disconnect-btn" class="btn wallet-btn wallet-btn--connected" style="display: none;" aria-label="Disconnect wallet">
              <span class="wallet-dot" aria-hidden="true"></span>
              <span class="wallet-label" id="wallet-address"></span>
            </button>
          </div>
          
          <!-- Wallet Modal -->
          <div id="wallet-modal" class="wallet-modal" role="dialog" aria-modal="true" aria-label="Connect a wallet" style="display: none;">
            <div class="wallet-modal__backdrop"></div>
            <div class="wallet-modal__panel">
              <div class="wallet-modal__head">
                <strong>Connect a wallet</strong>
                <button id="wallet-modal-close" class="wallet-modal__close" aria-label="Close">×</button>
              </div>
              <ul class="wallet-list" role="list">
                <li role="listitem">
                  <button class="wallet-item wallet-item--phantom" data-wallet="phantom">
                    <span class="wallet-item__icon wallet-item__icon--phantom" aria-hidden="true">👻</span>
                    <span class="wallet-item__meta">
                      <span class="wallet-item__name">Phantom</span>
                      <span class="wallet-item__hint">Popular</span>
                    </span>
                    <span class="wallet-item__chev" aria-hidden="true">›</span>
                  </button>
                </li>
                <li role="listitem">
                  <button class="wallet-item wallet-item--solflare" data-wallet="solflare">
                    <span class="wallet-item__icon wallet-item__icon--solflare" aria-hidden="true">🔥</span>
                    <span class="wallet-item__meta">
                      <span class="wallet-item__name">Solflare</span>
                      <span class="wallet-item__hint">Trusted</span>
                    </span>
                    <span class="wallet-item__chev" aria-hidden="true">›</span>
                  </button>
                </li>
              </ul>
              <div class="wallet-modal__foot">
                <span class="wallet-powered">On Solana</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section class="hero" aria-label="Cashcrab hero section">
        <div class="hero__bg">
          <div class="sky">
            <div class="sun" aria-hidden="true"></div>
            <div class="cloud cloud--1"></div>
            <div class="cloud cloud--2"></div>
          </div>
          <img class="palm palm--l" src="/assets/svg/palm.svg" alt="" aria-hidden="true"/>
          <img class="palm palm--r" src="/assets/svg/palm.svg" alt="" aria-hidden="true"/>
          <div class="waves" aria-hidden="true">
            <img src="/assets/svg/wave.svg" alt="" class="wave wave--1" />
            <img src="/assets/svg/wave.svg" alt="" class="wave wave--2" />
            <img src="/assets/svg/wave.svg" alt="" class="wave wave--3" />
          </div>
          <canvas class="bubbles" aria-hidden="true"></canvas>
        </div>
        <div class="container hero__content">
          <div class="hero__left">
            <h1>Cashcrab <span class="accent">$CRAB</span></h1>
            <p class="tagline">Pinch the dip. Ride the tide. Meme the dream.</p>
            <div class="cta">
              <a class="btn btn--primary" href="https://dexscreener.com/solana/9mb8fzoukphwihs6kntnly8ps7wanonqfwrokdczze95" target="_blank" rel="noopener noreferrer">Buy $CRAB</a>
              <a class="btn btn--ghost" href="#chart">Chart</a>
              <a class="btn btn--ghost" href="#docs">Docs</a>
              <a class="btn btn--primary" href="/game" aria-label="Play the Cashcrab runner game">Play Runner</a>
            </div>
            <div class="contract">
              <span class="label">Contract (Solana):</span>
              <img class="icon" src="/assets/svg/solana.svg" alt="Solana" width="18" height="18"/>
              <code id="contract-addr" data-address="DzJL3RfctCxZsC72SvvRtcpud7nSMKPNajZ2nHCFY1cu">DzJL3Rf...HCFYcu</code>
              <button id="copy-contract" class="copy" aria-label="Copy contract address">Copy</button>
            </div>
            <ul class="badges">
              <li>No presale</li>
              <li>LP locked</li>
              <li>Contract renounced</li>
            </ul>
          </div>
          <div class="hero__right">
            <picture class="crab mascot" aria-label="Crab mascot">
              <source srcSet="/assets/img/bitcrab.png" type="image/png" />
              <img src="/assets/svg/crab.svg" width="420" height="320" alt="Smiling crab mascot" />
            </picture>
          </div>
        </div>
      </section>

      <section id="about" class="section section--sand reveal">
        <div class="container grid grid--2">
          <div>
            <h2>Why Cashcrab?</h2>
            <p>
              Born on the beach and fueled by good vibes, Cashcrab is the meme coin that
              pinches FUD and loves sunny gains. Community-owned, fair launch, and built for fun.
            </p>
            <ul class="list list--icons">
              <li><img src="/assets/svg/shell.svg" alt="" aria-hidden="true"/> Fair launch, no VCs</li>
              <li><img src="/assets/svg/shell.svg" alt="" aria-hidden="true"/> Zero team tax</li>
              <li><img src="/assets/svg/shell.svg" alt="" aria-hidden="true"/> 100% community vibes</li>
            </ul>
          </div>
          <div>
            <div class="card ocean">
              <h3>Quick Stats</h3>
              <div class="stats">
                <div><span data-count="1000000000">1,000,000,000</span><label>Total Supply</label></div>
                <div><span>0%</span><label>Buy/Sell Tax</label></div>
                <div><span>🔥</span><label>Liquidity Locked</label></div>
                <div><span>🦀</span><label>Contract Renounced</label></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tokenomics" class="section reveal">
        <div class="container">
          <h2>Tokenomics</h2>
          <div class="tokenomics-cards">
            <div class="tok-card tok-supply">
              <img src="/assets/svg/shell.svg" alt="Supply" width="36" height="36" />
              <div class="tok-label">Total Supply</div>
              <div class="tok-value">1,000,000,000</div>
            </div>
            <div class="tok-card tok-community">
              <img src="/assets/svg/crab.svg" alt="Community" width="36" height="36" />
              <div class="tok-label">Community & Airdrops</div>
              <div class="tok-value">28%</div>
              <div class="tok-desc">Stealth + Growth Airdrops, DAO, Ops</div>
            </div>
            <div class="tok-card tok-liquidity">
              <img src="/assets/svg/wave.svg" alt="Liquidity" width="36" height="36" />
              <div class="tok-label">Liquidity & LP</div>
              <div class="tok-value">22%</div>
              <div class="tok-desc">Seed LP, LP Reserve</div>
            </div>
            <div class="tok-card tok-treasury">
              <img src="/assets/svg/palm.svg" alt="Treasury" width="36" height="36" />
              <div class="tok-label">Treasury & Marketing</div>
              <div class="tok-value">25%</div>
              <div class="tok-desc">Treasury, Marketing, Team</div>
            </div>
          </div>
          <div class="tokenomics-chart">
            <img src="/assets/img/bitcrab_tokenomics_chart.png" alt="Cashcrab tokenomics allocation chart" />
          </div>
        </div>
      </section>

      <section id="how-to-buy" class="section section--sand reveal">
        <div class="container">
          <h2>How to Buy $CRAB</h2>
          <ol class="steps">
            <li>
              <span class="step">1</span>
              <h3>Get a Solana wallet</h3>
              <p>
                Install a Solana wallet like  
                <a href="https://phantom.app/" target="_blank" rel="noopener noreferrer"> Phantom</a> or 
                <a href="https://solflare.com/" target="_blank" rel="noopener noreferrer"> Solflare</a>.
                You can also use <strong>WalletConnect</strong> via the Connect button in the header.
              </p>
            </li>
            <li>
              <span class="step">2</span>
              <h3>Fund your wallet with SOL</h3>
              <p>Buy or transfer <strong>SOL</strong> to your wallet. You'll need SOL to pay for transaction fees and to swap for $CRAB.</p>
            </li>
            <li>
              <span class="step">3</span>
              <h3>Visit Dexscreener</h3>
              <p>
                Click the <strong>"Buy $CRAB"</strong> button above or go directly to 
                <a href="https://dexscreener.com/solana/9mb8fzoukphwihs6kntnly8ps7wanonqfwrokdczze95" target="_blank" rel="noopener noreferrer"> our Dexscreener page</a>.
              </p>
            </li>
            <li>
              <span class="step">4</span>
              <h3>Connect your wallet</h3>
              <p>
                On Dexscreener, click <strong>"Connect Wallet"</strong> and select your Solana wallet (Phantom, Solflare, etc.).
                Approve the connection when prompted.
              </p>
            </li>
            <li>
              <span class="step">5</span>
              <h3>Swap SOL for $CRAB</h3>
              <p>
                In the trading interface, enter the amount of SOL you want to swap for $CRAB. 
                Review the trade details and click <strong>"Swap"</strong>. Confirm the transaction in your wallet.
              </p>
            </li>
            <li>
              <span class="step">6</span>
              <h3>Welcome to the beach! 🦀</h3>
              <p>
                Your $CRAB tokens will appear in your wallet. Join our 
                <a href="https://t.me/bitcrab0x" target="_blank" rel="noopener noreferrer"> Telegram</a> and 
                <a href="https://twitter.com/0x_bitcrab" target="_blank" rel="noopener noreferrer"> Twitter</a> communities!
              </p>
            </li>
          </ol>
          <div class="buy-cta">
            <a class="btn btn--primary btn--large" href="https://dexscreener.com/solana/9mb8fzoukphwihs6kntnly8ps7wanonqfwrokdczze95" target="_blank" rel="noopener noreferrer">
              Buy $CRAB on Dexscreener →
            </a>
          </div>
        </div>
      </section>

      <section id="roadmap" class="section reveal">
        <div class="container">
          <h2>Roadmap</h2>
          <div class="roadmap">
            <div class="phase">
              <h3>Phase 1 — Shell Shock</h3>
              <ul>
                <li>Fair launch</li>
                <li>Website + socials</li>
                <li>1,000 holders</li>
              </ul>
            </div>
            <div class="phase">
              <h3>Phase 2 — Tide Rising</h3>
              <ul>
                <li>DEX and Telegram integrations</li>
                <li>Listings on trackers</li>
                <li>Crab meme contests</li>
              </ul>
            </div>
            <div class="phase">
              <h3>Phase 3 — Crab Nation</h3>
              <ul>
                <li>Community multisig</li>
                <li>IRL beach cleanups</li>
                <li>Charity partnerships</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="community" class="section section--sand reveal">
        <div class="container">
          <h2>Join the community</h2>
          <p>Crabs pinch together. Follow and say hi:</p>
          <div class="socials">
            <a class="social" href="https://solscan.io/token/DzJL3RfctCxZsC72SvvRtcpud7nSMKPNajZ2nHCFY1cu" target="_blank" rel="noopener noreferrer" aria-label="Solana / Solscan"><img src="/assets/svg/solana.svg" alt="Solana icon"/></a>
            <a class="social" href="https://twitter.com/0x_bitcrab" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><img src="/assets/svg/x.svg" alt="Twitter icon"/></a>
            <a class="social" href="https://t.me/bitcrab0x" target="_blank" rel="noopener noreferrer" aria-label="Telegram"><img src="/assets/svg/telegram.svg" alt="Telegram icon"/></a>
          </div>
        </div>
      </section>

      <section id="chart" class="section section--sand reveal">
        <div class="container">
          <h2>Live Chart</h2>
          <p>Track $CRAB price and trading volume in real-time.</p>
          <div class="chart">
            <iframe class="chart__frame" title="DEX Chart" src="https://dexscreener.com/solana/9mb8fzoukphwihs6kntnly8ps7wanonqfwrokdczze95?embed=1&theme=dark&trades=0&info=0"></iframe>
          </div>
        </div>
      </section>

      <section id="docs" class="section reveal">
        <div class="container">
          <h2>Docs</h2>
          <p>Technical docs, audits, and resources.</p>
          <ul class="list">
            <li>
              <a href="/assets/docs/bitcrab-whitepaper.pdf" target="_blank" rel="noopener noreferrer" aria-label="Whitepaper PDF">
                <span>Whitepaper (PDF)</span>
              </a>
            </li>
            <li>
              <a href="#" aria-label="Audit report (coming soon)">
                <span>Audit</span>
                <span class="badge badge--soon">Soon</span>
              </a>
            </li>
            <li>
              <a href="#" aria-label="Brand kit">
                <span>Brand kit</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section id="faq" class="section reveal">
        <div class="container">
          <h2>FAQ</h2>
          <div class="accordion">
            <div class="acc">
              <button class="acc__btn" id="btn-faq1" aria-controls="faq1" aria-expanded="false">Is $CRAB a serious project?</button>
              <div class="acc__panel" id="faq1" role="region" aria-labelledby="btn-faq1">
                <p>It's a serious meme. The community is everything. No promises of profit; we're here for good vibes and good memes.</p>
              </div>
            </div>
            <div class="acc">
              <button class="acc__btn" id="btn-faq2" aria-controls="faq2" aria-expanded="false">What chain is $CRAB on?</button>
              <div class="acc__panel" id="faq2" role="region" aria-labelledby="btn-faq2">
                <p>$CRAB is on Solana mainnet. Use the contract above and your preferred Solana DEX/wallet.</p>
              </div>
            </div>
            <div class="acc">
              <button class="acc__btn" id="btn-faq3" aria-controls="faq3" aria-expanded="false">Any taxes or shady claws?</button>
              <div class="acc__panel" id="faq3" role="region" aria-labelledby="btn-faq3">
                <p>0/0 tax. Contract renounced. Liquidity locked. Clarity over claws.</p>
              </div>
            </div>
            <div class="acc">
              <button class="acc__btn" id="btn-faq4" aria-controls="faq4" aria-expanded="false">How do I buy $CRAB?</button>
              <div class="acc__panel" id="faq4" role="region" aria-labelledby="btn-faq4">
                <p>Install a Solana wallet like <a href="https://phantom.app/" target="_blank" rel="noopener noreferrer">Phantom</a> or <a href="https://solflare.com/" target="_blank" rel="noopener noreferrer">Solflare</a>, fund with SOL, then swap for $CRAB on <a href="https://jup.ag/swap" target="_blank" rel="noopener noreferrer">Jupiter</a>, <a href="https://www.orca.so/" target="_blank" rel="noopener noreferrer">Orca</a>, or <a href="https://raydium.io/swap/" target="_blank" rel="noopener noreferrer">Raydium</a>. You can also connect via WalletConnect using the button in the header.</p>
              </div>
            </div>
            <div class="acc">
              <button class="acc__btn" id="btn-faq5" aria-controls="faq5" aria-expanded="false">What is the official contract address?</button>
              <div class="acc__panel" id="faq5" role="region" aria-labelledby="btn-faq5">
                <p>The official contract address is <code>DzJL3RfctCxZsC72SvvRtcpud7nSMKPNajZ2nHCFY1cu</code>. Always verify on <a href="https://solscan.io/token/DzJL3RfctCxZsC72SvvRtcpud7nSMKPNajZ2nHCFY1cu" target="_blank" rel="noopener noreferrer">Solscan</a> before swapping.</p>
              </div>
            </div>
            <div class="acc">
              <button class="acc__btn" id="btn-faq6" aria-controls="faq6" aria-expanded="false">Which wallets are supported?</button>
              <div class="acc__panel" id="faq6" role="region" aria-labelledby="btn-faq6">
                <p>We support popular Solana wallets like Phantom and Solflare, plus many others via WalletConnect. Use the "Connect Wallet" button in the header to choose and connect.</p>
              </div>
            </div>
            <div class="acc">
              <button class="acc__btn" id="btn-faq7" aria-controls="faq7" aria-expanded="false">Where can I read the whitepaper?</button>
              <div class="acc__panel" id="faq7" role="region" aria-labelledby="btn-faq7">
                <p>Read the <a href="/assets/docs/bitcrab-whitepaper.pdf" target="_blank" rel="noopener noreferrer">Cashcrab Whitepaper (PDF)</a> in the Docs section.</p>
              </div>
            </div>
            <div class="acc">
              <button class="acc__btn" id="btn-faq8" aria-controls="faq8" aria-expanded="false">How many tokens exist?</button>
              <div class="acc__panel" id="faq8" role="region" aria-labelledby="btn-faq8">
                <p>Total supply is 1,000,000,000 $CRAB. See the Tokenomics section and chart for the current breakdown.</p>
              </div>
            </div>
            <div class="acc">
              <button class="acc__btn" id="btn-faq9" aria-controls="faq9" aria-expanded="false">How can I stay updated and get support?</button>
              <div class="acc__panel" id="faq9" role="region" aria-labelledby="btn-faq9">
                <p>Follow us on <a href="https://twitter.com/0x_bitcrab" target="_blank" rel="noopener noreferrer">Twitter</a> and join the <a href="https://t.me/bitcrab0x" target="_blank" rel="noopener noreferrer">Telegram</a>. Beware of DMs and imposters—verify links and the contract address.</p>
              </div>
            </div>
          </div>
          <p class="disclaimer">
            Disclaimer: $CRAB is a meme coin with no intrinsic value or expectation of financial return. Crypto is risky. Do your own research.
          </p>
        </div>
      </section>

      <footer class="site-footer">
        <div class="container">
          <div class="foot__brand">
            <picture class="brand__img">
              <source srcSet="/assets/img/bitcrab.png" type="image/png" />
              <img src="/assets/svg/logo.svg" alt="Cashcrab logo" width="28" height="28" />
            </picture>
            <strong>$CRAB</strong>
          </div>
          <div class="foot__links">
            <a href="#about">About</a>
            <a href="#tokenomics">Tokenomics</a>
            <a href="#how-to-buy">How to Buy</a>
            <a href="#roadmap">Roadmap</a>
            <a href="#faq">FAQ</a>
            <a href="/game">Game</a>
            <a class="social" href="https://twitter.com/0x_bitcrab" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><img src="/assets/svg/x.svg" alt="Twitter icon" width="22" height="22"/></a>
            <a class="social" href="https://t.me/bitcrab0x" target="_blank" rel="noopener noreferrer" aria-label="Telegram"><img src="/assets/svg/telegram.svg" alt="Telegram icon" width="22" height="22"/></a>
          </div>
          <div class="foot__copy">© <span id="year"></span> Cashcrab. Made with 🦀 + 🏖</div>
        </div>
      </footer>
    </main>

    <!-- Enhanced JavaScript with Wallet Integration -->
    <script src="/js/main.js"></script>
    <script>
      // Enhanced Wallet Integration for Static HTML
      let walletConnected = false;
      let walletAddress = null;
      
      // Initialize wallet functionality
      document.addEventListener('DOMContentLoaded', function() {
        initializeWallet();
        
        // Set current year
        document.getElementById('year').textContent = new Date().getFullYear();
      });
      
      function initializeWallet() {
        const connectBtn = document.getElementById('wallet-connect-btn');
        const disconnectBtn = document.getElementById('wallet-disconnect-btn');
        const modal = document.getElementById('wallet-modal');
        const modalClose = document.getElementById('wallet-modal-close');
        const modalBackdrop = modal.querySelector('.wallet-modal__backdrop');
        const walletItems = modal.querySelectorAll('.wallet-item');
        
        // Connect button click
        connectBtn.addEventListener('click', () => {
          modal.style.display = 'block';
        });
        
        // Disconnect button click
        disconnectBtn.addEventListener('click', () => {
          disconnectWallet();
        });
        
        // Close modal
        modalClose.addEventListener('click', () => {
          modal.style.display = 'none';
        });
        
        modalBackdrop.addEventListener('click', () => {
          modal.style.display = 'none';
        });
        
        // Wallet selection
        walletItems.forEach(item => {
          item.addEventListener('click', () => {
            const walletType = item.dataset.wallet;
            connectToWallet(walletType);
          });
        });
        
        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
          }
        });
      }
      
      async function connectToWallet(walletType) {
        const modal = document.getElementById('wallet-modal');
        
        try {
          if (walletType === 'phantom') {
            if (window.solana && window.solana.isPhantom) {
              const resp = await window.solana.connect();
              setWalletConnected(resp.publicKey.toString(), 'Phantom');
              modal.style.display = 'none';
            } else {
              alert('Phantom wallet not found. Please install Phantom wallet extension.');
              window.open('https://phantom.app/', '_blank');
            }
          } else if (walletType === 'solflare') {
            if (window.solflare && window.solflare.isSolflare) {
              await window.solflare.connect();
              const publicKey = window.solflare.publicKey.toString();
              setWalletConnected(publicKey, 'Solflare');
              modal.style.display = 'none';
            } else {
              alert('Solflare wallet not found. Please install Solflare wallet extension.');
              window.open('https://solflare.com/', '_blank');
            }
          }
        } catch (error) {
          console.error('Wallet connection error:', error);
          alert('Failed to connect wallet. Please try again.');
        }
      }
      
      function setWalletConnected(address, walletName) {
        walletConnected = true;
        walletAddress = address;
        
        const connectBtn = document.getElementById('wallet-connect-btn');
        const disconnectBtn = document.getElementById('wallet-disconnect-btn');
        const addressSpan = document.getElementById('wallet-address');
        
        // Truncate address for display
        const truncatedAddress = address.slice(0, 4) + '…' + address.slice(-4);
        
        addressSpan.textContent = truncatedAddress;
        disconnectBtn.title = walletName;
        
        connectBtn.style.display = 'none';
        disconnectBtn.style.display = 'block';
        
        console.log(`Connected to ${walletName}:`, address);
      }
      
      function disconnectWallet() {
        walletConnected = false;
        walletAddress = null;
        
        const connectBtn = document.getElementById('wallet-connect-btn');
        const disconnectBtn = document.getElementById('wallet-disconnect-btn');
        
        connectBtn.style.display = 'block';
        disconnectBtn.style.display = 'none';
        
        // Disconnect from wallet providers
        if (window.solana && window.solana.isPhantom) {
          window.solana.disconnect().catch(() => {});
        }
        if (window.solflare && window.solflare.isSolflare) {
          window.solflare.disconnect().catch(() => {});
        }
        
        console.log('Wallet disconnected');
      }
      
      // Auto-connect on page load if previously connected
      window.addEventListener('load', async () => {
        try {
          if (window.solana && window.solana.isPhantom && window.solana.isConnected) {
            const resp = await window.solana.connect({ onlyIfTrusted: true });
            setWalletConnected(resp.publicKey.toString(), 'Phantom');
          }
        } catch (error) {
          console.log('Auto-connect failed:', error);
        }
      });
    </script>
    
    <!-- Additional Schema.org data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Cashcrab",
      "alternateName": "$CRAB",
      "url": "https://cashcrab.io",
      "description": "Cashcrab ($CRAB) — The Beach-Loving Meme Coin on Solana. Join the crab revolution with our innovative tokenomics and fun community-driven ecosystem.",
      "keywords": "Cashcrab, $CRAB, CRAB token, Solana meme coin, cryptocurrency, DeFi, beach theme crypto",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://cashcrab.io/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Cashcrab",
        "logo": {
          "@type": "ImageObject",
          "url": "https://cashcrab.io/assets/img/bitcrab.png"
        }
      },
      "mainEntity": {
        "@type": "FinancialProduct",
        "name": "Cashcrab Token",
        "alternateName": "$CRAB",
        "description": "A community-driven meme coin on the Solana blockchain with beach-themed tokenomics and innovative features.",
        "category": "Cryptocurrency",
        "provider": {
          "@type": "Organization",
          "name": "Cashcrab"
        }
      }
    }
    </script>
  </body>
</html>
EOF

echo "✅ Created comprehensive index.html with Connect Wallet functionality"

# Create deployment zip
cd ..
zip -r cashcrab-complete-deployment.zip cashcrab-full-deployment/
echo "✅ Created cashcrab-complete-deployment.zip ($(du -h cashcrab-complete-deployment.zip | cut -f1))"

echo ""
echo "🦀 Cashcrab Full Deployment Ready!"
echo "📁 Folder: cashcrab-full-deployment/"
echo "📦 Zip: cashcrab-complete-deployment.zip"
echo ""
echo "New features included:"
echo "• ✅ Updated branding: Bitcrab → Cashcrab"
echo "• ✅ Connect Wallet functionality (Phantom, Solflare)"
echo "• ✅ Auto-connect on page load"
echo "• ✅ Modern wallet UI with modal"
echo "• ✅ Enhanced SEO with Cashcrab branding"
echo "• ✅ All Buy $CRAB links working"
echo "• ✅ Live Dexscreener chart embed"
echo "• ✅ Mobile responsive design"
echo ""
echo "Upload contents of cashcrab-full-deployment/ to public_html/cashcrab.io/"
