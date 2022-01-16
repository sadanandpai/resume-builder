/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['img.icons8.com'],
  },
  eslint: {
    dirs: ['src/pages', 'src/core', 'src/stores', 'src/templates', 'src/home'],
  },
};
