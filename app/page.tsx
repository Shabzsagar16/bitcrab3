import HeroClient from './components/HeroClient';
import HomeWallet from './components/HomeWallet';
import { BRAND, CONTRACT, LINKS, TEXT } from './constants/content';

function truncate(addr: string, start = 9, end = 8) {
  if (!addr) return ''
  return `${addr.slice(0, start)}...${addr.slice(-end)}`
}

export default function Page(){
  return (
    <main id="top">
      <div className="burst" aria-hidden="true"></div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label={TEXT.aria.home(BRAND.name)}>
          <picture className="brand__img">
            <source srcSet="/assets/img/bitcrab.png" type="image/png" />
            <img src="/assets/svg/logo.svg" alt={`${BRAND.name} logo`} width="36" height="36" />
          </picture>
          <span>{BRAND.ticker}</span>
        </a>
        <div className="header-actions">
      <nav className="nav" aria-label="Main">
            <button className="nav__toggle" aria-expanded="false" aria-controls="nav-menu">☰</button>
            <ul id="nav-menu" className="nav__menu">
        <li><a href="#about">{TEXT.nav.about}</a></li>
        <li><a href="#tokenomics">{TEXT.nav.tokenomics}</a></li>
        <li><a href="#how-to-buy">{TEXT.nav.howToBuy}</a></li>
        <li><a href="#roadmap">{TEXT.nav.roadmap}</a></li>
        <li><a href="#chart">{TEXT.nav.chart}</a></li>
        <li><a href="#docs">{TEXT.nav.docs}</a></li>
        <li><a href="#faq">{TEXT.nav.faq}</a></li>
        <li><a className="nav-external" href="/game">{TEXT.nav.game}</a></li>
        <li><a href="#community" className="pill">{TEXT.nav.community}</a></li>
            </ul>
          </nav>
          <HomeWallet />
        </div>
      </header>

    <section className="hero" aria-label={TEXT.aria.hero(BRAND.name)}>
        <div className="hero__bg">
          <div className="sky">
            <div className="sun" aria-hidden="true"></div>
            <div className="cloud cloud--1"></div>
            <div className="cloud cloud--2"></div>
          </div>
          <img className="palm palm--l" src="/assets/svg/palm.svg" alt="" aria-hidden="true"/>
          <img className="palm palm--r" src="/assets/svg/palm.svg" alt="" aria-hidden="true"/>
          <div className="waves" aria-hidden="true">
            <img src="/assets/svg/wave.svg" alt="" className="wave wave--1" />
            <img src="/assets/svg/wave.svg" alt="" className="wave wave--2" />
            <img src="/assets/svg/wave.svg" alt="" className="wave wave--3" />
          </div>
          <canvas className="bubbles" aria-hidden="true"></canvas>
        </div>
        <div className="container hero__content">
          <div className="hero__left">
            <h1>{BRAND.name} <span className="accent">{BRAND.ticker}</span></h1>
            <p className="tagline">{TEXT.hero.tagline}</p>
            <div className="cta">
              <a className="btn btn--primary" href="#how-to-buy">Buy {BRAND.ticker}</a>
              <a className="btn btn--ghost" href="#chart">{TEXT.nav.chart}</a>
              <a className="btn btn--ghost" href="#docs">{TEXT.nav.docs}</a>
              <a className="btn btn--primary" href="/game" aria-label="Play the Bitcrab runner game">Play Runner</a>
            </div>
            <div className="contract">
              <span className="label">{TEXT.labels.contract}</span>
              <img className="icon" src="/assets/svg/solana.svg" alt="Solana" width={18} height={18}/>
              <code id="contract-addr" data-address={CONTRACT.address}>{truncate(CONTRACT.address)}</code>
              <button id="copy-contract" className="copy" aria-label="Copy contract address">Copy</button>
            </div>
            <ul className="badges">
              <li>No presale</li>
              <li>LP locked</li>
              <li>Contract renounced</li>
            </ul>
          </div>
          <div className="hero__right">
            <picture className="crab mascot" aria-label="Crab mascot">
              <source srcSet="/assets/img/bitcrab.png" type="image/png" />
              <img src="/assets/svg/crab.svg" width={420} height={320} alt="Smiling crab mascot" />
            </picture>
          </div>
        </div>
      </section>

  <section id="about" className="section section--sand reveal">
        <div className="container grid grid--2">
          <div>
    <h2>Why {BRAND.name}?</h2>
            <p>
      Born on the beach and fueled by good vibes, {BRAND.name} is the meme coin that
              pinches FUD and loves sunny gains. Community-owned, fair launch, and built for fun.
            </p>
            <ul className="list list--icons">
              <li><img src="/assets/svg/shell.svg" alt="" aria-hidden="true"/> Fair launch, no VCs</li>
              <li><img src="/assets/svg/shell.svg" alt="" aria-hidden="true"/> Zero team tax</li>
              <li><img src="/assets/svg/shell.svg" alt="" aria-hidden="true"/> 100% community vibes</li>
            </ul>
          </div>
          <div>
            <div className="card ocean">
              <h3>Quick Stats</h3>
              <div className="stats">
                <div><span data-count="1000000000">1,000,000,000</span><label>Total Supply</label></div>
                <div><span>0%</span><label>Buy/Sell Tax</label></div>
                <div><span>🔥</span><label>Liquidity Locked</label></div>
                <div><span>🦀</span><label>Contract Renounced</label></div>
              </div>
            </div>
          </div>
        </div>
      </section>

  <section id="tokenomics" className="section reveal">
        <div className="container">
          <h2>Tokenomics</h2>
          <div className="tokenomics-cards">
            <div className="tok-card tok-supply">
              <img src="/assets/svg/shell.svg" alt="Supply" width={36} height={36} />
              <div className="tok-label">Total Supply</div>
      <div className="tok-value">1,000,000,000</div>
            </div>
            <div className="tok-card tok-community">
              <img src="/assets/svg/crab.svg" alt="Community" width={36} height={36} />
              <div className="tok-label">Community & Airdrops</div>
              <div className="tok-value">28%</div>
      <div className="tok-desc">Stealth + Growth Airdrops, DAO, Ops</div>
            </div>
            <div className="tok-card tok-liquidity">
              <img src="/assets/svg/wave.svg" alt="Liquidity" width={36} height={36} />
              <div className="tok-label">Liquidity & LP</div>
              <div className="tok-value">22%</div>
              <div className="tok-desc">Seed LP, LP Reserve</div>
            </div>
            <div className="tok-card tok-treasury">
              <img src="/assets/svg/palm.svg" alt="Treasury" width={36} height={36} />
              <div className="tok-label">Treasury & Marketing</div>
              <div className="tok-value">25%</div>
              <div className="tok-desc">Treasury, Marketing, Team</div>
            </div>
          </div>
          <div className="tokenomics-chart">
            <img src={LINKS.tokenomicsChart} alt="Bitcrab tokenomics allocation chart" />
          </div>
        </div>
      </section>

    <section id="how-to-buy" className="section section--sand reveal">
        <div className="container">
      <h2>How to Buy $CRAB</h2>
          <ol className="steps">
            <li>
              <span className="step">1</span>
              <h3>Get a Solana wallet</h3>
              <p>
                Install a Solana wallet like  
                <a href="https://phantom.app/" target="_blank" rel="noopener noreferrer"> Phantom</a> or 
                <a href="https://solflare.com/" target="_blank" rel="noopener noreferrer"> Solflare</a>.
                You can also use <strong>WalletConnect</strong> via the Connect button in the header.
              </p>
            </li>
            <li>
              <span className="step">2</span>
              <h3>Fund it</h3>
              <p>Buy or bridge <strong>SOL</strong> to your wallet address. SOL pays for swaps and network fees.</p>
            </li>
            <li>
              <span className="step">3</span>
              <h3>Swap for $CRAB</h3>
              <p>
                Use a Solana DEX like 
                <a href="https://jup.ag/swap" target="_blank" rel="noopener noreferrer"> Jupiter</a>, 
                <a href="https://www.orca.so/" target="_blank" rel="noopener noreferrer"> Orca</a>, or 
                <a href="https://raydium.io/swap/" target="_blank" rel="noopener noreferrer"> Raydium</a>.
                Paste the $CRAB contract from above to avoid imposters.
              </p>
            </li>
            <li>
              <span className="step">4</span>
              <h3>Join the beach</h3>
              <p>Follow our socials, vote on memes, and help steer the tide.</p>
            </li>
          </ol>
        </div>
      </section>

      <section id="roadmap" className="section reveal">
        <div className="container">
          <h2>Roadmap</h2>
          <div className="roadmap">
            <div className="phase">
              <h3>Phase 1 — Shell Shock</h3>
              <ul>
                <li>Fair launch</li>
                <li>Website + socials</li>
                <li>1,000 holders</li>
              </ul>
            </div>
            <div className="phase">
              <h3>Phase 2 — Tide Rising</h3>
              <ul>
                <li>DEX and Telegram integrations</li>
                <li>Listings on trackers</li>
                <li>Crab meme contests</li>
              </ul>
            </div>
            <div className="phase">
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

      <section id="community" className="section section--sand reveal">
        <div className="container">
          <h2>Join the community</h2>
          <p>Crabs pinch together. Follow and say hi:</p>
          <div className="socials">
            <a className="social" href={LINKS.solscanToken(CONTRACT.address)} target="_blank" rel="noopener noreferrer" aria-label="Solana / Solscan"><img src="/assets/svg/solana.svg" alt="Solana icon"/></a>
            <a className="social" href={LINKS.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><img src="/assets/svg/x.svg" alt="Twitter icon"/></a>
            <a className="social" href={LINKS.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram"><img src="/assets/svg/telegram.svg" alt="Telegram icon"/></a>
          </div>
        </div>
      </section>

      <section id="chart" className="section section--sand reveal">
        <div className="container">
          <h2>Live Chart</h2>
          <p>Embed your favorite DEX chart here. Replace the iframe src with your token pair.</p>
          <div className="chart">
            <iframe className="chart__frame" title="DEX Chart" src="https://dexscreener.com/solana/9mb8fzoukphwihs6kntnly8ps7wanonqfwrokdczze95?embed=1&theme=dark&trades=0&info=0"></iframe>
          </div>
        </div>
      </section>

  <section id="docs" className="section reveal">
        <div className="container">
          <h2>Docs</h2>
          <p>Technical docs, audits, and resources.</p>
          <ul className="list">
            <li>
              <a href={LINKS.whitepaper} target="_blank" rel="noopener noreferrer" aria-label="Whitepaper PDF">
                <span>Whitepaper (PDF)</span>
              </a>
            </li>
            <li>
              <a href="#" aria-label="Audit report (coming soon)">
                <span>Audit</span>
                <span className="badge badge--soon">Soon</span>
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

      <section id="faq" className="section reveal">
        <div className="container">
          <h2>FAQ</h2>
          <div className="accordion">
            <div className="acc">
              <button className="acc__btn" id="btn-faq1" aria-controls="faq1" aria-expanded="false">Is $CRAB a serious project?</button>
              <div className="acc__panel" id="faq1" role="region" aria-labelledby="btn-faq1">
                <p>It&#39;s a serious meme. The community is everything. No promises of profit; we&#39;re here for good vibes and good memes.</p>
              </div>
            </div>
            <div className="acc">
              <button className="acc__btn" id="btn-faq2" aria-controls="faq2" aria-expanded="false">What chain is $CRAB on?</button>
              <div className="acc__panel" id="faq2" role="region" aria-labelledby="btn-faq2">
                <p>$CRAB is on Solana mainnet. Use the contract above and your preferred Solana DEX/wallet.</p>
              </div>
            </div>
            <div className="acc">
              <button className="acc__btn" id="btn-faq3" aria-controls="faq3" aria-expanded="false">Any taxes or shady claws?</button>
              <div className="acc__panel" id="faq3" role="region" aria-labelledby="btn-faq3">
                <p>0/0 tax. Contract renounced. Liquidity locked. Clarity over claws.</p>
              </div>
            </div>
            <div className="acc">
              <button className="acc__btn" id="btn-faq4" aria-controls="faq4" aria-expanded="false">How do I buy $CRAB?</button>
              <div className="acc__panel" id="faq4" role="region" aria-labelledby="btn-faq4">
                <p>Install a Solana wallet like <a href={LINKS.phantom} target="_blank" rel="noopener noreferrer">Phantom</a> or <a href={LINKS.solflare} target="_blank" rel="noopener noreferrer">Solflare</a>, fund with SOL, then swap for {BRAND.ticker} on <a href={LINKS.jupiter} target="_blank" rel="noopener noreferrer">Jupiter</a>, <a href={LINKS.orca} target="_blank" rel="noopener noreferrer">Orca</a>, or <a href={LINKS.raydium} target="_blank" rel="noopener noreferrer">Raydium</a>. You can also connect via WalletConnect using the button in the header.</p>
              </div>
            </div>
            <div className="acc">
              <button className="acc__btn" id="btn-faq5" aria-controls="faq5" aria-expanded="false">What is the official contract address?</button>
              <div className="acc__panel" id="faq5" role="region" aria-labelledby="btn-faq5">
                <p>The official contract address is <code>{CONTRACT.address}</code>. Always verify on <a href={LINKS.solscanToken(CONTRACT.address)} target="_blank" rel="noopener noreferrer">Solscan</a> before swapping.</p>
              </div>
            </div>
            <div className="acc">
              <button className="acc__btn" id="btn-faq6" aria-controls="faq6" aria-expanded="false">Which wallets are supported?</button>
              <div className="acc__panel" id="faq6" role="region" aria-labelledby="btn-faq6">
                <p>We support popular Solana wallets like Phantom and Solflare, plus many others via WalletConnect. Use the “{TEXT.wallet.connect}” button in the header to choose and connect.</p>
              </div>
            </div>
            <div className="acc">
              <button className="acc__btn" id="btn-faq7" aria-controls="faq7" aria-expanded="false">Where can I read the whitepaper?</button>
              <div className="acc__panel" id="faq7" role="region" aria-labelledby="btn-faq7">
                <p>Read the <a href={LINKS.whitepaper} target="_blank" rel="noopener noreferrer">Bitcrab Whitepaper (PDF)</a> in the Docs section.</p>
              </div>
            </div>
            <div className="acc">
              <button className="acc__btn" id="btn-faq8" aria-controls="faq8" aria-expanded="false">How many tokens exist?</button>
              <div className="acc__panel" id="faq8" role="region" aria-labelledby="btn-faq8">
                <p>Total supply is 1,000,000,000 {BRAND.ticker}. See the Tokenomics section and chart for the current breakdown.</p>
              </div>
            </div>
            <div className="acc">
              <button className="acc__btn" id="btn-faq9" aria-controls="faq9" aria-expanded="false">How can I stay updated and get support?</button>
              <div className="acc__panel" id="faq9" role="region" aria-labelledby="btn-faq9">
                <p>Follow us on <a href={LINKS.twitter} target="_blank" rel="noopener noreferrer">Twitter</a> and join the <a href={LINKS.telegram} target="_blank" rel="noopener noreferrer">Telegram</a>. Beware of DMs and imposters—verify links and the contract address.</p>
              </div>
            </div>
          </div>
          <p className="disclaimer">
            Disclaimer: $CRAB is a meme coin with no intrinsic value or expectation of financial return. Crypto is risky. Do your own research.
          </p>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <div className="foot__brand">
            <picture className="brand__img">
              <source srcSet="/assets/img/bitcrab.png" type="image/png" />
              <img src="/assets/svg/logo.svg" alt={`${BRAND.name} logo`} width={28} height={28} />
            </picture>
            <strong>{BRAND.ticker}</strong>
          </div>
          <div className="foot__links">
            <a href="#about">{TEXT.nav.about}</a>
            <a href="#tokenomics">{TEXT.nav.tokenomics}</a>
            <a href="#how-to-buy">{TEXT.nav.howToBuy}</a>
            <a href="#roadmap">{TEXT.nav.roadmap}</a>
            <a href="#faq">{TEXT.nav.faq}</a>
            <a href="/game">{TEXT.nav.game}</a>
            <a className="social" href={LINKS.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><img src="/assets/svg/x.svg" alt="Twitter icon" width="22" height="22"/></a>
            <a className="social" href={LINKS.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram"><img src="/assets/svg/telegram.svg" alt="Telegram icon" width="22" height="22"/></a>
          </div>
          <div className="foot__copy">© <span id="year"></span> {BRAND.name}. Made with 🦀 + 🏖</div>
        </div>
      </footer>

      <HeroClient />
    </main>
  );
}
