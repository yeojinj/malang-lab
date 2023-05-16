/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['static.malang-lab.com']
  },
};

// const withImages = require('next-images');
// module.exports = withImages();

module.exports = nextConfig;
