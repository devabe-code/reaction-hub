/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'i.imgur.com',
      },
      {
        hostname: 'cdn.myanimelist.net',
      }
    ],
  },
};

export default nextConfig;
