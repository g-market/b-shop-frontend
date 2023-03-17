import { instanceWithAuth as orders } from '@/api/index'

function fetchOrders(orderSearchConditions, pageable) {
  if (orderSearchConditions == null) {
    return orders.get(`/orders?page=${pageable.page}&size=${pageable.size}`)
  }
  return orders.get(
    `/orders?startDate=${orderSearchConditions.startDate}&endDate=${orderSearchConditions.endDate}&page=${pageable.page}&size=${pageable.size}`,
  )
}

function fetchOrder(orderId) {
  return orders.get(`/orders/${orderId}`)
}

function createOrder(orderItemList) {
  return orders.post('/orders', { orderItemDtoList: orderItemList })
}

function cancelOrder(orderId) {
  return orders.post(`/orders/${orderId}`)
}

export { fetchOrders, fetchOrder, createOrder, cancelOrder }
