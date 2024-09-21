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
    types: [],
    typeMap: {
      9: '单式投注',
      10: '第1个号码',
      11: '球的颜色', // 球的颜色(一个或者多个)
      12: '奇数和偶数', // 奇数和偶数(一个或者多个)
      13: '猜大小', // 猜大小(一个或者多个)
      14: '组合投注',
      15: '特别号码',
      16: '特别号码颜色',
      17: '首个奇数/偶',
      18: '奇数和偶数', // 奇数和偶数(全选)
      19: '猜大小', // 猜大小(全选)
      20: '总和',
      21: '单式投注',
      22: '双式投注',
      23: '三式投注',
      24: '4串1',
      25: '5串1',
      29: '总和-大小单双'
    }
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
    setTypes(state, val) {
      state.types = val
    },
  },
  actions: {
    updateUser({ commit }) {
      api.userConfig().then(res => {
        // setCookie('token', res.userinfo.token, 30)
        // setCookie('uid', res.userinfo.id, 30)
        commit('setUserInfo', res)
      })
    },
  },
  plugins: [createPersistedState()]
})
