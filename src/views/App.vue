<template>
  <span>
    <span class="position-fixed w-100 h-100 d-flex align-items-center justify-content-center" v-if="!isReady && !errorText">
      <span class="p-4 text-primary text-center">
        <span class="spinner-border text-primary" />
        <div class="mt-4 font-weight-bolder"><span>yükleniyor</span></div>
      </span>
    </span>

    <span class="position-fixed w-100 h-100 d-flex align-items-center justify-content-center" v-if="errorText">
      <span class="p-4 text-danger text-center">
        <span class="d-flex align-items-center justify-content-center bg-danger text-white line-height-1 rounded-circle m-auto" :style="{ fontSize: '3rem', width: '50px', height: '50px' }">!</span>
        <div class="mt-4">{{ errorText }}</div>
      </span>
    </span>

    <nav class="navbar navbar-dark sticky-top bg-primary p-2" v-if="isReady">
      <span class="container d-flex justify-content-center">
        <h1 class="navbar-brand m-0 p-1 line-height-1 cursor-pointer user-select-none" :title="name" v-if="$route.name === 'routeHome'">{{ name }}</h1>
        <router-link class="navbar-brand m-0 p-1 line-height-1" to="/" :title="name" v-else>{{ name }}</router-link>
      </span>
    </nav>

    <router-view :key="$route.fullPath" v-if="isReady" />
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
      'errorText'
    ])
  },

  created () {
    this.$store.dispatch('app/start')
  }
}
</script>
