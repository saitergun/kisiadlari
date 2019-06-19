<template>
  <main class="container p-3">
    <section class="bg-white shadow-sm rounded-lg border border-white">
      <span class="d-block position-relative">
        <input type="text" class="form-control form-control-lg rounded-lg placeholder-light py-2 px-4 h-auto border-0 text-center shadow-none" placeholder="ad ve anlam içinde ara" v-model="filter.query" @keyup.enter="$event.srcElement.blur(), filter.page = 1, updateRoute()" />

        <button class="close font-weight-normal" style="position: absolute; top: 0; bottom: 0; right: 0; width: 3rem;" v-show="filter.query.length" @click="filter.query = '', $event.target.previousElementSibling.focus(), updateRoute() ">&times;</button>
      </span>
    </section>

    <section class="bg-white shadow-sm rounded-lg mt-3">
      <header class="d-flex align-items-center justify-content-center border-bottom border-light m-0 py-2 px-3">
        <span class="d-block font-weight-bolder line-height-1 m-0">köken</span>
      </header>

      <main class="row no-gutters p-2">
        <span class="col-4 col-sm-3" :key="origin.code" v-for="origin in origins">
          <label class="d-flex justify-content-center cursor-pointer m-0 p-2" :for="origin.code">
            <span>
              <span class="custom-control custom-checkbox custom-control-textless custom-control-circle">
                <input type="checkbox" :id="origin.code" class="custom-control-input" :value="origin.id" v-model="filter.origins" :disabled="(!countItems && !filter.origins.includes(origin.id))" @change="updateRoute" />
                <label class="custom-control-label" :for="origin.code" />
              </span>

              <small class="d-block user-select-none text-center line-height-1 mt-2" :class="{ 'font-weight-bolder': origin.id === 1 }">{{ origin.nameLocale | lowerCaseIt }}</small>
            </span>
          </label>
        </span>
      </main>

      <footer class="row no-gutters border-top border-light">
        <span class="col-12">
          <label class="d-flex align-items-center justify-content-center mx-4 m-0 p-3" :class="{ 'cursor-pointer': filter.origins.length }" for="originsTypeExact">

            <span class="custom-control custom-switch custom-control-textless custom-control-circle">
              <input type="checkbox" id="originsTypeExact" class="custom-control-input" v-model="filter.originsTypeExact" :disabled="!filter.origins.length" @change="updateRoute" />
              <label class="custom-control-label" :class="{ 'cursor-default': !filter.origins.length }" />
            </span>

            <small class="d-block user-select-none text-center line-height-1 ml-2">kesin eşleşme</small>
          </label>
        </span>
      </footer>
    </section>

    <section class="bg-white shadow-sm rounded-lg mt-3">
      <header class="d-flex align-items-center justify-content-center border-bottom border-light m-0 py-2 px-3">
        <span class="d-block font-weight-bolder line-height-1 m-0">cinsiyet</span>
      </header>

      <main class="d-flex align-items-center justify-content-center p-2">
        <label class="d-flex justify-content-center cursor-pointer m-0 p-2" :for="gender.id" :key="gender.id" v-for="gender in genders">
          <span>
            <span class="custom-control custom-checkbox custom-control-textless custom-control-circle">
              <input type="checkbox" :id="gender.id" class="custom-control-input" :value="gender.id" v-model="filter.genders" :disabled="(!countItems && !filter.genders.includes(gender.id)) || (filter.genders.length > 1 && !filter.genders.includes(gender.id))" @change="updateRoute" />
              <label class="custom-control-label" :for="gender.id" />
            </span>

            <small class="d-block user-select-none text-center line-height-1 mt-2">{{ gender.nameLocale | lowerCaseIt }}</small>
          </span>
        </label>
      </main>
    </section>

    <section class="mt-3" v-if="items.length">
      <FilterItem :item="item" :highlightText="filter.query" :isFirstItem="!index" :key="index" v-for="(item, index) in items" />
    </section>

    <section class="mt-3">
      <main class="py-2 px-3">
        <p class="text-center line-height-1 m-0" v-if="itemsLoading && !items.length">ölçütlere uygun ad aranıyor</p>
        <p class="text-center line-height-1 m-0" v-if="itemsLoading && items.length">daha fazla ad yükleniyor</p>

        <p class="text-center line-height-1 m-0" v-if="!itemsLoading && !items.length">aradığın ölçütlere uygun ad bulunamadı</p>

        <p class="text-center line-height-1 m-0" v-if="!itemsLoading && countItems && !pagination.hasNextPage">{{ countItems }} adın tümü gösteriliyor</p>

        <p class="text-center line-height-1 m-0" v-if="!itemsLoading && countItems && pagination.hasNextPage">{{ items.length }}/{{ countItems }} ad gösteriliyor</p>

        <div class="d-flex justify-content-center mt-3" v-if="!itemsLoading && countItems && pagination.hasNextPage">
          <span class="btn btn-primary rounded-lg shadow-none cursor-pointer line-height-1" @click="getMoreItems">daha fazla</span>
        </div>
      </main>
    </section>
  </main>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import FilterItem from '@/components/FilterItem'

export default {
  name: 'Names',

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

  components: {
    FilterItem
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
