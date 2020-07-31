<template>
  <div class="dialog-wrapper">
    <chat-title :dialog="dialog"></chat-title>
    <chat-content :dialog="dialog" :msg-list="msgList" @send-msg="sendMsg"></chat-content>
    <chat-editor :dialog="dialog"></chat-editor>
  </div>
</template>

<script>
import ChatTitle from '~/components/chatTitle'
import ChatContent from '~/components/chatContent'
import ChatEditor from '~/components/chatEditor'
import { getDialog } from '../../../api'

export default {
  name: 'chatMainDialog',
  components: {
    ChatTitle,
    ChatContent,
    ChatEditor
  },
  data () {
    return {
      dialog: {},
      msgList: []
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.user.userInfo
    },
    dialogId () {
      return this.$route.params.id
    }
  },
  sockets: {
    initMessage (data) {
      this.msgList = data
    },
    onMessage (data) {
      if (data.userId === this.userInfo.userId) {
        const exist = this.msgList.find(m => m.uuid === data.uuid)
        if (exist) {
          exist.pending = false
        }
      } else {
        this.msgList.push(data)
      }
    }
  },
  mounted () {
    getDialog.call(this, this.dialogId).then(res => {
      this.dialog = res.data.dialogArr[0]
    })
    this.joinRoom()
  },
  methods: {
    joinRoom () {
      this.$socket.client.emit('joinRoom', this.dialogId)
    },
    sendMsg (msg) {
      this.msgList.push({
        ...msg,
        nickName: this.userInfo.nickName
      })
    }
  }
}
</script>

<style lang="scss">
  .dialog-wrapper {
    height: 100%;
    width: 100%;
  }
</style>
