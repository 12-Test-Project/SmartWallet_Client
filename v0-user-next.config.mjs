/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  // Configuración para PWA
  experimental: {
    appDir: true,
  },
};

export default nextConfig;

