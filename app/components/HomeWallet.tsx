'use client'

import { useMemo } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork, type WalletAdapter } from '@solana/wallet-adapter-base'
import { clusterApiUrl } from '@solana/web3.js'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare'
import { WalletConnectWalletAdapter } from '@solana/wallet-adapter-walletconnect'
import ConnectWallet from './ConnectWallet'

export default function HomeWallet() {
  const network = WalletAdapterNetwork.Mainnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  const wallets = useMemo<WalletAdapter[]>(() => {
    const list: WalletAdapter[] = [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
    ]
    const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
    if (projectId) {
      const metadata = typeof window !== 'undefined' ? {
        name: 'Bitcrab ($CRAB)',
        description: 'Bitcrab — Pinch the dip, ride the tide',
        url: window.location.origin,
        icons: [`${window.location.origin}/assets/img/bitcrab.png`],
      } : undefined
      list.push(new WalletConnectWalletAdapter({ network, options: { projectId, metadata } }))
    }
    if (process.env.NODE_ENV !== 'production') {
      try { console.log('[Wallets]', list.map(w => w.name)) } catch {}
    }
    return list
  }, [network])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider
        wallets={wallets}
        autoConnect={false}
        onError={(e) => {
          // Avoid noisy errors on first load when no session exists
          if (process.env.NODE_ENV !== 'production') {
            console.warn('[Wallet]', e?.name || 'WalletError', e?.message)
          }
        }}
      >
  <ConnectWallet />
      </WalletProvider>
    </ConnectionProvider>
  )
}
