import { getUserInfo } from '~/api'

export default {
  state () {
    return {
      userInfo: {}
    }
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    getUserInfo ({ commit }) {
      return getUserInfo.call(this).then(res => {
        commit('setUserInfo', res.data)
      })
    }
  }
}
