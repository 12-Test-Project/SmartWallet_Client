/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  output: 'standalone', // Optimización para Docker
  experimental: {
    appDir: true,
  },
};

export default nextConfig;

