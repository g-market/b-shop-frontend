import { createStore } from 'vuex'
import member from '@/store/member'
import searchStatus from '@/store/searchStatus'
import item from '@/store/item'
import order from '@/store/order'
import cart from '@/store/cart'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  modules: {
    member,
    searchStatus,
    item,
    order,
    cart,
  },
  plugins: [
    createPersistedState({
      paths: ['member', 'searchStatus', 'item', 'order', 'cart'],
      storage: window.sessionStorage,
    }),
  ],
})
