<template>
  <main class="container space-y-4">
    <section class="bg-white shadow-sm rounded" v-if="!loading && !item">
      <header class="py-2 px-4">
        <h1 class="text-4xl">ad bulunamadı</h1>
      </header>

      <main class="py-3 px-4">
        <p>aradığın ad burada yok. daha önce varsa da silinmiş.</p>
      </main>
    </section>

    <section class="bg-white shadow-sm rounded" v-if="!loading && item">
      <header class="py-2 px-4">
        <h1 class="text-4xl">{{ item.name | upperCaseIt }}</h1>
      </header>

      <main class="flex flex-col divide-y divide-gray-100">
        <span class="flex items-center justify-between py-3 px-4" v-if="item.pronunciation">
          <span>söyleyiş</span>

          <span>{{ item.pronunciation | lowerCaseIt }}</span>
        </span>

        <span class="flex items-center justify-between py-3 px-4" v-if="item.gender">
          <span>cinsiyet</span>

          <span>{{ item.gender.nameLocale | lowerCaseIt }}</span>
        </span>

        <span class="flex items-center justify-between py-2 px-4" v-if="!loading && item.origins.length && !item.namesSeparately.length">
          <span>köken</span>

          <span class="flex flex-col space-y-2">
            <span
              class="flex flex-wrap items-center self-stretch justify-end space-x-2"
              :class="{
                'mt-1': index > 0
              }"
              :key="index"
              v-for="(origin, index) in item.origins"
            >
              <span>{{ origin.nameLocale | lowerCaseIt }}</span>

              <img
                class="w-6 h-6 rounded-full border-2 border-white"
                :class="{
                  '-ml-2': index,
                  'relative': origin.id === 1
                }"
                :src="origin.flag.square"
                :title="origin.nameLocale | lowerCaseIt"
              />
            </span>
          </span>
        </span>
      </main>
    </section>

    <section class="bg-white shadow-sm rounded" v-if="!loading && item.namesSeparately.length">
      <header class="py-2 px-4">
        <h3 class="text-3xl">köken</h3>
      </header>

      <main class="flex flex-col divide-y divide-gray-100">
        <span class="flex items-center justify-between py-2 px-4" v-for="name in item.namesSeparately" :key="name.name">
          <span>{{ name.name | lowerCaseIt }}</span>

          <span class="flex flex-wrap items-center self-stretch justify-end space-x-2">
            <span>{{ name.origin.nameLocale | lowerCaseIt }}</span>

            <img
              class="w-6 h-6 rounded-full border-2 border-white"
              :src="name.origin.flag.square"
              :title="name.origin.nameLocale | lowerCaseIt"
            />
          </span>
        </span>
      </main>
    </section>

    <section class="bg-white shadow-sm rounded" v-if="!loading && item.significations.length">
      <header class="py-2 px-4">
        <h3 class="text-3xl">anlam</h3>
      </header>

      <main class="flex flex-col divide-y divide-gray-100">
        <span
          class="flex items-center py-2 px-4"
          :key="index"
          v-for="(signification, index) in item.significations"
          :inner-html.prop="signification | lowerCaseIt"
        />
      </main>
    </section>

    <section class="bg-white shadow-sm rounded" v-if="!loading && item.description">
      <header class="py-2 px-4">
        <h3 class="text-3xl">not</h3>
      </header>

      <main>
        <p class="flex items-center py-2 px-4">{{ item.description | lowerCaseIt }}</p>
      </main>
    </section>
  </main>
</template>

<script>
import { mapState } from 'vuex'

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

    ...mapState('app', {
      appName: 'name'
    })
  },

  created () {
    this.$store.dispatch('api/nameById', this.id).then(response => {
      document.title = `${response.name.toLocaleUpperCase()} · ${this.appName}`
      this.$store.commit('app/setTitle', response.name.toLocaleUpperCase())

      this.item = response
      this.loading = false
    })
  }
}
</script>
