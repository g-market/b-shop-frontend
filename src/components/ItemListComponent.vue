<template>
  <section aria-label="아이템 리스트">
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
