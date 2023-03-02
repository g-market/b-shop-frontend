import { login, logout, reissueAccessToken } from '@/api/authApi'
import { fetchMember, patchMember } from '@/api/memberApi'

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
      state.member.id = data.memberResponse.id
      state.member.email = data.memberResponse.email
      if (data.memberResponse.phoneNumber != null) {
        state.member.phoneNumber = data.memberResponse.phoneNumber
      }
      state.member.name = data.memberResponse.name
      state.member.role = data.memberResponse.role
      state.member.grade = data.memberResponse.grade
    },
    logout(state) {
      state.token = ''
      state.member = _initMember()
      sessionStorage.clear()
    },
    setMember(state, data) {
      state.member.id = data.id
      state.member.email = data.email
      state.member.name = data.name
      state.member.phoneNumber =
        data.phoneNumber == null ? '' : state.member.phoneNumber
    },
    setToken(state, token) {
      state.token = token
    },
    setPhoneNumber(state, phoneNumber) {
      state.member.phoneNumber = phoneNumber
    },
  },
  actions: {
    async LOGIN({ commit }, authCode) {
      const { data } = await login(authCode)
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
    async UPDATE_MEMBER({ commit }, memberUpdateRequest) {
      try {
        const { data } = await patchMember(memberUpdateRequest)
        console.log(memberUpdateRequest)
        commit('setPhoneNumber', memberUpdateRequest.phoneNumber)
        return data
      } catch (error) {
        console.log(error)
      }
    },
  },
}

function _initMember() {
  return {
    id: 0,
    email: '',
    phoneNumber: '',
    name: '',
    role: '',
    grade: '',
  }
}
