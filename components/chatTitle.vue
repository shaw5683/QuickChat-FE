<template>
  <div class="chat-title">
    <div class="title">{{ dialog.dialogName }}</div>
  </div>
</template>

<script>
export default {
  name: 'chatTitle',
  props: {
    dialog: Object
  }
}
</script>

<style lang="scss" scoped>
  .chat-title {
    height: 60px;
    border-bottom: 1px solid #333;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }
</style>
