/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  basePath: isProd ? '/empaerial-website' : '',
  assetPrefix: isProd ? '/empaerial-website/' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;