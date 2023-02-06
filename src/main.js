import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

axios.defaults.withCredentials = true

axios.interceptors.request.use(function (config) {
  config.headers.Authorization = 'Bearer ' + jwt.getToken()
  return config
})

const app = createApp(App)

app.use(router)

app.mount('#app')
