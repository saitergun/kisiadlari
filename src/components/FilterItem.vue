<template>
  <span>
    <span class="d-block bg-white shadow-sm rounded-lg" :class="{ 'mt-3': !isFirstItem }" v-if="item">
      <span class="d-flex align-items-center justify-content-between px-3 py-2">
        <router-link class="d-flex align-items-center text-decoration-none" :to="{ path: '/names/' + item.id }">
          <h3 class="d-flex align-items-center justify-content-start m-0" :class="['text-' + item.gender.name.toLowerCase()]">
            <span class="m-0 h4" :inner-html.prop="item.name | upperCaseIt | highlightText(highlightText)" />
          </h3>
        </router-link>

        <span class="d-flex align-items-center justify-content-between" v-if="item.origins">
          <img class="rounded-circle img-thumbnail border-light" :src="origin.flag.square" style="width: 1.75rem; height: 1.75rem" :class="{ 'ml-n2': index > 0 }" :key="index" v-for="(origin, index) in item.origins" :title="origin.nameLocale | lowerCaseIt" />
        </span>
      </span>

      <ul class="list-group list-group-flush" v-if="item.significations">
        <li class="list-group-item bg-transparent py-1 px-3 border-bottom border-light" :class="{ 'border-bottom-0': (index + 1 === item.significations.length) }" v-show="showAllSignifications || item.significations.length < 3 || (index < 1 && item.significations.length > 2)" v-for="(signification, index) in item.significations" :key="index" :inner-html.prop="signification | lowerCaseIt | highlightText(highlightText)" />

        <li class="list-group-item bg-transparent py-2 px-3 border-bottom-0 border-light text-center line-height-1 text-uppercase cursor-pointer" :class="['text-' + item.gender.name.toLowerCase()]" v-show="!showAllSignifications && item.significations.length > 2" @click="showAllSignifications = true">
          <small class="d-block">+{{ item.significations.length - 1 }} anlam daha</small>
        </li>
      </ul>
    </span>
  </span>
</template>

<script>
export default {
  name: 'FilterItem',

  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      },
      required: true
    },

    isFirstItem: {
      type: Boolean,
      default: () => {
        return false
      },
      required: false
    },

    highlightText: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      showAllSignifications: false
    }
  }
}
</script>
