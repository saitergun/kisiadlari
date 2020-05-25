<template>
  <main class="container">
    <section class="bg-white border rounded">
      <span class="block relative">
        <input
          type="text"
          class="w-full h-auto text-center text-xl placeholder-gray-500 bg-transparent focus:outline-none focus:shadow py-2 px-4"
          :class="{
            'rounded-t rounded-b-none': items.length,
            'rounded': !items.length,
            'pr-5': query.length
          }"
          placeholder="hızlı ad ara"
          v-model="query"
          @input="quickSearch(query)"
          @keyup.enter="enterFirstItem"
        />

        <button
          class="absolute top-0 right-0 w-10 h-10 flex items-center justify-center focus:outline-none active:bg-gray-100 focus:bg-gray-200 rounded-full text-gray-500 z-50 p-3 m-1"
          v-show="query.length"
          @click="clearSearchBox"
        ><IconX /></button>
      </span>

      <ul class="flex flex-col border-t-4 border-gray-200 divide-y divide-gray-200" v-if="items.length">
        <router-link
          class="hover:bg-gray-100 cursor-pointer py-2 px-4"
          v-for="(item, index) in items"
          :key="index"
          :to="{
            path: '/names/' + item.id
          }"
          :inner-html.prop="item.name | lowerCaseIt | highlightText(query)"
        />
      </ul>
    </section>

    <section class="text-center text-gray-500 mt-4" v-if="!items.length">
      <p>{{query.length ? 'sonuç bulunamadı' : 'ya da'}}</p>

      <router-link
        class="inline-block leading-none text-primary active:bg-gray-200 rounded p-2 mt-2"
        to="/names"
      >TÜMÜNE GÖZAT</router-link>
    </section>
  </main>
</template>

<script>
import { mapState } from 'vuex'

import IconX from '../components/IconX.vue'

export default {
  name: 'Home',

  components: {
    IconX
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      document.title = vm.appName

      vm.clearSearchBox()
    })
  },

  data () {
    return {
      query: '',
      items: []
    }
  },

  computed: {
    ...mapState('app', {
      appName: 'name'
    })
  },

  methods: {
    quickSearch (query) {
      if (query.length) {
        this.$store.dispatch('api/quickSearch', query).then(response => {
          this.items = response
        })
      } else {
        this.items = []
      }
    },

    enterFirstItem () {
      if (this.items.length) {
        this.$router.push('names/' + this.items[0].id)
      }
    },

    clearSearchBox () {
      this.query = ''
      this.items = []

      document.querySelector('input').focus()
    }
  }
}
</script>
