import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // ถ้ามีโดเมนอื่นอีก ก็เพิ่มต่อท้ายตรงนี้ได้เลยครับ
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com', 
      },
    ],
  },
};

export default nextConfig;
