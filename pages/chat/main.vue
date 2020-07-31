<template>
  <div class="wrapper">
    <dialog-list class="dialog-list"></dialog-list>
    <nuxt-child :key="$route.params.id"></nuxt-child>
  </div>
</template>

<script>
import DialogList from '~/components/dialogList'

export default {
  name: 'chatMain',
  components: {
    DialogList
  }
}
</script>

<style scoped>
  .wrapper {
    display: flex;
    height: 100%;
  }
  .dialog-list {
    width: 250px;
    flex: 0 0 auto;
  }
</style>
