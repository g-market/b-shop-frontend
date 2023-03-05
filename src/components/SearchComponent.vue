<template>
  <section aria-label="제품 검색 영역" class="container">
    <div class="search-bar">
      <input
        type="text"
        maxLength="100"
        placeholder="검색어를 입력해주세요."
        :value="itemName"
        @input="updateItemName"
        @keydown.enter="searchItems()"
      />
      <div class="search-icon" aria-hidden="true" @click="searchItems()">
        <mdicon name="magnify" />
      </div>
    </div>
    <div class="item-list d-flex flex-column align-items-center">
      <div role="radiogroup" aria-label="연도 선택하기" class="radio-group">
        <span aria-hidden="true" class="item-title"></span>
        <button
          v-for="year in years"
          :key="year"
          :value="year"
          role="radio"
          aria-checked="true"
          :class="isSelectedYear(year) ? 'year-item item-active' : 'year-item'"
          @click="changeSelectedYear(year)"
        >
          {{ year }}
        </button>
      </div>
      <div class="item-list m-2">
        <div
          role="radiogroup"
          aria-label="카테고리 선택하기"
          class="radio-group"
        >
          <span aria-hidden="true" class="item-title"></span>
          <button
            v-for="category in categories"
            :key="category"
            :value="category"
            role="radio"
            aria-checked="true"
            :class="
              isSelectedCategory(category)
                ? 'category-item item-active'
                : 'category-item'
            "
            @click="changeSelectedCategory(category, $event)"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  async created() {
    await this.$store.dispatch('searchStatus/FETCH_CATEGORIES')
    this.$store.state.searchStatus.selectedCategory = null
    this.$store.state.searchStatus.itemName = null
    await this.fetchItems()
  },
  computed: {
    ...mapState('searchStatus', [
      'years',
      'selectedYear',
      'categories',
      'selectedCategory',
      'itemName',
    ]),
  },
  methods: {
    isSelectedYear(year) {
      if (year === this.selectedYear) {
        return true
      }
    },
    isSelectedCategory(category) {
      if (category === this.selectedCategory) {
        return true
      }
    },
    async changeSelectedYear(selectedYear) {
      this.$store.commit('searchStatus/setSelectedYear', selectedYear)
      await this.fetchItems()
    },
    async changeSelectedCategory(selectedCategory, $event) {
      if (this.selectedCategory === selectedCategory) {
        $event.target.classList.remove('category-active')
        this.$store.commit('searchStatus/setSelectedCategory', null)
      } else {
        this.$store.commit('searchStatus/setSelectedCategory', selectedCategory)
      }
      await this.fetchItems()
    },
    async searchItems() {
      await this.fetchItems()
    },

    async fetchItems() {
      const year = this.$store.state.searchStatus.selectedYear
      const category = this.$store.state.searchStatus.selectedCategory
      const data = await this.$store.dispatch('item/FETCH_ITEMS', {
        year,
        page: 0,
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
    },
    updateItemName(event) {
      this.$store.commit('searchStatus/setItemName', event.target.value)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/main.scss';

section {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;

  .search-bar {
    width: 70%;
    display: flex;
    align-items: center;

    input {
      width: 100%;
      height: 2.8rem;
      background: rgb(255, 255, 255);
      outline: none;
      border: 1px solid $primary;
      border-radius: 1.625rem;
      padding: 0 3.5rem 0 1.5rem;
      font-size: 1rem;
    }

    .search-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 3.5rem;
      height: 2.8rem;
      margin-left: -3.5rem;
      background: none;
      border: none;
      outline: none;
    }
  }

  .item-list {
    display: flex;
    gap: 0.8rem;

    .radio-group {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      gap: 0.125rem;
    }

    .item-title {
      font-size: 0.9rem;
      margin-right: 0.2rem;
    }

    .year-item {
      width: max-content;
      font-size: 13px;
      padding: 0.2rem 0.5rem;
      background-color: rgb(207, 207, 207);
      border-radius: 2rem;
      border: none;
      font-weight: 500;
      transition: all 300ms ease 0s;

      &.item-active {
        width: max-content;
        font-size: 13px;
        padding: 0.2rem 0.5rem;
        background-color: $primary-btn;
        border-radius: 2rem;
        border: none;
        font-weight: 500;
        transition: all 300ms ease 0s;
      }
    }
    .category-item {
      width: max-content;
      font-size: 13px;
      padding: 0.2rem 0.5rem;
      background-color: rgb(207, 207, 207);
      border-radius: 2rem;
      border: none;
      font-weight: 500;
      transition: all 300ms ease 0s;

      &.item-active {
        width: max-content;
        font-size: 13px;
        padding: 0.2rem 0.5rem;
        background-color: $primary-btn;
        border-radius: 2rem;
        border: none;
        font-weight: 500;
        transition: all 300ms ease 0s;
      }
    }
  }
}
</style>
