<template>
  <RouterLink to="/" class="logo" @click="initSearchParams">
    <span>B </span>SHOP
  </RouterLink>
</template>

<script>
export default {
  name: 'LogoComponent',
  methods: {
    async initSearchParams() {
      this.$store.commit(
        'searchStatus/initSelectedYearAndSelectedCategoryAndItemName',
      )
      await this.$store.dispatch('item/FETCH_ITEMS', {
        year: 2023,
        category: null,
        itemName: null,
        page: 0,
      })
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/main.scss';

.logo {
  font-family: 'Oswald', 'sans-serif';
  font-size: 20px;
  color: $black;
  text-decoration: none;

  &:hover {
    color: $black;
  }

  span {
    color: $primary;
  }
}
</style>
