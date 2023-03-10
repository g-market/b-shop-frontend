import store from '@/store'
import axios from 'axios'
import { reissueAccessToken } from '@/api/authApi'
import router from '@/routes'

axios.defaults.withCredentials = true
const TOKEN_EXPIRED_MESSAGE = '토큰이 만료됐습니다.'

export function setInterceptors(instance) {
  instance.interceptors.request.use(
    function (config) {
      config.headers.Authorization = 'Bearer ' + store.state.member.token
      return config
    },
    function (error) {
      return Promise.reject(error)
    },
  )

  instance.interceptors.response.use(
    response => {
      return response
    },
    async error => {
      const originalRequest = error.config
      if (error.response.status === 401) {
        const message = error.response.data.message
        try {
          if (message === TOKEN_EXPIRED_MESSAGE) {
            const { data } = await reissueAccessToken()
            store.commit('member/setToken', data.accessToken)
            originalRequest.headers.Authorization =
              'Bearer ' + store.state.member.token
            return instance(originalRequest)
          } else {
            store.commit('member/logout')
            alert('권한이 없습니다. 다시 로그인 해주세요')
          }
        } catch (error2) {
          store.commit('member/logout')
          return Promise.reject(error2)
        }
      } else {
        if (error.response.data.message) {
          alert(error.response.data.message)
          await router.push(import.meta.env.VITE_HIWORKS_LOGIN_PAGE)
        }
      }
      return Promise.reject(error)
    },
  )
  return instance
}
