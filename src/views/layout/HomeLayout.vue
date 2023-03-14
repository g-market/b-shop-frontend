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
  created() {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/main.scss';
</style>
