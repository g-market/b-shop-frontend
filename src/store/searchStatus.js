import { fetchYears } from '@/api/itemApi'

export default {
  namespaced: true,
  state: {
    selectedYear: 2023,
    category: '',
    years: [],
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
    initSearchStatus(state) {
      state.selectedYear = 2023
      state.category = ''
    },
    initYears(state, data) {
      console.log(data)
      state.years = data
    },
    setSelectedYear(state, selectedYear) {
      state.selectedYear = selectedYear
    },
    initPageElements(state, data) {
      state.page.number = data.number
      state.page.totalElements = data.totalElements
      state.page.totalPages = data.totalPages
      state.page.first = data.first
      state.page.last = data.last
    },
    setPage(state, page) {
      state.page = page
    },
  },
  actions: {
    async FETCH_YEARS({ commit }) {
      const { data } = await fetchYears()
      commit('initYears', data)
      return data
    },
  },
}
