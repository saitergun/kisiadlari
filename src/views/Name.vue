<template>
  <main class="container p-3">
    <section class="bg-white shadow-sm rounded-lg" v-if="!loading && !item">
      <header class="px-3 py-2">
        <h1 class="m-0 line-height-1">ad bulunamadı</h1>
      </header>

      <main class="border-top border-light px-3 py-3">
        <p class="m-0 line-height-1">aradığın ad burada yok. daha önce varsa da silinmiş.</p>
      </main>
    </section>

    <section class="bg-white shadow-sm rounded-lg" v-if="!loading && item">
      <header class="px-3 py-2">
        <h1 class="m-0 line-height-1">{{ item.name | upperCaseIt }}</h1>
      </header>

      <main class="list-group list-group-flush">
        <span class="list-group-item d-flex align-items-center justify-content-between bg-transparent border-light line-height-1 p-3" v-if="item.pronunciation">
          <span>söyleyiş</span>
          <span>{{ item.pronunciation | lowerCaseIt }}</span>
        </span>

        <span class="list-group-item d-flex align-items-center justify-content-between bg-transparent border-light line-height-1 p-3" v-if="item.gender">
          <span>cinsiyet</span>
          <span>
            <span>{{ item.gender.nameLocale | lowerCaseIt }}</span>
          </span>
        </span>

        <span class="list-group-item d-flex align-items-center justify-content-between bg-transparent border-light line-height-1 px-3 py-2" v-if="!loading && item.origins.length && !item.namesSeparately.length">
          <span>köken</span>
          <span>
            <span class="d-flex align-items-center align-content-stretch justify-content-end flex-wrap" :class="{ 'mt-1': index > 0 }" :key="index" v-for="(origin, index) in item.origins">
              <span>{{ origin.nameLocale | lowerCaseIt }}</span>
              <img class="rounded-circle img-thumbnail border-light ml-2" :src="origin.flag.square" style="width: 1.75rem; height: 1.75rem" :title="origin.nameLocale | lowerCaseIt" />
            </span>
          </span>
        </span>
      </main>
    </section>

    <section class="bg-white shadow-sm rounded-lg mt-3" v-if="!loading && item.namesSeparately.length">
      <header class="px-3 py-2">
        <h3 class="m-0 line-height-1">köken</h3>
      </header>

      <main class="list-group list-group-flush">
        <span class="list-group-item d-flex align-items-center justify-content-between bg-transparent border-light line-height-1 px-3 py-2" v-for="name in item.namesSeparately" :key="name.name">
          <span>{{ name.name | lowerCaseIt }}</span>
          <span class="d-flex align-items-center justify-content-center">
            <span>{{ name.origin.nameLocale | lowerCaseIt }}</span>
            <img class="rounded-circle img-thumbnail border-light ml-2" :src="name.origin.flag.square" style="width: 1.75rem; height: 1.75rem" :title="name.origin.nameLocale | lowerCaseIt" />
          </span>
        </span>
      </main>
    </section>

    <section class="bg-white shadow-sm rounded-lg mt-3" v-if="!loading && item.significations.length">
      <header class="px-3 py-2">
        <h3 class="m-0 line-height-1">anlam</h3>
      </header>

      <main class="list-group list-group-flush">
        <span class="list-group-item bg-transparent border-light px-3 py-2" :key="index" v-for="(signification, index) in item.significations" :inner-html.prop="signification | lowerCaseIt" />
      </main>
    </section>

    <section class="bg-white shadow-sm rounded-lg mt-3" v-if="!loading && item.description">
      <header class="px-3 py-2">
        <h3 class="m-0 line-height-1">not</h3>
      </header>

      <main class="list-group list-group-flush">
        <span class="list-group-item bg-transparent border-light px-3 py-2">{{ item.description | lowerCaseIt }}</span>
      </main>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Name',

  beforeRouteEnter (to, from, next) {
    if (isNaN(to.params.id) || Number(to.params.id) === 0) {
      next('/')
    }

    next()
  },

  beforeRouteUpdate (to, from, next) {
    if (isNaN(to.params.id) || Number(to.params.id) === 0) {
      next('/')
    }

    next()
  },

  beforeRouteLeave (to, from, next) {
    next()
  },

  data () {
    return {
      loading: true,
      item: null
    }
  },

  computed: {
    id () {
      return this.$router.currentRoute.params.id
    },

    ...mapGetters('app', [
      'appName'
    ])
  },

  created () {
    this.$store.dispatch('api/nameById', this.id).then(response => {
      document.title = response.name.toLocaleUpperCase() + ' · ' + this.appName

      this.item = response
      this.loading = false
    })
  }
}
</script>
