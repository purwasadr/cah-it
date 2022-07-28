/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'ngeblog-backend.herokuapp.com', 'ksszxsnjxegoikllrbgw.supabase.co'],
  }
}

module.exports = nextConfig
