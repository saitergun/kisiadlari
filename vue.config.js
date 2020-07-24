const SWPrecache = require('sw-precache-webpack-plugin')

const plugins = []

if (process.env.NODE_ENV === 'production') {
  // https://github.com/GoogleChromeLabs/sw-precache/issues/379#issuecomment-455141742
  plugins.push(
    new SWPrecache({
      cacheId: 'nhb-year-in-pixels',
      filepath: 'dist/service-worker.js',
      staticFileGlobs: [
        'dist/*',
        'dist/**/*'
      ],
      stripPrefix: 'dist/',
      maximumFileSizeToCacheInBytes: 3097152
    })
  )
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/kisiadlari/'
    : '/',

  configureWebpack: {
    plugins
  },

  pwa: {
    name: 'kişi adları sözlüğü',
    themeColor: '#00B5E6',
    msTileColor: '#00B5E6',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    iconPaths: {
      favicon16: 'img/favicon/16.png',
      favicon32: 'img/favicon/32.png',
      appleTouchIcon: 'img/favicon/152.png',
      maskIcon: 'img/favicon/safari-pinned-tab.svg',
      msTileImage: 'img/favicon/144.png'
    }
  }
}
