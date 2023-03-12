import { fetchItems, fetchItem } from '@/api/itemApi'

export default {
  namespaced: true,
  state: {
    items: [],
    item: {},
  },
  getters: {},
  mutations: {
    fetchItems(state, items) {
      state.items = items
    },
    fetchItem(state, data) {
      state.item = data
    },
  },
  actions: {
    async FETCH_ITEMS({ commit }, searchParam) {
      try {
        const { data } = await fetchItems(
          searchParam.year,
          searchParam.category,
          searchParam.itemName,
          searchParam.page,
        )
        commit('fetchItems', data.content)
        return data
      } catch (error) {
        console.log(error)
      }
    },
    async FETCH_ITEM({ commit }, itemId) {
      try {
        const { data } = await fetchItem(itemId)
        commit('fetchItem', data)
        return data
      } catch (error) {
        console.log(error)
      }
    },
  },
}
