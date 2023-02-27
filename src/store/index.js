import { createStore } from 'vuex'
import member from '@/store/member'
import searchStatus from '@/store/searchStatus'
import item from '@/store/item'
import order from '@/store/order'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  modules: {
    member,
    searchStatus,
    item,
    order,
  },
  plugins: [
    createPersistedState({
      paths: ['member', 'searchStatus', 'item', 'order'],
      storage: window.sessionStorage,
    }),
  ],
})
