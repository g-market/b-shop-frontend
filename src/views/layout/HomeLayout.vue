<script setup>
import NavBar from '@/components/common/NavBar.vue'
import AppFooter from '@/components/common/AppFooter.vue'
</script>

<template>
  <NavBar />
  <RouterView />
  <AppFooter />
</template>

<script>
export default {
  name: 'HomeLayout',
}
</script>

<style lang="scss" scoped>
@import '@/scss/main.scss';
</style>
