import dynamic from "next/dynamic";
import Link from "next/link";

const PixiCrabRunner = dynamic(() => import("../components/PixiCrabRunner"), { ssr: false });

export default function PixiPage(){
  return (
    <main id="pixi">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Bitcrab home">
          <picture className="brand__img">
            <source srcSet="/assets/img/bitcrab.png" type="image/png" />
            <img src="/assets/svg/logo.svg" alt="Bitcrab logo" width={36} height={36} />
          </picture>
          <span>$CRAB</span>
        </Link>
        <nav className="nav" aria-label="Main">
          <ul className="nav__menu">
            <li><Link href="/">Home</Link></li>
            <li><a href="#how-to-play">How to play</a></li>
          </ul>
        </nav>
      </header>

      <section className="section section--sand">
        <div className="container">
          <h1>Bitcrab PixiJS Runner</h1>
          <p id="how-to-play">Tap upper/lower half or use W/S (↑/↓) to switch lanes. Collect shells, avoid urchins. P to pause, R to restart.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <PixiCrabRunner />
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
            <Link href="/">Home</Link>
            <Link href="/game">Runner</Link>
            <Link href="/bubbles">Bubbles</Link>
            <Link href="/pixi">PixiJS</Link>
            <a className="social" href="https://twitter.com/0x_bitcrab" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><img src="/assets/svg/x.svg" alt="Twitter icon" width="22" height="22"/></a>
            <a className="social" href="https://t.me/bitcrab0x" target="_blank" rel="noopener noreferrer" aria-label="Telegram"><img src="/assets/svg/telegram.svg" alt="Telegram icon" width="22" height="22"/></a>
          </div>
          <div className="foot__copy">© <span id="year"></span> Bitcrab. Made with 🦀 + 🏖</div>
        </div>
      </footer>
    </main>
  );
}
