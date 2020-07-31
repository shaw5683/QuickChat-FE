export default {
  state () {
    return {
      dialogList: []
    }
  },
  mutations: {
    setDialogList (state, dialogList) {
      state.dialogList = dialogList.sort((a, b) => (new Date(b.updateTime) - (new Date(a.updateTime))))
    },
    updateDialogList (state, payload) {

    },
    addDialog (state, dialogList) {
      state.dialogList.unshift(dialogList[0])
    }
  },
  actions: {
    getDialogList ({ commit }) {
      this.$axios.post('/dialog/getDialog').then(res => {
        commit('setDialogList', res.data.dialogArr)
      })
    }
  }
}
