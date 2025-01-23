/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         { protocol: "https", hostname: "icon.horse" },
         { protocol: "https", hostname: "avatars.githubusercontent.com" },
      ],
   },
};

export default nextConfig;
