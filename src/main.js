import Vue from 'vue'
import App from './views/App.vue'

import router from './router'
import store from './store'
import './registerServiceWorker'

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

  methods: {
    registerServiceWorker () {
      const version = 'v1.0'

      // register service worker if support client
      if (('serviceWorker' in navigator)) {
        navigator.serviceWorker.register('service-worker.js').then(() => {
          if (process.env.NODE_ENV === 'development') {
            console.log('SW registration completed 😊')
          }

          // credits from https://medium.com/js-dojo/vuejs-pwa-cache-busting-8d09edd22a31
          navigator.serviceWorker.addEventListener('activate', () => {
            // console.log(`%c ${version} `, 'background: #ddd; color: #0000ff');

            if (caches) {
              caches.keys().then((arr) => {
                arr.forEach((key) => {
                  if (key.indexOf('d4-precache') < -1) {
                    caches.delete(key).then(() => {
                      console.log(`%c Cleared ${key}`, 'background: #333; color: #ff0000')
                    })
                  } else {
                    caches.open(key).then((cache) => {
                      cache.match('version').then((res) => {
                        if (!res) {
                          cache.put('version', new Response(version, { status: 200, statusText: version }))
                        } else if (res.statusText !== version) {
                          caches.delete(key).then(() => {
                            // console.log(`%c Cleared Cache ${version}`, 'background: #333; color: #ff0000')
                          })
                        } else {
                          // console.log(`%c Great you have the latest version ${version}`, 'background: #333; color: #00ff00');
                        }
                      })
                    })
                  }
                })
              })
            }
          })
        }, (error) => {
          if (process.env.NODE_ENV === 'development') {
            console.error('SW registration failed! 😱', error)
          }
        })
      }
    }
  },

  mounted () {
    this.registerServiceWorker()
  },

  render: h => h(App)
}).$mount('#root')
