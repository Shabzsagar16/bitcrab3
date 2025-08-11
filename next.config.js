/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
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
