<script setup>
import SearchComponent from '@/components/SearchComponent.vue'
import ItemListComponent from '@/components/ItemListComponent.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
</script>

<template>
  <main aria-label="홈 페이지">
    <SearchComponent />
    <ItemListComponent />
    <PaginationComponent />
  </main>
</template>

<script>
export default {}
</script>
