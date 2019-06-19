import store from '../store'

export default {
  namespaced: true,

  state () {
    return {
      name: 'kişi adları sözlüğü',
      publicPath: process.env.BASE_URL,

      isReady: false,
      errorText: null
    }
  },

  getters: {
    appName: s => s.name
  },

  mutations: {
    setReady (s, p) {
      s.isReady = p
    },

    setErrorText (s, p) {
      s.errorText = p
    }
  },

  actions: {
    start ({ commit }) {
      store.dispatch('data/check').then(() => commit('setReady', true)).catch(error => commit('setErrorText', error))
    }
  }
}
