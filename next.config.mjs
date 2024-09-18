/** @type {import('next').NextConfig} */
const nextConfig = {

    /* res.cloudinary.com */

    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            //pathname: '',
          },
        ],
      },
};

export default nextConfig;
