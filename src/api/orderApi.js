import { instanceWithAuth as orders } from '@/api/index'

function fetchOrders() {
  return orders.get(`/orders`)
}

function createOrder(orderItemList) {
  return orders.post('/orders', { orderItemDtoList: orderItemList })
}

export { fetchOrders, createOrder }
