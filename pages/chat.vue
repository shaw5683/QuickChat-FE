<template>
  <v-card height="600" width="900">
    <nav-bar></nav-bar>
    <div class="chat-container">
      <nuxt-child></nuxt-child>
    </div>
  </v-card>
</template>

<script>
import NavBar from '~/components/navBar'
export default {
  fetch ({ store }) {
    return store.dispatch('user/getUserInfo')
  },
  name: 'chat',
  components: {
    NavBar
  },
  sockets: {
    dialogUpdate (data) {
      console.log(data)
      this.$store.commit('chat/dialogUpdate', data)
    },
    dialogAdd (data) {
      this.$store.commit('chat/addDialog', data)
    }
  }
}
</script>

<style>
  .chat-container {
    padding-left: 56px;
    height: 100%;
  }
</style>
