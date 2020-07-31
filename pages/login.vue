<template>
  <section>
    <h3>登录</h3>
    <v-form ref="form" class="form">
      <v-text-field
        v-model="form.userName"
        label="用户名"
        :rules="rules.userName"
      ></v-text-field>
      <v-text-field
        v-model="form.password"
        type="password"
        label="密码"
        :rules="rules.userName"
      ></v-text-field>
      <div class="btn-group">
        <v-btn
          outlined
          large
          color="purple"
          @click="submit">
          登录
        </v-btn>
      </div>
    </v-form>
  </section>
</template>

<script>
export default {
  name: 'login',
  layout: 'empty',
  data () {
    return {
      form: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          v => !!v.length || '请输入用户名'
        ],
        password: [
          v => !!v.length || '请输入密码'
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
      this.$axios.post('/user/login', this.form).then(res => {
        if (res.code === 0) {
          this.$alert({
            type: 'success',
            message: '登录成功'
          })
          if (this.$route.query.url) {
            location.replace(this.$route.query.url)
          } else {
            location.replace('/chat/main')
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" src="./signIn.scss"></style>

