<template>
  <span>
    <AppLoader
      v-if="!isReady && !errorMessage"
    />

    <AppLoaderErrorMessage
      :message="errorMessage"
      v-if="errorMessage"
    />

    <AppNavbar
      :title="title"
      :show-back-button="!isHomePage"
      v-if="isReady"
    />

    <router-view
      :key="$route.fullPath"
      v-if="isReady"
    />
  </span>
</template>

<script>
import { mapState } from 'vuex'

import AppLoader from './AppLoader.vue'
import AppLoaderErrorMessage from './AppLoaderErrorMessage.vue'
import AppNavbar from './AppNavbar.vue'

export default {
  name: 'App',

  components: {
    AppLoader,
    AppLoaderErrorMessage,
    AppNavbar
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
