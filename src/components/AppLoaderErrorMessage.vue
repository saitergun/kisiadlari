<template>
  <span class="fixed w-screen h-screen flex items-center justify-center">
    <span class="text-center text-red-600 p-4">
      <span class="w-12 h-12 flex items-center justify-center bg-red-500 text-white leading-none text-4xl rounded-full m-auto">!</span>

      <span class="block mt-5">{{ message }}</span>
    </span>
  </span>
</template>

<script>
export default {
  name: 'AppLoaderErrorMessage',

  props: {
    message: {
      type: String,
      default: 'Beklenmeyen bir hata oluştu',
      required: true
    }
  }
}
</script>
