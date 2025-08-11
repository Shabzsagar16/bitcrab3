
'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

function truncate(addr: string) {
  return addr ? `${addr.slice(0, 4)}…${addr.slice(-4)}` : ''
}

export default function ConnectWallet() {
  const { wallet, wallets, select, connect, publicKey, disconnect } = useWallet() as any
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)

  const label = useMemo(() => (publicKey ? truncate(publicKey.toBase58()) : 'Connect Wallet'), [publicKey])

  const onClick = useCallback(() => {
    if (publicKey) return
    setOpen(true)
  }, [publicKey])

  const onDisconnect = useCallback(() => disconnect().catch(() => {}), [disconnect])

  const handleChoose = useCallback(async (name: string) => {
    try {
      select(name)
      await connect()
      setOpen(false)
    } catch {
      // ignore
    }
  }, [select, connect])

  // Basic a11y: close on Escape, focus first item when opening
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    // Focus first wallet button
    const t = setTimeout(() => {
      panelRef.current?.querySelector<HTMLButtonElement>('.wallet-item')?.focus()
    }, 0)
    return () => {
      window.removeEventListener('keydown', onKey)
      clearTimeout(t)
    }
  }, [open])

  return (
    <div className="wallet">
      {publicKey ? (
        <div className="wallet__connected">
          <button
            className="btn wallet-btn wallet-btn--connected"
            aria-label="Disconnect wallet"
            onClick={onDisconnect}
            title={wallet?.adapter?.name}
          >
            <span className="wallet-dot" aria-hidden="true" />
            <span className="wallet-label">{label}</span>
          </button>
          <span className="sr-only" aria-live="polite">Wallet connected</span>
        </div>
      ) : (
        <button className="btn wallet-btn wallet-btn--connect" onClick={onClick} aria-label="Connect wallet">
          <span className="wallet-label">Connect Wallet</span>
        </button>
      )}
      {open && !publicKey && (
        <div className="wallet-modal" role="dialog" aria-modal="true" aria-label="Choose a wallet">
          <div className="wallet-modal__backdrop" onClick={() => setOpen(false)} />
          <div className="wallet-modal__panel" ref={panelRef}>
            <div className="wallet-modal__head">
              <strong>Connect a wallet</strong>
              <button className="wallet-modal__close" aria-label="Close" onClick={() => setOpen(false)}>×</button>
            </div>
            <ul className="wallet-list" role="list">
              {(wallets || []).map((w: any) => {
                const adapter = w.adapter
                const name: string = adapter?.name || ''
                const lname = String(name).toLowerCase()
                const brand = lname.includes('phantom') ? 'phantom' : lname.includes('solflare') ? 'solflare' : lname.includes('walletconnect') ? 'walletconnect' : 'generic'
                const hint = lname.includes('phantom') ? 'Popular' : lname.includes('solflare') ? 'Trusted' : lname.includes('walletconnect') ? 'Multi-wallet' : 'Wallet'
                const iconSrc = (adapter && (adapter.icon?.toString ? adapter.icon.toString() : adapter.icon)) || ''
                return (
                  <li key={name} role="listitem">
                    <button className={`wallet-item wallet-item--${brand}`} onClick={() => handleChoose(name)}>
                      <span className={`wallet-item__icon wallet-item__icon--${brand}`} aria-hidden="true">
                        {iconSrc ? (
                          <img className="wallet-item__icon-img" src={iconSrc} alt="" />
                        ) : null}
                      </span>
                      <span className="wallet-item__meta">
                        <span className="wallet-item__name">{name}</span>
                        <span className="wallet-item__hint">{hint}</span>
                      </span>
                      <span className="wallet-item__chev" aria-hidden>
                        ›
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
            <div className="wallet-modal__foot">
              <span className="wallet-powered">On Solana</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
