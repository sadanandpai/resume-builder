/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    dirs: [
      'src/__test__',
      'src/common',
      'src/helpers',
      'src/modules',
      'src/pages',
      'src/stories',
      'src/styles',
      'src/templates',
    ],
  },
};
