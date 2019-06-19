import Vue from 'vue'
import App from './views/App.vue'

import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'development'

Vue.mixin({
  filters: {
    highlightText: (string, text) => {
      if (typeof string === 'string' && text.length > 0) {
        const regex = text
          .replace(new RegExp('[aâAÂ]', 'gi'), '[aâAÂ]')
          .replace(new RegExp('[ıiîIİÎ]', 'gi'), '[ıiîIİÎ]')
          .replace(new RegExp('[uüûUÜÛ]', 'gi'), '[uüûUÜÛ]')
          .replace(new RegExp('[cçCÇ]', 'gi'), '[cçCÇ]')
          .replace(new RegExp('[gğGĞ]', 'gi'), '[gğGĞ]')
          .replace(new RegExp('[sşSŞ]', 'gi'), '[sşSŞ]')
          .replace(new RegExp('[oöOÖ]', 'gi'), '[oöOÖ]')
        if (string.match(new RegExp(regex, 'gi'))) {
          return string.replace(new RegExp(regex, 'gi'), str => `<span class="marker">${str}</span>`)
        }
      }
      return string
    },

    lowerCaseIt: string => string.toLocaleLowerCase(),

    upperCaseIt: string => string.toLocaleUpperCase()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root')
