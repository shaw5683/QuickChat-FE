<template>
  <v-dialog
    :value="value"
    @input="close"
    max-width="400"
  >
    <v-card>
      <v-card-title class="headline">创建聊天</v-card-title>

      <v-card-actions>
        <v-form ref="form" class="form">
          <v-row>
            <v-text-field
              v-model="form.dialogName"
              label="聊天名称"
              :rules="rules.dialogName"
            ></v-text-field>
          </v-row>
          <v-row align="center">
            <v-text-field
              v-model="form.userName"
              label="输入用户名查找"
            ></v-text-field>

            <v-btn
              outlined
              small
              color="blue"
              @click="search">
              查找
            </v-btn>
          </v-row>
        </v-form>
      </v-card-actions>

      <v-card-subtitle>搜索结果</v-card-subtitle>

      <v-card-actions v-if="result.userName">
        <v-row align="center" dense justify="center">
          <v-col cols="2">
            <avatar :name="result.nickName" :src="result.avatar"></avatar>
          </v-col>
          <v-col cols="2">
            <span>{{ result.userName }}</span>
          </v-col>
          <v-col cols="2">
            <span>{{ result.nickName }}</span>
          </v-col>
          <v-col cols="2">
            <v-btn x-small @click="add">+</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>

      <v-card-subtitle>已添加用户列表</v-card-subtitle>

      <v-card-actions>
        <v-row>
          <v-col cols="12">
            <v-row
              v-for="(user, index) in userList"
              :key="user.userId"
              align="center"
              dense
              justify="center">
              <v-col cols="2">
                <avatar :name="user.nickName" :src="user.avatar"></avatar>
              </v-col>
              <v-col cols="2">
                <span>{{ user.userName }}</span>
              </v-col>
              <v-col cols="2">
                <span>{{ user.nickName }}</span>
              </v-col>
              <v-col cols="2">
                <v-btn x-small @click="remove(index)">-</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-actions>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="green darken-1"
          text
          @click="close"
        >
          取消
        </v-btn>

        <v-btn
          color="green darken-1"
          text
          @click="submit"
        >
          创建
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Avatar from '~/components/avatar'
import { addDialog, getUserInfo } from '../api'

export default {
  name: 'addDialog',
  components: {
    Avatar
  },
  props: {
    value: Boolean
  },
  data () {
    return {
      result: {},
      userList: [],
      form: {
        dialogName: '',
        userName: ''
      },
      rules: {
        dialogName: [
          v => (v.length >= 1 && v.length <= 20) || '用户名长度为1到15位之间'
        ]
      }
    }
  },
  methods: {
    clear () {
      this.$refs.form.resetValidation()
      this.form.userName = ''
      this.form.dialogName = ''
      this.result = {}
      this.userList = []
    },
    close () {
      this.clear()
      this.$emit('input', false)
    },
    search () {
      getUserInfo.call(this, this.form.userName).then(res => {
        this.result = res.data
      })
    },
    add () {
      if (this.userList.every(user => user.userId !== this.result.userId)) {
        this.userList.push(this.result)
      }
    },
    remove (index) {
      this.userList.splice(index, 1)
    },
    submit () {
      if (!this.$refs.form.validate()) {
        return
      }
      addDialog.call(this, this.form.dialogName, this.userList.map(user => user.userId)).then(res => {
        this.$alert({
          type: 'success',
          message: '创建成功'
        })
        this.close()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .form {
    margin: 0 auto;
  }
</style>
