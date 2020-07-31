<template>
  <v-app>
    <v-main>
      <nuxt></nuxt>
    </v-main>
    <v-footer
      :absolute="false"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
}
</script>

<style scoped>

</style>
