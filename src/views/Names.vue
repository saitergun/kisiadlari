<template>
  <main class="container space-y-4">
    <section class="bg-white border rounded">
      <span class="block relative">
        <input
          type="text"
          class="w-full h-auto text-center text-xl placeholder-gray-500 bg-transparent focus:outline-none focus:shadow py-2 px-4"
          placeholder="ad ve anlam içinde ara"
          v-model="filter.query"
          @keyup.enter="$event.srcElement.blur(), filter.page = 1, updateRoute()"
        />

        <button
          class="absolute top-0 right-0 w-10 h-10 flex items-center justify-center focus:outline-none active:bg-gray-100 focus:bg-gray-200 rounded-full text-gray-500 z-50 p-3 m-1"
          v-show="filter.query.length"
          @click="filter.query = '', $event.target.previousElementSibling.focus(), updateRoute()"
        ><IconX /></button>
      </span>
    </section>

    <section class="bg-white shadow-sm rounded">
      <header class="flex items-center justify-center border-b border-gray-100 py-2 px-4">
        <span class="block font-semibold">köken</span>
      </header>

      <main class="grid grid-cols-3 sm:grid-cols-4 py-2 p-4">
        <label class="flex flex-col items-center justify-center cursor-pointer p-2" :for="origin.code" :key="origin.code" v-for="origin in origins">
          <input
            type="checkbox"
            class="cursor-pointer"
            :id="origin.code"
            :value="origin.id"
            :disabled="(!countItems && !filter.origins.includes(origin.id))"
            v-model="filter.origins"
            @change="updateRoute"
          />

          <small
            class="block select-none text-center lowercase mt-2"
            :class="{
              'font-semibold': origin.id === 1
            }"
          >{{ origin.nameLocale | lowerCaseIt }}</small>
        </label>
      </main>

      <footer class="border-t border-gray-100">
        <label
          class="flex items-center justify-center p-3"
          :class="{
            'cursor-pointer': filter.origins.length
          }"
          for="originsTypeExact"
        >
          <input
            type="checkbox"
            id="originsTypeExact"
            class="cursor-pointer"
            v-model="filter.originsTypeExact"
            :disabled="!filter.origins.length"
            @change="updateRoute"
          />

          <small class="block select-none text-center ml-2">kesin eşleşme</small>
        </label>
      </footer>
    </section>

    <section class="bg-white shadow-sm rounded">
      <header class="flex items-center justify-center border-b border-gray-100 py-2 px-4">
        <span class="block font-semibold">cinsiyet</span>
      </header>

      <main class="flex items-center justify-center py-2 p-4">
        <label
          class="flex flex-col items-center justify-center cursor-pointer p-2"
          :for="gender.id"
          :key="gender.id"
          v-for="gender in genders"
        >
          <input
            type="checkbox"
            :id="gender.id"
            class="cursor-pointer"
            :value="gender.id"
            v-model="filter.genders"
            :disabled="(!countItems && !filter.genders.includes(gender.id)) || (filter.genders.length > 1 && !filter.genders.includes(gender.id))"
            @change="updateRoute"
          />

          <small class="block select-none text-center lowercase mt-2">{{ gender.nameLocale | lowerCaseIt }}</small>
        </label>
      </main>
    </section>

    <section class="mt-3" v-if="items.length">
      <FilterItem
        :item="item"
        :highlightText="filter.query"
        :isFirstItem="!index"
        :key="index"
        v-for="(item, index) in items"
      />
    </section>

    <section class="text-center py-2 mt-3">
      <p v-if="itemsLoading && !items.length">ölçütlere uygun ad aranıyor</p>
      <p v-if="itemsLoading && items.length">daha fazla ad yükleniyor</p>

      <p v-if="!itemsLoading && !items.length">aradığın ölçütlere uygun ad bulunamadı</p>

      <p v-if="!itemsLoading && countItems && !pagination.hasNextPage">{{ countItems }} adın tümü gösteriliyor</p>

      <p v-if="!itemsLoading && countItems && pagination.hasNextPage">{{ items.length }}/{{ countItems }} ad gösteriliyor</p>

      <p class="flex justify-center mt-3" v-if="!itemsLoading && countItems && pagination.hasNextPage">
        <button
          class="bg-primary active:bg-primary-600 text-white rounded py-1 px-4"
          @click="getMoreItems"
        >DAHA FAZLA</button>
      </p>
    </section>
  </main>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import FilterItem from '@/components/FilterItem.vue'
import IconX from '../components/IconX.vue'

export default {
  name: 'Names',

  components: {
    FilterItem,
    IconX
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      document.title = 'süzgeç · ' + vm.appName
    })
  },

  beforeRouteUpdate (to, from, next) {
    next(vm => {
      document.title = 'süzgeç · ' + vm.appName
    })
  },

  beforeRouteLeave (to, from, next) {
    next()
  },

  data () {
    return {
      filter: {
        query: '',
        originsTypeExact: false,
        origins: [],
        genders: [],
        page: 1
      },

      itemsLoading: true,
      items: [],

      countItems: 0,

      pagination: {}
    }
  },

  computed: {
    ...mapGetters('app', [
      'appName'
    ]),

    ...mapState('data', [
      'origins',
      'genders'
    ])
  },

  methods: {
    getItems () {
      this.itemsLoading = true

      this.$nextTick(() => {
        this.$store.dispatch('api/filter', this.filter).then(response => {
          this.countItems = response.countItems
          this.items = response.items
          this.pagination = response.pagination
          this.itemsLoading = false
        })
      })
    },

    getMoreItems () {
      this.itemsLoading = true
      this.filter.page = this.filter.page + 1

      this.$nextTick(() => {
        this.$store.dispatch('api/filter', this.filter).then(response => {
          this.items.push(...response.items)
          this.pagination = response.pagination
          this.itemsLoading = false
        })
      })
    },

    updateRoute () {
      let query = {}

      if (this.filter.query !== '') {
        query.q = this.filter.query
      }

      if (this.filter.originsTypeExact) {
        query.ot = this.filter.originsTypeExact
      }

      if (this.filter.origins.length) {
        query.o = JSON.stringify(this.filter.origins)
      }

      if (this.filter.genders.length) {
        query.g = JSON.stringify(this.filter.genders)
      }

      this.$router.replace({
        path: '/names',
        query: query
      })
    }
  },

  created () {
    if (this.$router.currentRoute.query.q !== undefined) {
      this.filter.query = this.$router.currentRoute.query.q
    }

    if (this.$router.currentRoute.query.ot !== undefined) {
      this.filter.originsTypeExact = this.$router.currentRoute.query.ot
    }

    if (this.$router.currentRoute.query.o !== undefined) {
      this.filter.origins = JSON.parse(this.$router.currentRoute.query.o)
    }

    if (this.$router.currentRoute.query.g !== undefined) {
      this.filter.genders = JSON.parse(this.$router.currentRoute.query.g)
    }

    if (this.$router.currentRoute.query.p !== undefined) {
      this.filter.page = this.$router.currentRoute.query.p
    }

    this.getItems()
  },

  mounted () {
    // window.onscroll = () => {
    //   if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
    //     if (!this.itemsLoading) {
    //       this.getMoreItems()
    //     }
    //   }
    // }
  }
}
</script>
