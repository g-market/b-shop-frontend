import { instanceWithAuth as carts } from '@/api/index'

function fetchCarts() {
  return carts.get(`/carts`)
}

function createCart(cartCreateRequest) {
  return carts.post('/carts', cartCreateRequest)
}

function deleteCart(cartDeleteRequest) {
  return carts.delete('/cart', { data: cartDeleteRequest })
}

function deleteCarts(cartDeleteRequestList) {
  return carts.delete('/carts', { data: cartDeleteRequestList })
}

export { fetchCarts, createCart, deleteCart, deleteCarts }
