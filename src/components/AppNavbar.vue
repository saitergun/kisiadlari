<template>
  <nav class="sticky left-0 top-0 right-0 w-full h-12 flex items-center justify-center bg-primary shadow z-40">
    <span class="flex items-center justify-center relative w-full h-12 max-w-md sm:px-4">
      <button
        class="absolute left-0 top-0 w-10 h-10 flex items-center justify-center active:bg-primary-600 text-white rounded-full focus:outline-none p-2 mt-1 ml-1"
        @click="$router.back()"
        v-if="showBackButton"
      >
        <IconArrowLeft />
      </button>

      <h1
        class="block text-center text-xl text-white select-none p-2"
        :title="title"
      >{{ title }}</h1>
    </span>
  </nav>
</template>

<script>
import IconArrowLeft from './IconArrowLeft'

export default {
  name: 'AppNavbar',

  components: {
    IconArrowLeft
  },

  props: {
    title: {
      type: String,
      default: () => null,
      required: true
    },

    showBackButton: {
      type: Boolean,
      default: () => false
    },
  }
}
</script>
