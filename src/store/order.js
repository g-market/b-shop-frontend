import { createOrder, fetchOrder, fetchOrders } from '@/api/orderApi'

export default {
  namespaced: true,
  state: {
    selectedOptions: [],
    orderInfoResponse: {},
    orders: {},
  },
  getters: {},
  mutations: {
    setSelectedOptions(state, selectedOptions) {
      state.selectedOptions = selectedOptions
    },
    setOrderInfoResponse(state, orderInfoResponse) {
      state.orderInfoResponse = orderInfoResponse
    },
    setOrders(state, orders) {
      state.orders = orders
    },
  },
  actions: {
    async CREATE_ORDER({ commit }, orderItemList) {
      const { data } = await createOrder(orderItemList)
      return data
    },
    async FETCH_ORDER({ commit }, orderId) {
      const { data } = await fetchOrder(orderId)
      commit('setOrderInfoResponse', data)
      return data
    },
    async FETCH_ORDERS({ commit }, dateParam) {
      const { data } = await fetchOrders(dateParam)
      console.log(data)
      commit('setOrders', data)
      return data
    },
  },
}
