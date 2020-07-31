<template>
  <section>
    <h3>注册</h3>
    <v-form ref="form" class="form">
      <v-text-field
        v-model="form.userName"
        :counter="20"
        :rules="rules.userName"
        label="用户名"
      ></v-text-field>
      <v-text-field
        v-model="form.nickName"
        :counter="15"
        :rules="rules.nickName"
        label="昵称"
      ></v-text-field>
      <v-text-field
        v-model="form.password"
        :counter="20"
        type="password"
        :rules="rules.password"
        label="密码"
      ></v-text-field>
      <v-text-field
        v-model="form.rePassword"
        :counter="20"
        type="password"
        :rules="rules.rePassword"
        label="再次输入密码"
      ></v-text-field>
      <div class="btn-group">
        <v-btn
          outlined
          large
          color="purple"
          @click="submit">
          注册
        </v-btn>
      </div>
    </v-form>
  </section>
</template>

<script>
export default {
  name: 'signIn',
  layout: 'empty',
  data () {
    return {
      form: {
        userName: '',
        nickName: '',
        password: '',
        rePassword: ''
      },
      rules: {
        userName: [
          v => (v.length >= 8 && v.length <= 20) || '用户名长度为8到20位之间'
        ],
        nickName: [
          v => (v.length >= 1 && v.length <= 20) || '用户名长度为1到15位之间'
        ],
        password: [
          v => (v.length >= 8 && v.length <= 20) || '用户名长度为8到20位之间'
        ],
        rePassword: [
          v => (v === this.form.password) || '两次输入密码需保持一致'
        ]
      }
    }
  },
  methods: {
    validate () {
      return this.$refs.form.validate()
    },
    submit () {
      if (!this.validate()) {
        return
      }
      this.$axios.post('/user/signIn', this.form).then(res => {
        if (res.code === 0) {
          this.$alert({
            type: 'success',
            message: '注册成功'
          })
          location.href = '/login'
        }
      })
    }
  }
}
</script>

<style lang="scss" src="./signIn.scss"></style>
