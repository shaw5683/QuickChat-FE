<template>
  <div ref="scrollContent" class="chat-content">
    <template v-for="msg in msgList">
      <div class="msg system-msg" v-if="msg.type === 'system'" :key="msg.uuid">
        <div class="msg-content">{{ msg.message }}</div>
      </div>
      <template v-if="msg.type === 'text'">
        <div class="msg user-msg" :class="{ 'is-mine': !msg.userId || msg.userId === userInfo.userId }" :key="msg.uuid">
          <avatar :src="msg.avatar" :name="msg.nickName"></avatar>
          <div class="content">
            <div class="name">{{ msg.nickName }}</div>
            <div class="msg-content-wrapper">
              <div class="msg-content" @click="previewImg" v-html="msg.message"></div>
              <div class="mask" v-if="msg.pending">
                <v-icon class="icon">mdi-loading</v-icon>
              </div>
            </div>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import Avatar from '~/components/avatar'

export default {
  name: 'chatContent',
  components: {
    Avatar
  },
  props: {
    msgList: Array
  },
  computed: {
    userInfo () {
      return this.$store.state.user.userInfo
    }
  },
  watch: {
    msgList: {
      handler () {
        this.$nextTick(() => {
          this.$nextTick(() => {
            if (typeof window !== 'undefined') {
              const el = this.$refs.scrollContent
              el.scrollTop = el.scrollHeight
            }
          })
        })
      },
      immediate: true
    }
  },
  methods: {
    previewImg (event) {
      const el = event.target
      if (el.tagName.toLowerCase() === 'img') {
        const copy = el.cloneNode()
        copy.className = 'preview-img'
        const wrapper = document.createElement('div')
        wrapper.className = 'preview-img-wrapper'
        wrapper.appendChild(copy)
        document.body.appendChild(wrapper)
        wrapper.addEventListener('click', () => {
          document.body.removeChild(wrapper)
        })
      }
    }
  }
}
</script>

<style lang="scss">
  .chat-content {
    p {
      margin: 0;
    }
    img {
      max-height: 200px;
    }
  }
  .preview-img-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 80vh;
    &::after {
      color: #fff;
      content: 'X';
      position: absolute;
      right: -20px;
      top: -20px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 15px;
      height: 15px;
      border: 1px solid #fff;
      border-radius: 50%;
      cursor: pointer;
    }
  }
</style>

<style lang="scss" scoped>
  .chat-content {
    height: 400px;
    border-bottom: 1px solid #333;
    padding: 0 20px 20px;
    overflow: auto;
  }
  .msg {
    margin-top: 15px;
    &.system-msg {
      font-size: 12px;
      display: flex;
      color: #fff;
      justify-content: center;
      .msg-content {
        background-color: rgba(255,255,255,.1);
        padding: 3px 5px;
        border-radius: 2px;
      }
    }
    &.user-msg {
      display: flex;
      .content {
        margin: 0 20px;
        max-width: 260px;
        .name {
          font-size: 12px;
          color: #666;
        }
        .msg-content-wrapper {
          position: relative;
          .mask {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255,255,255,.1);
            display: flex;
            justify-content: center;
            align-items: center;
            .icon {
              color: yellow;
              animation: spin 1s linear infinite;
            }
          }
        }
        .msg-content {
          font-size: 14px;
          background-color: rgba(255,255,255,.3);
          padding: 10px;
          border-radius: 3px;
        }
      }
      &.is-mine {
        flex-direction: row-reverse;
        .content {
          .name {
            display: none;
          }
          .msg-content {
            background-color: purple;
          }
        }
      }
    }
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
