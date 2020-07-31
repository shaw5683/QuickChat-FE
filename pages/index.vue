<template>
  <section>
    <div class="btn-group">
      <v-btn
        outlined
        x-large
        color="blue"
        @click="to('/login')">
        登录
      </v-btn>
      <v-btn
        outlined
        x-large
        color="teal"
        @click="to('signIn')">
        注册
      </v-btn>
    </div>
  </section>
</template>

<script>

export default {
  layout: 'empty',
  methods: {
    to (url) {
      window.location.href = url
    }
  }
}
</script>

<style lang="scss" src="./index.scss"></style>
