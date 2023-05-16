/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: true,
  },
 env : {
  IMG_BASEURL : 'https://static.malang-lab.com/static'
 },
};

// const withImages = require('next-images');
// module.exports = withImages();

module.exports = nextConfig;
