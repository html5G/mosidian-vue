export default {
  namespaced: true,
  state: {
    id: 0,
    name: '',
    userFlag: null
  },
  mutations: {
    updateId (state, id) {
      state.id = id
    },
    updateName (state, name) {
      state.name = name
    },
    updateUserFlag (state, userFlag) {
      state.userFlag = userFlag
    }
  }
}
