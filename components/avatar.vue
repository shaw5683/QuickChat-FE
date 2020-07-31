<template>
  <div class="avatar-wrapper" :style="{ width: size + 'px', height: size + 'px' }">
    <img v-if="src" :src="src" alt="avatar">
    <span v-else>{{ name[0] || '' }}</span>
  </div>
</template>

<script>
export default {
  name: 'avatar',
  props: {
    src: String,
    name: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 40
    }
  }
}
</script>

<style scoped>
  .avatar-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 50%;
    color: blue;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
