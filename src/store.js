import Vue from 'vue'
import Vuex from 'vuex'

import app from '@/store/app'
import data from '@/store/data'
import api from '@/store/api'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  modules: {
    app,
    data,
    api
  }
})
