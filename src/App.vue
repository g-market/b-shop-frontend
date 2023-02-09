<script setup>
import { RouterView } from 'vue-router'
import Toolbar from '@/components/Toolbar.vue'
</script>

<template>
  <Toolbar />
  <RouterView />
</template>

<style lang="scss">
@import '@/scss/main.scss';
</style>
