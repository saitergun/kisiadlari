<template>
  <main class="container p-3">
    <section class="bg-white shadow-sm rounded-lg border">
      <span class="d-block position-relative">
        <input type="text" class="form-control form-control-lg rounded-lg placeholder-light py-2 px-4 h-auto border-0 text-center shadow-none" :class="{ 'rounded-lg': !items.length, 'rounded-top rounded-bottom-0': items.length, 'pr-5': query.length }" placeholder="hızlı ad ara" v-model="query" @input="quickSearch(query)" @keyup.enter="enterFirstItem" />

        <button class="close font-weight-normal" style="position: absolute; top: 0; right: 0; width: 3rem; height: 100%" v-show="query.length" @click="clearSearchBox">&times;</button>
      </span>

      <ul class="list-group list-group-flush" v-if="items.length">
        <router-link class="list-group-item list-group-item-action py-2 cursor-pointer" :class="{ 'rounded-bottom': items.length === index + 1 }" v-for="(item, index) in items" :key="index" :to="{ path: '/names/' + item.id }" :inner-html.prop="item.name | lowerCaseIt | highlightText(query)" />
      </ul>
    </section>

    <section class="text-center text-black-50 mt-3" v-if="!items.length">
      <div>
        <p class="m-0" v-if="query.length">sonuç bulunamadı</p>
        <p class="m-0" v-else>ya da</p>
      </div>

      <div class="mt-3">
        <router-link class="text-decoration-none" to="/names">tümüne gözat</router-link>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',

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
    ...mapGetters('app', [
      'appName'
    ])
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
