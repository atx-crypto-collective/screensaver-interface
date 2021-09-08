const images = require('next-images')
const withPlugins = require('next-compose-plugins')

// optional next.js configuration
const nextConfig = {
//   async redirects() {
//     return [
//       {
//         source: '/latestMints',
//         destination: '/',
//         permanent: true,
//       },
//     ]
//   },
}

module.exports = withPlugins([images], nextConfig)
