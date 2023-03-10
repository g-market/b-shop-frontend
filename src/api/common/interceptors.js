import store from '@/store'
import axios from 'axios'
import { reissueAccessToken } from '@/api/authApi'
import router from '@/routes'

axios.defaults.withCredentials = true

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
        try {
          const { data } = await reissueAccessToken()
          store.commit('member/setToken', data.accessToken)
          originalRequest.headers.Authorization =
            'Bearer ' + store.state.member.token
          return instance(originalRequest)
        } catch (error2) {
          store.commit('member/logout')
          await router.push(import.meta.env.VITE_HIWORKS_LOGIN_PAGE)
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
