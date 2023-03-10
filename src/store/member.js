import { login, logout } from '@/api/authApi'
import { fetchMember, patchMember } from '@/api/memberApi'
import { uploadImage } from '@/api/imageApi'

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
      profileImageUrl: '',
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
      state.member.profileImageUrl = data.memberResponse.profileImageUrl
    },
    logout(state) {
      state.token = ''
      state.member = _initMember()
      sessionStorage.clear()
    },
    setMember(state, data) {
      state.member.id = data.id
      state.member.email = data.email
      state.member.phoneNumber = data.phoneNumber
      state.member.name = data.name
      state.member.role = data.role
      state.member.grade = data.grade
      state.member.profileImageUrl = data.profileImageUrl
    },
    setToken(state, token) {
      state.token = token
    },
    setProfileImageUrl(state, profileImageUrl) {
      state.member.profileImageUrl = profileImageUrl
    },

    setProfile(state, memberUpdateRequest) {
      state.member.phoneNumber = memberUpdateRequest.phoneNumber
      state.member.profileImageUrl = memberUpdateRequest.profileImageUrl
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
        commit('setProfile', memberUpdateRequest)
        return data
      } catch (error) {
        console.log(error)
      }
    },
    async UPDATE_PROFILE_IMAGE_URL({ commit }, formData) {
      const { data } = await uploadImage(formData)
      console.log(data)
      return data
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
    profileImageUrl: '',
  }
}
