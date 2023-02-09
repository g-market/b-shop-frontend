import {
  fetchNews,
  fetchJobs,
  fetchAsks,
  fetchUserInfo,
  fetchCommentItem,
  login
} from '../api/auth.js'

export default {
  FETCH_NEWS(context) {
    fetchNews()
      .then((res) => {
        context.commit('SET_NEWS', res.data)
      })
      .catch((err) => console.log(err))
  },
  FETCH_JOBS({ commit }) {
    fetchJobs()
      .then(({ data }) => {
        commit('SET_JOBS', data)
      })
      .catch((err) => console.log(err))
  },
  FETCH_ASKS({ commit }) {
    fetchAsks()
      .then(({ data }) => {
        commit('SET_ASKS', data)
      })
      .catch((err) => console.log(err))
  },
  FETCH_USER({ commit }, username) {
    fetchUserInfo(username)
      .then(({ data }) => {
        commit('SET_USER', data)
      })
      .catch((err) => console.log(err))
  },
  FETCH_ITEM({ commit }, itemId) {
    fetchCommentItem(itemId)
      .then(({ data }) => {
        commit('SET_ITEM', data)
      })
      .catch((err) => console.log(err))
  },
  LOGIN({ commit }, authCode) {
    login(authCode)
      .then(({ data }) => {
        console.log(data)
        localStorage.setItem('accessToken', data.token)
      })
      .catch((err) => console.log(err))
  }
}
