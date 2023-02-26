import { instanceWithAuth as items } from '@/api/index'
import store from '@/store'

function fetchItems(year, page) {
  const size = store.state.searchStatus.page.size
  return items.get(`/items?year=${year}&page=${page}&size=${size}`)
}

function fetchItem(itemId) {
  return items.get(`/items/${itemId}`)
}

// SearchComponent Year Category
function fetchYears() {
  return items.get('/years')
}

export { fetchItems, fetchItem, fetchYears }
