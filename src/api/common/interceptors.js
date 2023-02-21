import jwt from '@/api/jwt'

export function setInterceptors(instance) {
  // Add a request interceptor
  instance.interceptors.request.use(
    function (config) {
      config.headers.Authorization = 'Bearer ' + jwt.getToken()
      return config
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error)
    },
  )

  // Add a response interceptor
  instance.interceptors.response.use(
    response => {
      return response
    },
    async error => {
      const originalRequest = error.config
      if (error.response.status === 401) {
        let code = error.response.data.code
        try {
          if (code === 'EXPIRED') {
            const accessToken = await auth.requestReissue()
            originalRequest.headers.Authorization = 'Bearer ' + accessToken
            return instance(originalRequest)
          }
        } catch (error2) {
          alert('권한이 없습니다. 다시 로그인 해주세요')
          return Promise.reject(error2)
        }
      } else {
        if (error.response.data.message) alert(error.response.data.message)
      }
    },
  )
  return instance
}
