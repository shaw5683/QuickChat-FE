<template>
  <v-navigation-drawer
    class="nav-bar"
    :mini-variant="true"
    :permanent="true"
    absolute
    dark
  >
    <v-list
      dense
      nav
      class="py-0"
    >
      <v-list-item two-line class="px-0">
        <v-list-item-avatar>
          <avatar :src="userInfo.avatar" :name="userInfo.nickName"></avatar>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Application</v-list-item-title>
          <v-list-item-subtitle>Subtext</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        :to="item.url"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Avatar from '~/components/avatar'

export default {
  name: 'navBar',
  components: {
    Avatar
  },
  data () {
    return {
      items: [
        { title: 'Chat', icon: 'mdi-chat-outline', activeIcon: 'mdi-chat', url: '/chat/main' },
        // { title: 'Photos', icon: 'mdi-image', url: '/chat/setting' },
        // { title: 'About', icon: 'mdi-help-box' },
      ]
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.user.userInfo
    }
  }
}
</script>

<style scoped>
  .nav-bar {
    background-image: linear-gradient(0deg, #2af598 0%, #009efd 100%);
  }
</style>
