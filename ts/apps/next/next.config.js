/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export configuration with generateStaticParams
  output: 'export',
  images: {
    domains: ['www.getquotient.ai'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Required for static export
    unoptimized: true,
  },
  env: {
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  },
}

module.exports = nextConfig