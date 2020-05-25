import store from '../store'

export default {
  namespaced: true,

  state: {
    name: 'kişi adları sözlüğü',
    title: 'kişi adları sözlüğü',

    isReady: false,
    errorMessage: null
  },

  mutations: {
    setTitle (state, payload) {
      state.title = payload
    },

    setIsReady (state, payload) {
      state.isReady = payload
    },

    setErrorMessage (state, payload) {
      state.errorMessage = payload
    }
  },

  actions: {
    start ({ commit }) {
      store.dispatch('data/check')
        .then(() => commit('setIsReady', true))
        .catch(error => commit('setErrorMessage', error))
    }
  }
}
