<template>
  <section aria-label="제품 검색 영역" class="container">
    <div class="search-bar">
      <input type="text" maxLength="100" placeholder="검색어를 입력해주세요." />
      <div class="search-icon" aria-hidden="true">
        <mdicon name="magnify" />
      </div>
    </div>
    <div class="category-list">
      <div role="radiogroup" aria-label="카테고리 선택하기" class="radio-group">
        <span aria-hidden="true" class="category-title"></span>
        <button
          v-for="year in years"
          :key="year"
          :value="year"
          role="radio"
          aria-checked="true"
          :class="
            isSelected(year) ? 'category-item category-active' : 'category-item'
          "
          @click="changeSelectedYear(year)"
        >
          {{ year }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  async created() {
    if (this.years.length === 0) {
      await this.$store.dispatch('searchStatus/FETCH_YEARS')
    }
  },
  computed: {
    ...mapState('searchStatus', ['years', 'selectedYear']),
  },
  methods: {
    isSelected(year) {
      if (year === this.selectedYear) {
        return true
      }
    },
    async changeSelectedYear(selectedYear) {
      this.$store.commit('searchStatus/setSelectedYear', selectedYear)
      const year = this.$store.state.searchStatus.selectedYear
      await this.$store.dispatch('item/FETCH_ITEMS', year)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/main.scss';

section {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;

  .search-bar {
    width: 70%;
    display: flex;
    -webkit-box-align: center;
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
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      width: 3.5rem;
      height: 2.8rem;
      margin-left: -3.5rem;
      background: none;
      border: none;
      outline: none;
    }
  }

  .category-list {
    display: flex;
    gap: 0.8rem;

    .radio-group {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      gap: 0.125rem;
    }

    .category-title {
      font-size: 0.9rem;
      margin-right: 0.2rem;
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

      &.category-active {
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
