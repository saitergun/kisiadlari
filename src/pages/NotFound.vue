<template>
  <main class="container mx-auto">
    <section class="bg-white shadow-sm rounded">
      <header class="py-2 px-4">
        <h1 class="text-4xl">sayfa bulunamadı</h1>
      </header>

      <main class="py-3 px-4">
        <p>böyle bir sayfa yok. daha önce de hiç olmadı.</p>
      </main>
    </section>
  </main>
</template>

<script>
export default {
  name: 'NotFound',

  created () {
    document.title = `sayfa bulunamadı · ${this.$store.state.app.name}`
    this.$store.commit('app/setTitle', 'sayfa bulunamadı')
  }
}
</script>
