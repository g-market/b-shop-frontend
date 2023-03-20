<script>
export default {
  name: 'AuthSuccess',
  async created() {
    const authCode = this.$route.query.auth_code
    const data = await this.$store.dispatch('member/LOGIN', authCode)
    if (
      data.memberResponse.phoneNumber == null ||
      data.memberResponse.phoneNumber === ''
    ) {
      this.$router.push('/register')
    } else {
      this.$router.push('/')
    }
  },
}
</script>
