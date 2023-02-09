export default {
  FETCHED_NEWS(state) {
    return state.news
  },
  FETCHED_JOBS(state) {
    return state.jobs
  },
  FETCHED_ASKS(state) {
    return state.asks
  },
  FETCHED_USER(state) {
    return state.user
  },
  fetchedItem(state) {
    return state.item
  }
}
