import { instanceWithAuth as items } from '@/api/index'
import store from '@/store'

function fetchItems(year, category, itemName, page) {
  const size = store.state.searchStatus.page.size
  if (category == null) {
    if (itemName === null || itemName === '') {
      return items.get(`/items?year=${year}&page=${page}&size=${size}`)
    }
    return items.get(
      `/items?year=${year}&itemName=${itemName}&page=${page}&size=${size}`,
    )
  }
  if (itemName === null || itemName === '') {
    return items.get(
      `/items?year=${year}&categoryName=${category}&page=${page}&size=${size}`,
    )
  }
  return items.get(
    `/items?year=${year}&categoryName=${category}&itemName=${itemName}&page=${page}&size=${size}`,
  )
}

function fetchItem(itemId) {
  return items.get(`/items/${itemId}`)
}

// SearchComponent Year Category
function fetchYears() {
  return items.get('/item-years')
}

export { fetchItems, fetchItem, fetchYears }
