import {
  createOrder,
  fetchOrder,
  fetchOrders,
  cancelOrder,
} from '@/api/orderApi'

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
      try {
        const { data } = await createOrder(orderItemList)
        return data
      } catch (error) {
        console.log(error)
      }
    },
    async FETCH_ORDER({ commit }, orderId) {
      try {
        const { data } = await fetchOrder(orderId)
        commit('setOrderInfoResponse', data)
        return data
      } catch (error) {
        console.log(error)
      }
    },
    async FETCH_ORDERS({ commit }, searchParams) {
      try {
        const { data } = await fetchOrders(
          searchParams.orderSearchConditions,
          searchParams.pageable,
        )
        commit('setOrders', data.content)
        return data
      } catch (error) {
        console.log(error)
      }
    },
    async CANCEL_ORDER({ commit }, orderId) {
      try {
        await cancelOrder(orderId)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
