/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.1.8', '192.168.1.8:3000', '192.168.1.8:3001'],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    cacheComponents: true,
  },
}

export default nextConfig
