<script setup>
import NavBar from '@/components/common/NavBar.vue'
</script>

<template>
  <div>
    <NavBar />
    <RouterView />
  </div>
</template>

<script>
export default {
  name: 'HomeLayout',
}
</script>

<style lang="scss" scoped>
@import '@/scss/main.scss';
</style>
