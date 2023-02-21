import { login, logout, reissueAccessToken } from '@/api/auth'
import { fetchMember } from '@/api/member'

export default {
  namespaced: true,
  state: {
    member: {
      id: 0,
      email: '',
      phoneNumber: '',
      name: '',
      role: '',
      grade: '',
    },
    registerCompleted: false,
    token: '',
  },
  getters: {
    isLogin(state) {
      return state.token !== ''
    },
  },
  mutations: {
    login(state, data) {
      state.token = data.token
      state.registerCompleted = data.registerCompleted
      state.member.email = data.memberResponse.email
      // state.phoneNumber = memberResponse.phoneNumber
      state.member.name = data.memberResponse.name
      // state.role = memberResponse.role
      // state.grade = memberResponse.grade
    },
    logout(state) {
      state.isLogin = false
      state.token = ''
    },
    setRegisterCompleted(state, registerCompleted) {
      this.registerCompleted = registerCompleted
    },
    setMember(state, data) {
      state.member.id = data.id
      state.member.email = data.email
      state.member.name = data.name
      state.member.phoneNumber =
        data.phoneNumber == null ? '' : state.member.phoneNumber
    },
    setToken(state, data) {
      state.token = data.token
      // state.expiredTime = data.expiredTime
    },
  },
  actions: {
    async LOGIN({ commit }, authCode) {
      const { data } = await login(authCode)
      console.log(data)
      commit('login', data)
      return data
    },
    async LOGOUT({ commit }) {
      await logout()
      commit('logout')
    },
    async FETCH_MEMBER({ commit }) {
      const { data } = await fetchMember()
      console.log(data)
      commit('setMember', data)
      return data
    },
    async REISSUE_ACCESS_TOKEN({ commit }) {
      const { data } = await reissueAccessToken()
      commit('setToken', data)
    },
  },
}
