<template>
  <RouterView />
</template>

<script>
export default {
  async created() {
    this.$store.dispatch('member/REISSUE_ACCESS_TOKEN')
  },
}
</script>

<style lang="scss">
@import '@/scss/main.scss';
</style>
