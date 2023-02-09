<template></template>

<script>
export default {
  name: 'LoginView',
  created() {
    const authCode = this.$route.query.auth_code
    console.log(authCode)
    this.$store.dispatch('LOGIN', authCode)
  }
}
</script>

<style lang="scss"></style>
