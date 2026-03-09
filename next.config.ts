/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xtzkhxklkydewfzpqvbc.supabase.co', // Your Supabase domain
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com', // Add this to fix the crash
      },
    ],
  },
};

module.exports = nextConfig;
