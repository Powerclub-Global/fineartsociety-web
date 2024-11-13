import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    domains: ['fine-art-society.vercel.app'], // Add external domains if images are hosted externally
  },
};

module.exports = {
  images: {
    unoptimized: true,
  },
};

module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
      },
    ];
  },
};


export default nextConfig;
