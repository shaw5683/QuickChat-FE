<template>
  <div class="dialog-list-wrapper">
    <div class="search-bar">
      <v-text-field
        hide-details
        clearable
        dense
        placeholder="搜索"
        v-model="keyword"
        prepend-icon="mdi-magnify"></v-text-field>
      <v-icon class="icon" color="success" @click="addDialog = true">mdi-plus-circle-outline</v-icon>
    </div>
    <v-list
      class="list-wrapper"
      height="540"
      dense
      three-line
      avatar
    >
      <v-list-item-group color="primary">
        <v-list-item
          :to="`/chat/main/${item.id}`"
          v-for="item in dialogList"
          :key="item.id"
        >
          <v-list-item-avatar>
            <avatar :name="item.dialogName" :src="item.avatar"></avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ item.dialogName }}</v-list-item-title>
            <v-list-item-subtitle>{{item.lastMsg.nickName}}: {{ item.lastMsg.message }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <add-dialog v-model="addDialog"></add-dialog>
  </div>
</template>

<script>
import Avatar from '~/components/avatar'
import AddDialog from '~/components/addDialog'
export default {
  name: 'dialogList',
  components: {
    Avatar,
    AddDialog
  },
  data () {
    return {
      addDialog: false,
      keyword: ''
    }
  },
  computed: {
    dialogList () {
      const list = this.$store.state.chat.dialogList
      if (!this.keyword) {
        return list
      }
      return list.filter(dialog => dialog.dialogName.includes(this.keyword))
    }
  },
  methods: {
    getDialog () {
      this.$store.dispatch('chat/getDialogList')
    }
  },
  mounted () {
    this.getDialog()
  }
}
</script>

<style lang="scss" scoped>
  .dialog-list-wrapper {
    border-right: 1px solid #333;
    height: 100%;
  }
  .search-bar {
    border-bottom: 1px solid #333;
    padding: 0 10px;
    height: 60px;
    display: flex;
    align-items: center;
    .icon {
      margin-left: 20px;
      cursor: pointer;
    }
    .v-input {
      margin-top: 0;
    }
  }
  .list-wrapper {
    overflow: auto;
  }
</style>
