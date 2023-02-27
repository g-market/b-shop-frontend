<template>
  <section :aria-label="name">
    <div class="container" role="feed" aria-busy="true">
      <ul>
        <li v-for="item in items" :key="item.id">
          <ItemComponent :item="item" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import ItemComponent from '@/components/ItemComponent.vue'

export default {
  name: 'ItemListComponent',
  components: { ItemComponent },
  async created() {
    const year = this.$store.state.searchStatus.selectedYear
    const data = await this.$store.dispatch('item/FETCH_ITEMS', {
      year,
      page: 0,
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
  computed: {
    ...mapState('item', ['items']),
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/main.scss';

section {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  div {
    margin: 0 auto;
    width: 100%;
    ul {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      li {
        width: max-content;
        margin: 0 auto;
      }
    }
  }
}
</style>
