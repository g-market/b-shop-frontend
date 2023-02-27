<script setup>
import SearchComponent from '@/components/SearchComponent.vue'
import ItemListComponent from '@/components/ItemListComponent.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
</script>

<template>
  <main aria-label="제품 검색 페이지" class="container">
    <SearchComponent />
    <ItemListComponent />
    <PaginationComponent />
  </main>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
main {
  padding-top: 100px;
}
</style>
