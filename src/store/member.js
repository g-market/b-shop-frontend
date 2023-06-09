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
      try {
        const { data } = await login(authCode)
        commit('login', data)
        return data
      } catch (error) {
        console.log(error)
      }
    },
    async LOGOUT({ commit }) {
      try {
        await logout()
        commit('logout')
      } catch (error) {
        console.log(error)
      }
    },
    async FETCH_MEMBER({ commit }) {
      try {
        const { data } = await fetchMember()
        commit('setMember', data)
        return data
      } catch (error) {
        console.log(error)
      }
    },
    async UPDATE_MEMBER({ commit }, memberUpdateRequest) {
      const { data } = await patchMember(memberUpdateRequest)
      commit('setProfile', memberUpdateRequest)
      return data
    },
    async UPDATE_PROFILE_IMAGE_URL({ commit }, formData) {
      try {
        const { data } = await uploadImage(formData)
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
    profileImageUrl: '',
  }
}
