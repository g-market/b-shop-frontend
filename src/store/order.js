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
    async FETCH_ORDERS({ commit }, searchParams) {
      const { data } = await fetchOrders(
        searchParams.orderSearchConditions,
        searchParams.pageable,
      )
      commit('setOrders', data.content)
      console.log(data.content)
      return data
    },
  },
}
