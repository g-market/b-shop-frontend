import axios from 'axios'
import { setInterceptors } from '@/api/common/interceptors'

axios.defaults.withCredentials = true

function createInstance() {
  return axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  })
}

function createInstanceWithAuth(url) {
  axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}${url}`,
  })
  return setInterceptors(instance)
}

export const instance = createInstance()

export const instanceWithAuth = createInstanceWithAuth()
