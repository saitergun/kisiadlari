import Vue from 'vue'
import Vuex from 'vuex'

import app from '@/store/app'
import data from '@/store/data'
import api from '@/store/api'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    app,
    data,
    api
  },

  strict: debug
})
