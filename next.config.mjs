/** @type {import('next').NextConfig} */
const nextConfig = {

    /* res.cloudinary.com */

    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
          },
          {
            protocol: "https",
            hostname: "avatars.githubusercontent.com",
          }
        ],
      },
};

export default nextConfig;
