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
      const { data } = await fetchItems(
        searchParam.year,
        searchParam.category,
        searchParam.itemName,
        searchParam.page,
      )
      commit('fetchItems', data.content)
      return data
    },

    async FETCH_ITEM({ commit }, itemId) {
      const { data } = await fetchItem(itemId)
      commit('fetchItem', data)
      return data
    },
  },
}
