import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/routes'
import store from '@/store'
import mdiVue from 'mdi-vue/v3'
import * as mdiJs from '@mdi/js'
import { formatDate } from '@/utils/filters'

const app = createApp(App)

app.config.globalProperties.$filters = {
  formatDate,
}

app.use(router).use(store).use(mdiVue, {
  icons: mdiJs,
})

app.mount('#app')
