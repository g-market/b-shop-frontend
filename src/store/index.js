import { createStore } from 'vuex'
import member from '@/store/member'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  modules: {
    member,
  },
  plugins: [
    createPersistedState({
      paths: ['member'],
    }),
  ],
})
