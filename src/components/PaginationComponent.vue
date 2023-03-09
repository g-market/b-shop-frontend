<template>
  <section class="pt-5">
    <div class="row">
      <nav id="pagination" aria-label="Page navigation">
        <div
          role="radiogroup"
          aria-label="페이지 선택하기"
          class="radio-group pagination justify-content-center"
        >
          <button
            :class="
              page.first
                ? 'page-item page-link disabled'
                : 'page-item page-link'
            "
            @click="prevPage()"
          >
            Prev
          </button>
          <button
            v-for="currPage in page.totalPages"
            :key="currPage"
            :value="currPage"
            role="radio"
            aria-checked="true"
            :class="
              isSelected(currPage)
                ? 'page-item page-link active'
                : 'page-item page-link'
            "
            @click="changeSelectedPage(currPage)"
          >
            {{ currPage }}
          </button>
          <button
            :class="
              page.last ? 'page-item page-link disabled' : 'page-item page-link'
            "
            @click="nextPage()"
          >
            Next
          </button>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PaginationComponent',
  computed: {
    ...mapState('searchStatus', ['page', 'itemName']),
  },
  methods: {
    isSelected(currPage) {
      if (this.page.number + 1 === currPage) {
        return true
      }
    },
    async changeSelectedPage(currPage) {
      const year = this.$store.state.searchStatus.selectedYear
      const category = this.$store.state.searchStatus.selectedCategory
      const data = await this.$store.dispatch('item/FETCH_ITEMS', {
        year,
        page: currPage - 1,
        category,
        itemName: this.itemName,
      })
      const pageData = {
        number: data.number,
        totalElements: data.totalElements,
        totalPages: data.totalPages,
        first: data.first,
        last: data.last,
      }
      this.$store.commit('searchStatus/initPageElements', pageData)
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    },
    async prevPage() {
      const number = this.page.number - 1
      const year = this.$store.state.searchStatus.selectedYear
      const category = this.$store.state.searchStatus.selectedCategory
      const data = await this.$store.dispatch('item/FETCH_ITEMS', {
        year,
        page: number,
        category,
        itemName: this.itemName,
      })
      const pageData = {
        number: data.number,
        totalElements: data.totalElements,
        totalPages: data.totalPages,
        first: data.first,
        last: data.last,
      }
      this.$store.commit('searchStatus/initPageElements', pageData)
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    },
    async nextPage() {
      const number = this.page.number + 1
      const year = this.$store.state.searchStatus.selectedYear
      const category = this.$store.state.searchStatus.selectedCategory
      const data = await this.$store.dispatch('item/FETCH_ITEMS', {
        year,
        page: number,
        category,
        itemName: this.itemName,
      })
      const pageData = {
        number: data.number,
        totalElements: data.totalElements,
        totalPages: data.totalPages,
        first: data.first,
        last: data.last,
      }
      this.$store.commit('searchStatus/initPageElements', pageData)
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/main.scss';
</style>
