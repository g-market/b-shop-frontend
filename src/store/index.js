import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default createStore({
  modules: {},
  state: {
    news: [],
    jobs: [],
    asks: [],
    user: {},
    item: []
  },
  getters,
  mutations,
  actions
})
