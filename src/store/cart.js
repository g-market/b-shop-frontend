import { createCart, deleteCart, deleteCarts, fetchCarts } from '@/api/cartApi'

export default {
  namespaced: true,
  state: {
    carts: [],
  },
  getters: {},
  mutations: {
    fetchCarts(state, carts) {
      state.carts = carts
    },
  },
  actions: {
    async FETCH_CARTS({ commit }) {
      const { data } = await fetchCarts()
      commit('fetchCarts', data)
      return data
    },
    async CREATE_CART({ commit }, cartCreateRequest) {
      const { data } = await createCart(cartCreateRequest)
      return data
    },
    async DELETE_CART({ commit }, cartDeleteRequest) {
      await deleteCart(cartDeleteRequest)
    },
    async DELETE_CARTS({ commit }, cartDeleteRequestList) {
      await deleteCarts(cartDeleteRequestList)
    },
  },
}
