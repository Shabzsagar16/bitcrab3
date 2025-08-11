import HeroClient from './components/HeroClient';
import HomeWallet from './components/HomeWallet';

export default function Page(){
  return (
    <main id="top">
      <div className="burst" aria-hidden="true"></div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Bitcrab home">
          <picture className="brand__img">
            <source srcSet="/assets/img/bitcrab.png" type="image/png" />
            <img src="/assets/svg/logo.svg" alt="Bitcrab logo" width="36" height="36" />
          </picture>
          <span>$CRAB</span>
        </a>
        <div className="header-actions">
          <nav className="nav" aria-label="Main">
            <button className="nav__toggle" aria-expanded="false" aria-controls="nav-menu">☰</button>
            <ul id="nav-menu" className="nav__menu">
              <li><a href="#about">About</a></li>
              <li><a href="#tokenomics">Tokenomics</a></li>
              <li><a href="#how-to-buy">How to Buy</a></li>
              <li><a href="#roadmap">Roadmap</a></li>
              <li><a href="#chart">Chart</a></li>
              <li><a href="#docs">Docs</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a className="nav-external" href="/game">Game</a></li>
              <li><a href="#community" className="pill">Community</a></li>
            </ul>
          </nav>
          <HomeWallet />
        </div>
      </header>

      <section className="hero" aria-label="Bitcrab hero section">
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
            <h1>Bitcrab <span className="accent">$CRAB</span></h1>
            <p className="tagline">Pinch the dip. Ride the tide. Meme the dream.</p>
            <div className="cta">
              <a className="btn btn--primary" href="#how-to-buy">Buy $CRAB</a>
              <a className="btn btn--ghost" href="#chart">Chart</a>
              <a className="btn btn--ghost" href="#docs">Docs</a>
              <a className="btn btn--primary" href="/game" aria-label="Play the Bitcrab runner game">Play Runner</a>
            </div>
            <div className="contract">
              <span className="label">Contract (Solana):</span>
              <img className="icon" src="/assets/svg/solana.svg" alt="Solana" width={18} height={18}/>
              <code id="contract-addr" data-address="DzJL3RfctCxZsC72SvvRtcpud7nSMKPNajZ2nHCFY1cu">DzJL3RfctC...HCFY1cu</code>
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
            <h2>Why Bitcrab?</h2>
            <p>
              Born on the beach and fueled by good vibes, Bitcrab is the meme coin that
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
              <div className="tok-value">100,000,000</div>
            </div>
            <div className="tok-card tok-community">
              <img src="/assets/svg/crab.svg" alt="Community" width={36} height={36} />
              <div className="tok-label">Community & Airdrops</div>
              <div className="tok-value">28%</div>
              <div className="tok-desc">Stealth + Grow Airdrops, DAO, Optics</div>
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
        </div>
      </section>

      <section id="how-to-buy" className="section section--sand reveal">
        <div className="container">
          <h2>How to buy $CRAB</h2>
          <ol className="steps">
            <li>
              <span className="step">1</span>
              <h3>Get a wallet</h3>
              <p>Install a web3 wallet like MetaMask or a mobile wallet of your choice.</p>
            </li>
            <li>
              <span className="step">2</span>
              <h3>Fund it</h3>
              <p>Bridge or buy SOL to cover swaps and gas on Solana.</p>
            </li>
            <li>
              <span className="step">3</span>
              <h3>Swap for $CRAB</h3>
              <p>Use your favorite DEX. Paste the contract address to avoid fake crabs.</p>
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
                <li>1000 holders</li>
              </ul>
            </div>
            <div className="phase">
              <h3>Phase 2 — Tide Rising</h3>
              <ul>
                <li>DEX/TG integrations</li>
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
            <a className="social" href="https://solscan.io/token/DzJL3RfctCxZsC72SvvRtcpud7nSMKPNajZ2nHCFY1cu" target="_blank" rel="noopener noreferrer" aria-label="Solana / Solscan"><img src="/assets/svg/solana.svg" alt="Solana icon"/></a>
            <a className="social" href="https://twitter.com/0x_bitcrab" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><img src="/assets/svg/x.svg" alt="Twitter icon"/></a>
            <a className="social" href="https://t.me/bitcrab0x" target="_blank" rel="noopener noreferrer" aria-label="Telegram"><img src="/assets/svg/telegram.svg" alt="Telegram icon"/></a>
          </div>
        </div>
      </section>

      <section id="chart" className="section section--sand reveal">
        <div className="container">
          <h2>Live Chart</h2>
          <p>Embed your favorite DEX chart here. Replace the iframe src with your token pair.</p>
          <div className="chart">
            <iframe className="chart__frame" title="DEX Chart" src="about:blank"></iframe>
          </div>
        </div>
      </section>

      <section id="docs" className="section reveal">
        <div className="container">
          <h2>Docs</h2>
          <p>Technical docs, audits, and links. Replace with your real resources.</p>
          <ul className="list">
            <li><a href="#">Whitepaper (soon)</a></li>
            <li><a href="#">Audit (soon)</a></li>
            <li><a href="#">Brand kit</a></li>
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
              <img src="/assets/svg/logo.svg" alt="Bitcrab logo" width={28} height={28} />
            </picture>
            <strong>$CRAB</strong>
          </div>
          <div className="foot__links">
            <a href="#about">About</a>
            <a href="#tokenomics">Tokenomics</a>
            <a href="#how-to-buy">How to Buy</a>
            <a href="#roadmap">Roadmap</a>
            <a href="#faq">FAQ</a>
            <a href="/game">Game</a>
            <a className="social" href="https://twitter.com/0x_bitcrab" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><img src="/assets/svg/x.svg" alt="Twitter icon" width="22" height="22"/></a>
            <a className="social" href="https://t.me/bitcrab0x" target="_blank" rel="noopener noreferrer" aria-label="Telegram"><img src="/assets/svg/telegram.svg" alt="Telegram icon" width="22" height="22"/></a>
          </div>
          <div className="foot__copy">© <span id="year"></span> Bitcrab. Made with 🦀 + 🏖</div>
        </div>
      </footer>

      <HeroClient />
    </main>
  );
}
