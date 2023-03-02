import { instanceWithAuth as carts } from '@/api/index'

function fetchCarts() {
  return carts.get(`/carts`)
}

function createCart(cartCreateRequest) {
  return carts.post('/carts', cartCreateRequest)
}

function deleteCart(cartDeleteRequest) {
  return carts.delete('/carts', { data: cartDeleteRequest })
}

export { fetchCarts, createCart, deleteCart }
