/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    eslint:{
      ignoreDuringBuilds: true,
    },
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
}

export default nextConfig
