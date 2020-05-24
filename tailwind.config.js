// https://raw.githubusercontent.com/tailwindcss/tailwindcss/master/stubs/defaultConfig.stub.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'space-mono': ['Space Mono', ...defaultTheme.fontFamily.mono]
      },

      colors: {
        primary: '#00b5e6', // iyi parti logo @ https://iyiparti.org.tr/Assets/KurumsalKimlik/Logo/iyi-mavi-dikey.zip
        secondary: '#ffd900', // iyi parti logo @ https://iyiparti.org.tr/Assets/KurumsalKimlik/Logo/iyi-mavi-dikey.zip

        // generated from http://scg.ar-ch.org
        'primary-100': '#b3efff', // lighten 40%
        'primary-200': '#80e4ff', // lighten 30%
        'primary-300': '#4dd9ff', // lighten 20%
        'primary-400': '#1aceff', // lighten 10%
        'primary-500': '#00b5e6',
        'primary-600': '#00a1cc', // darken 5%
        'primary-700': '#008db3', // darken 10%
        'primary-800': '#007999', // darken 15%
        'primary-900': '#006580', // darken 20%

        // generated from http://scg.ar-ch.org
        'secondary-100': '#fff7cc', // lighten 40%
        'secondary-200': '#fff099', // lighten 30%
        'secondary-300': '#ffe866', // lighten 20%
        'secondary-400': '#ffe133', // lighten 10%
        'secondary-500': '#ffd900',
        'secondary-600': '#e6c300', // darken 5%
        'secondary-700': '#b39800', // darken 15%
        'secondary-800': '#806d00', // darken 25%
        'secondary-900': '#4d4100', // darken 35%

        female: '#fc5c65', // fusion red @ flatuicolors.com/palette/de
        male: '#45aaf2', // high blue @ flatuicolors.com/palette/de
        unisex: '#a55eea' // lighter purple @ flatuicolors.com/palette/de
      },

      screens: {
        sm: '481px',
        md: '769px',
        lg: '1025px',
        xl: '1281px'
      }
    }
  },

  variants: {
    backgroundColor: ['hover', 'active', 'focus'] // ['responsive', 'hover', 'focus']
  },

  corePlugins: {
    container: false
  },

  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './public/*.html',
      './src/**/*.vue',
      './src/**/*.js'
    ]
  }
}
