<script>
export default {
  name: 'AuthSuccess',
  async created() {
    const authCode = this.$route.query.auth_code
    const data = await this.$store.dispatch('member/LOGIN', authCode)

    // if (data.registerCompleted && !data.isAdmin) {
    if (!data.registerCompleted) {
      this.$router.push('/register')
    } else {
      this.$router.push('/')
    }
  },
}
</script>
