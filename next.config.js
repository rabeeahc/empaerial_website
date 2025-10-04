/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export', // static export
  basePath: isProd ? '/empaerial-website' : '', // use basePath only in production
  assetPrefix: isProd ? '/empaerial-website/' : '', // same for assets
  images: {
    unoptimized: true, // needed for static export
  },
};

module.exports = nextConfig;