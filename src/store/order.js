import { createOrder } from '@/api/orderApi'

export default {
  namespaced: true,
  state: {
    selectedOptions: [],
    orderResponse: {},
  },
  getters: {},
  mutations: {
    setSelectedOptions(state, selectedOptions) {
      state.selectedOptions = selectedOptions
    },
    setOrderResponse(state, orderCreateResponse) {
      state.orderResponse = orderCreateResponse
      console.log(orderCreateResponse)
    },
  },
  actions: {
    async CREATE_ORDER({ commit }, orderItemList) {
      const { data } = await createOrder(orderItemList)
      commit('setOrderResponse', data)
    },
  },
}
