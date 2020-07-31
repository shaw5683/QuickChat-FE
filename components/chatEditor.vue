<template>
  <div class="chat-editor">
    <editor
      v-if="showEditor"
      :key="$route.params.id"
      v-model="message"
      api-key="iqcw6i3wpzw05t2bp0gdrda0zrcvmcinmve53d9pk51p9q3c"
      :init="initOptions"
    />
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'chatEditor',
  components: {
    Editor
  },
  props: {
    dialog: Object
  },
  data () {
    return {
      showEditor: true,
      message: '',
      initOptions: {
        height: 140,
        menubar: false,
        plugins: [
          'autolink',
          'paste'
        ],
        paste_as_text: true,
        paste_data_images: true,
        toolbar: false,
        statusbar: false,
        object_resizing: false,
        placeholder: 'Chat here',
        content_style: 'img { max-height: 40px; } p { color: #fff; line-height: 19px; margin: 0; font-size: 13px; }',
        setup: ed => {
          ed.on('keydown', e => {
            if (!e.ctrlKey && e.keyCode === 13) {
              e.preventDefault()
              this.submit()
            }
          })
        }
      }
    }
  },
  methods: {
    submit () {
      const msg = {
        type: 'text',
        message: this.message,
        uuid: uuidv4(),
        dialogId: this.dialog.id
      }
      this.$socket.client.emit('sendMsg', msg)
      this.$emit('sendMsg', msg)
      this.message = ''
    }
  }
}
</script>

<style lang="scss">
  .chat-editor {
    height: 140px;
    & > textarea {
      visibility: hidden;
    }
    .tox {
      border-color: transparent;
      .tox-edit-area__iframe {
        background-color: transparent;
      }
    }
  }
</style>
