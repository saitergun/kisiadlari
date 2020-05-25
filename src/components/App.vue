<template>
  <span>
    <span class="fixed w-screen h-screen flex items-center justify-center" v-if="!isReady && !errorMessage">
      <span class="text-center text-primary p-4">
        <span class="text-2xl font-bold mt-4">yükleniyor</span>
      </span>
    </span>

    <span class="fixed w-screen h-screen flex items-center justify-center" v-if="errorMessage">
      <span class="text-center text-red-600 p-4">
        <span class="w-12 h-12 flex items-center justify-center bg-red-500 text-white leading-none text-4xl rounded-full m-auto">!</span>

        <span class="block mt-5">{{ errorMessage }}</span>
      </span>
    </span>

    <nav class="sticky left-0 top-0 right-0 w-full h-12 flex items-center justify-center bg-primary shadow z-40" v-if="isReady">
      <span class="flex items-center justify-center relative w-full h-12 max-w-md sm:px-4">
        <button
          class="absolute left-0 top-0 w-10 h-10 flex items-center justify-center active:bg-primary-600 text-white rounded-full focus:outline-none p-2 mt-1 ml-1"
          @click="$router.back()"
          v-if="!isHomePage"
        ><IconArrowLeft /></button>

        <h1
          class="block text-center text-xl text-white select-none p-2"
          :title="title"
        >{{ title }}</h1>
      </span>
    </nav>

    <router-view
      :key="$route.fullPath"
      v-if="isReady"
    />
  </span>
</template>

<script>
import { mapState } from 'vuex'

import IconArrowLeft from './IconArrowLeft.vue'

export default {
  name: 'App',

  components: {
    IconArrowLeft
  },

  computed: {
    ...mapState('app', [
      'name',
      'title',
      'isReady',
      'errorMessage'
    ]),

    isHomePage () {
      return this.$route.path === '/'
    }
  },

  created () {
    this.$store.dispatch('app/start')
  }
}
</script>
