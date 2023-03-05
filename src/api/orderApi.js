import { instanceWithAuth as orders } from '@/api/index'

function fetchOrders(dateParam) {
  if (dateParam == null) {
    return orders.get(`/orders`)
  }
  return orders.get(
    `/orders?startDate=${dateParam.startDate}&endDate=${dateParam.endDate}`,
  )
}

function fetchOrder(orderId) {
  return orders.get(`/orders/${orderId}`)
}

function createOrder(orderItemList) {
  return orders.post('/orders', { orderItemDtoList: orderItemList })
}

export { fetchOrders, fetchOrder, createOrder }
