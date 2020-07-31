export const getUserInfo = function (userName = '') {
  return this.$axios.post('/user/getUserInfo', {
    userName
  })
}

export const getDialog = function (id) {
  return this.$axios.post('/dialog/getDialog', {
    id
  })
}

export const addDialog = function (dialogName, member) {
  return this.$axios.post('/dialog/addDialog', {
    dialogName,
    member
  })
}
