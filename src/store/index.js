import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import api from '@/api'
import router from '@/router'

export default createStore({
  state: {
    token: '',
    userInfo: {},
    config: {},
    currGame: {},
  },
  mutations: {
    setToken(state, val) {
      state.token = val
    },
    setUserInfo(state, val) {
      state.userInfo = val
    },
    setConfig(state, val) {
      state.config = val
    },
    setCurrGame(state, val) {
      state.currGame = val
    },
  },
  actions: {
    updateUser({ commit }) {
      api.userConfig().then(res => {
        // setCookie('token', res.userinfo.token, 30)
        // setCookie('uid', res.userinfo.id, 30)
        commit('setUserInfo', res.welcome)
      })
    },
  },
  plugins: [createPersistedState()]
})
