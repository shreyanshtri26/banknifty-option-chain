/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ['prices.algotest.xyz'],
    },
  }
  
  module.exports = nextConfig