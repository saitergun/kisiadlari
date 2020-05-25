<template>
  <section
    class="bg-white shadow-sm rounded"
    :class="{
      'mt-3': !isFirstItem
    }"
    v-if="item"
  >
    <header class="flex items-center justify-between py-2 px-4">
      <router-link
        class="flex items-center"
        :to="{
          path: '/names/' + item.id
        }"
      >
        <h3
          class="flex items-center justify-start cursor-pointer text-2xl"
          :class="{
            'text-female': item.gender.name === 'female',
            'text-male': item.gender.name === 'male',
            'text-unisex': item.gender.name === 'unisex',
          }"
          :inner-html.prop="item.name | upperCaseIt | highlightText(highlightText)"
        />
      </router-link>

      <span class="flex items-center" v-if="item.origins">
        <img
          class="w-6 h-6 rounded-full border-2 border-white"
          :src="origin.flag.square"
          :class="{
            '-ml-2': index,
            'relative': origin.id === 1
          }"
          :key="index"
          v-for="(origin, index) in item.origins"
          :title="origin.nameLocale | lowerCaseIt"
        />
      </span>
    </header>

    <main>
      <ul class="flex flex-col divide-y divide-gray-100" v-if="item.significations">
        <li
          class="block py-2 px-4"
          :class="{
            'border-bottom-0': (index + 1 === item.significations.length)
          }"
          v-show="showAllSignifications || item.significations.length < 3 || (index < 1 && item.significations.length > 2)"
          v-for="(signification, index) in item.significations"
          :key="index"
          :inner-html.prop="signification | lowerCaseIt | highlightText(highlightText)"
        />
      </ul>
    </main>

    <footer>
      <button
        class="block w-full border-t border-gray-100 text-center cursor-pointer py-2 px-4"
        :class="{
          'text-female': item.gender.name === 'female',
          'text-male': item.gender.name === 'male',
          'text-unisex': item.gender.name === 'unisex',
        }"
        v-show="!showAllSignifications && item.significations.length > 2"
        @click="showAllSignifications = true"
      >{{ item.significations.length - 1 }} anlam daha</button>
    </footer>
  </section>
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
