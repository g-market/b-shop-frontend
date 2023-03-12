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
      try {
        const { data } = await fetchCarts()
        commit('fetchCarts', data)
        return data
      } catch (error) {
        console.log(error)
      }
    },
    async CREATE_CART({ commit }, cartCreateRequest) {
      try {
        const { data } = await createCart(cartCreateRequest)
        return data
      } catch (error) {
        console.log(error)
      }
    },
    async DELETE_CART({ commit }, cartDeleteRequest) {
      try {
        await deleteCart(cartDeleteRequest)
      } catch (error) {
        console.log(error)
      }
    },
    async DELETE_CARTS({ commit }, cartDeleteRequestList) {
      try {
        await deleteCarts(cartDeleteRequestList)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
