import member from '@/store/member'
import axios from 'axios'
import { reissueAccessToken } from '@/api/authApi'

axios.defaults.withCredentials = true

export function setInterceptors(instance) {
  instance.interceptors.request.use(
    function (config) {
      config.headers.Authorization = 'Bearer ' + member.state.token
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
    // TODO: accessToken이 만료되었을 때 재발급하고 다시 요청하도록 추후 수정 필요
    // async error => {
    //   const originalRequest = error.config
    //   if (error.response.status === 401) {
    //     let code = error.response.data.code
    //     try {
    //       if (code === 'EXPIRED') {
    //         const accessToken = await reissueAccessToken()
    //         originalRequest.headers.Authorization = 'Bearer ' + accessToken
    //         return axios(originalRequest)
    //       }
    //     } catch (error2) {
    //       window.location.href = process.env.VUE_APP_BASEURL + '/login'
    //       alert('권한이 없습니다. 다시 로그인 해주세요')
    //       return Promise.reject(error2)
    //     }
    //   } else {
    //     if (error.response.data.message) alert(error.response.data.message)
    //   }
    //   return Promise.reject(error)
    // },
  )
  return instance
}
