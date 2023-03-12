import { fetchYears } from '@/api/itemApi'
import { fetchCategories } from '@/api/categoryApi'

export default {
  namespaced: true,
  state: {
    selectedYear: 2023,
    categories: [],
    selectedCategory: null,
    years: [],
    itemName: null,
    page: {
      number: 0,
      size: 12,
      totalElements: 0,
      totalPages: 0,
      first: true,
      last: false,
    },
  },
  getters: {},
  mutations: {
    initYears(state, data) {
      state.years = data
    },
    initCategories(state, data) {
      state.categories = data
    },
    setSelectedYear(state, selectedYear) {
      state.selectedYear = selectedYear
    },
    setSelectedCategory(state, selectedCategory) {
      state.selectedCategory = selectedCategory
    },
    initPageElements(state, data) {
      state.page.number = data.number
      state.page.totalElements = data.totalElements
      state.page.totalPages = data.totalPages
      state.page.first = data.first
      state.page.last = data.last
    },
    initSelectedYearAndSelectedCategoryAndItemName(state) {
      state.selectedYear = 2023
      state.itemName = null
      state.selectedCategory = null
    },
    setItemName(state, itemName) {
      state.itemName = itemName
    },
  },
  actions: {
    async FETCH_YEARS({ commit }) {
      try {
        const { data } = await fetchYears()
        commit('initYears', data)
        return data
      } catch (error) {
        console.log(error)
      }
    },
    async FETCH_CATEGORIES({ commit }) {
      try {
        const { data } = await fetchCategories()
        commit('initCategories', data)
        return data
      } catch (error) {
        console.log(error)
      }
    },
  },
}
