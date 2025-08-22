/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' for Node.js deployment
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://www.dextools.io https://dexscreener.com https://www.dexscreener.com; child-src 'self' https://www.dextools.io https://dexscreener.com https://www.dexscreener.com;",
          },
        ],
      },
    ];
  },

  webpack: (config) => {
    // Avoid bundling server-only deps pulled by WalletConnect transitive deps
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      'pino-pretty': false,
      fs: false,
      net: false,
      tls: false,
    }
    return config
  },
}

module.exports = nextConfig
