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
      <span class="flex items-center justify-center relative w-full h-12 max-w-md px-4">
        <h1
          class="block text-center text-xl text-white cursor-pointer p-2"
          :title="name"
          v-if="$route.name === 'routeHome'"
        >{{ name }}</h1>

        <router-link
          class="block text-center text-xl text-white cursor-pointer p-2"
          to="/"
          :title="name"
          v-else
        >{{ name }}</router-link>
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

export default {
  name: 'App',

  computed: {
    ...mapState('app', [
      'name',
      'isReady',
      'errorMessage'
    ])
  },

  created () {
    this.$store.dispatch('app/start')
  }
}
</script>
