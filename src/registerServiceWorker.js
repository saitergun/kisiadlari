/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV !== 'development') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log('ready', 'App is being served from cache by a service worker.\n For more details, visit https://goo.gl/AFskqB')
    },

    registered () {
      console.log('registered', 'Service worker has been registered.')
    },

    cached () {
      console.log('cached', 'Content has been cached for offline use.')
    },

    updatefound () {
      console.log('updatefound', 'New content is downloading.')
    },

    updated () {
      console.log('updated', 'New content is available; please refresh.')

      window.location.reload()
    },

    offline () {
      console.log('offline', 'No internet connection found. App is running in offline mode.')
    },

    error (error) {
      console.error('error', 'Error during service worker registration:', error)
    }
  })
}
