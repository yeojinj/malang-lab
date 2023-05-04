/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: true,
  },
};

// const withImages = require('next-images');
// module.exports = withImages();

module.exports = nextConfig;
