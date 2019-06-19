<template>
  <main class="container p-3">
    <section class="bg-white shadow-sm rounded">
      <header class="px-3 py-2">
        <h1 class="m-0 line-height-1">sayfa bulunamadı</h1>
      </header>

      <main class="border-top border-light px-3 py-2">
        <p class="m-0">böyle bir sayfa yok. daha önce de hiç olmadı.</p>
      </main>
    </section>
  </main>
</template>

<script>
export default {
  name: 'NotFound',

  created () {
    document.title = 'sayfa bulunamadı · ' + this.$store.state.app.name
  }
}
</script>
