/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'ngeblog-backend.herokuapp.com'],
  }
}

module.exports = nextConfig
