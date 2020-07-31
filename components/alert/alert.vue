<template>
  <v-alert
    :class="{ show: visible }"
    class="alert"
    outlined
    dense
    :color="type">
    <span class="msg">{{ message }}</span>
  </v-alert>
</template>

<script>
export default {
  name: 'alert',
  data () {
    return {
      visible: false
    }
  },
  props: {
    type: {
      type: String,
      default: 'success'
    },
    message: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 3000
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    show (val) {
      if (!val) {
        this.visible = false
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.visible = true
    })
    window.setTimeout(() => {
      this.$emit('close')
    }, this.duration)
  }
}
</script>

<style lang="scss">
  .alert {
    opacity: 0;
    position: fixed;
    left: 50%;
    top: 10vh;
    transform: translateX(-50%);
    transition: opacity .5s;
    z-index: 9999;
  }
  .show {
    opacity: .8;
  }

  .msg {
    /*color: #fff;*/
  }
</style>
