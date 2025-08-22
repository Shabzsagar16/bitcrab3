#!/bin/bash

# Static HTML Deployment for Namecheap Shared Hosting
# This creates a lightweight static version that doesn't require Node.js

echo "🦀 Creating static HTML deployment for Namecheap shared hosting..."

# Remove old static deployment
rm -f cashcrab-static-deployment.zip
rm -rf static-deployment

# Create static deployment directory
mkdir static-deployment

echo "📦 Creating static HTML version..."

# Copy static assets
cp -r public/* static-deployment/
cp index.html static-deployment/

# Copy CSS
cp -r css static-deployment/
cp -r js static-deployment/

echo "🔧 Creating optimized index.html..."

# Create an optimized version with updated domain
cat > static-deployment/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    
    <!-- Primary Meta Tags -->
    <title>Bitcrab ($CRAB) — The Beach-Loving Meme Coin on Solana | Official Website</title>
    <meta name="title" content="Bitcrab ($CRAB) — The Beach-Loving Meme Coin on Solana | Official Website" />
    <meta name="description" content="Bitcrab ($CRAB) is the ultimate beach-loving meme coin on Solana. Fair launch, 0% tax, LP locked, contract renounced. Join the crab community and pinch the dip!" />
    <meta name="keywords" content="Bitcrab, $CRAB, CRAB token, Solana meme coin, cryptocurrency, DeFi, beach coin, crab coin, meme token, fair launch, zero tax" />
    <meta name="author" content="Bitcrab Team" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://cashcrab.io/" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://cashcrab.io/" />
    <meta property="og:title" content="Bitcrab ($CRAB) — The Beach-Loving Meme Coin on Solana" />
    <meta property="og:description" content="Join the Bitcrab community! Fair launch meme coin on Solana with 0% tax, locked LP, and renounced contract. Pinch the dip, ride the tide!" />
    <meta property="og:image" content="https://cashcrab.io/assets/img/bitcrab.png" />
    <meta property="og:image:alt" content="Bitcrab ($CRAB) Logo - Beach-loving meme coin mascot" />
    <meta property="og:site_name" content="Bitcrab" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://cashcrab.io/" />
    <meta property="twitter:title" content="Bitcrab ($CRAB) — The Beach-Loving Meme Coin on Solana" />
    <meta property="twitter:description" content="Join the Bitcrab community! Fair launch meme coin on Solana with 0% tax, locked LP, and renounced contract. Pinch the dip, ride the tide!" />
    <meta property="twitter:image" content="https://cashcrab.io/assets/img/bitcrab.png" />
    <meta property="twitter:creator" content="@0x_bitcrab" />
    
    <!-- Crypto-specific meta tags -->
    <meta name="coin-ticker" content="CRAB" />
    <meta name="blockchain" content="Solana" />
    <meta name="contract-address" content="DzJL3RfctCxZsC72SvvRtcpud7nSMKPNajZ2nHCFY1cu" />
    
    <!-- Favicons -->
    <link rel="icon" type="image/png" href="/assets/img/bitcrab.png" />
    <link rel="apple-touch-icon" href="/assets/img/bitcrab.png" />
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Urbanist:wght@300;400;600;800&display=swap" rel="stylesheet" />
    
    <!-- CSS -->
    <link rel="stylesheet" href="/css/styles.css" />
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Bitcrab",
      "alternateName": "$CRAB",
      "url": "https://cashcrab.io",
      "logo": "https://cashcrab.io/assets/img/bitcrab.png",
      "description": "Bitcrab ($CRAB) is a community-driven meme coin on Solana blockchain with fair launch, zero taxes, and locked liquidity.",
      "sameAs": [
        "https://twitter.com/0x_bitcrab",
        "https://t.me/bitcrab0x",
        "https://solscan.io/token/DzJL3RfctCxZsC72SvvRtcpud7nSMKPNajZ2nHCFY1cu"
      ]
    }
    </script>
  </head>
  <body>
    <div id="root">
      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <img src="/assets/svg/crab.svg" alt="Bitcrab Logo" class="hero-logo" />
            <h1>Bitcrab ($CRAB)</h1>
            <p class="hero-subtitle">The Beach-Loving Meme Coin on Solana</p>
            <p class="hero-description">
              Fair launch • 0% tax • LP locked • Contract renounced<br>
              Join the crab revolution and pinch the dip!
            </p>
            
            <!-- Buy Button -->
            <a href="https://dexscreener.com/solana/9mb8fzoukphwihs6kntnly8ps7wanonqfwrokdczze95" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="cta-button primary">
              🦀 Buy $CRAB
            </a>
            
            <!-- Chart Section -->
            <div class="chart-section">
              <h2>Live Chart</h2>
              <div class="chart-container">
                <iframe 
                  src="https://dexscreener.com/solana/9mb8fzoukphwihs6kntnly8ps7wanonqfwrokdczze95?embed=1&theme=dark" 
                  frameborder="0" 
                  style="width: 100%; height: 400px; border-radius: 10px;"
                  title="Bitcrab ($CRAB) Live Chart">
                </iframe>
              </div>
            </div>
            
            <!-- Token Info -->
            <div class="token-info">
              <h2>Token Information</h2>
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">Contract Address:</span>
                  <span class="value">DzJL3RfctCxZsC72SvvRtcpud7nSMKPNajZ2nHCFY1cu</span>
                </div>
                <div class="info-item">
                  <span class="label">Blockchain:</span>
                  <span class="value">Solana</span>
                </div>
                <div class="info-item">
                  <span class="label">Tax:</span>
                  <span class="value">0% Buy / 0% Sell</span>
                </div>
                <div class="info-item">
                  <span class="label">Total Supply:</span>
                  <span class="value">1,000,000,000 $CRAB</span>
                </div>
              </div>
            </div>
            
            <!-- How to Buy -->
            <div class="how-to-buy">
              <h2>How to Buy $CRAB</h2>
              <div class="steps">
                <div class="step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <h3>Get a Solana Wallet</h3>
                    <p>Download Phantom, Solflare, or another Solana wallet</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <h3>Buy SOL</h3>
                    <p>Purchase SOL from an exchange like Coinbase or Binance</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <h3>Visit Dexscreener</h3>
                    <p>Go to our Dexscreener page to trade $CRAB</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">4</div>
                  <div class="step-content">
                    <h3>Connect Wallet</h3>
                    <p>Connect your Solana wallet to Dexscreener</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">5</div>
                  <div class="step-content">
                    <h3>Swap SOL for $CRAB</h3>
                    <p>Enter the amount of SOL you want to swap for $CRAB</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">6</div>
                  <div class="step-content">
                    <h3>Confirm Transaction</h3>
                    <p>Review and confirm the transaction in your wallet</p>
                  </div>
                </div>
              </div>
              
              <a href="https://dexscreener.com/solana/9mb8fzoukphwihs6kntnly8ps7wanonqfwrokdczze95" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 class="cta-button primary large">
                🚀 Start Trading $CRAB Now
              </a>
            </div>
            
            <!-- Social Links -->
            <div class="social-links">
              <h2>Join Our Community</h2>
              <div class="social-grid">
                <a href="https://twitter.com/0x_bitcrab" target="_blank" rel="noopener noreferrer" class="social-link">
                  <img src="/assets/svg/x.svg" alt="Twitter" />
                  <span>Twitter</span>
                </a>
                <a href="https://t.me/bitcrab0x" target="_blank" rel="noopener noreferrer" class="social-link">
                  <img src="/assets/svg/telegram.svg" alt="Telegram" />
                  <span>Telegram</span>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" class="social-link">
                  <img src="/assets/svg/discord.svg" alt="Discord" />
                  <span>Discord</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    
    <!-- JavaScript -->
    <script src="/js/main.js"></script>
  </body>
</html>
EOF

echo "📋 Creating deployment instructions..."

# Create deployment instructions
cat > static-deployment/README.md << 'EOF'
# 🚀 Static HTML Deployment for Namecheap

## 📁 What's Included
- ✅ Pure HTML/CSS/JS (No Node.js required)
- ✅ All assets and images
- ✅ Live Dexscreener chart embed
- ✅ SEO optimized for cashcrab.io
- ✅ Mobile responsive design

## 🔧 Deployment Steps

### 1. Upload Files
- Upload ALL files from this folder to your domain's public_html directory
- Ensure file permissions are set correctly (644 for files, 755 for folders)

### 2. Domain Configuration
- No special server configuration needed
- Works with any web hosting (shared, VPS, dedicated)
- No Node.js or special modules required

### 3. SSL Setup
- Enable SSL in cPanel for https://cashcrab.io
- Update DNS if needed

## ✅ Features Working
- 🦀 Live price chart from Dexscreener
- 💰 Direct buy button to trading page
- 📱 Mobile responsive design
- 🔍 SEO optimized for search engines
- 🌐 Fast loading (no server-side processing)

## 🚀 Go Live
Your site will be immediately available at: https://cashcrab.io

No server restarts or configuration needed!
EOF

cd static-deployment

echo "🗜️ Creating static deployment ZIP..."
zip -r ../cashcrab-static-deployment.zip . -x "*.DS_Store"

cd ..
rm -rf static-deployment

echo "✅ Static deployment package created: cashcrab-static-deployment.zip"
echo "📁 Size: $(ls -lh cashcrab-static-deployment.zip | awk '{print $5}')"
echo ""
echo "🚀 This is a pure HTML/CSS/JS version that will work on ANY hosting!"
echo "📋 No Node.js required - just upload and go live!"
echo ""
echo "💡 Benefits:"
echo "  - No memory limits or server errors"
echo "  - Instant loading"
echo "  - Works on shared hosting"
echo "  - All features preserved"
