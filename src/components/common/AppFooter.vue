<template>
  <footer>
    <LogoComponent />
    <a
      href="https://mentoring-gitlab.gabia.com/mentee/mentee_2023.01/team/g-market/gabia-b-shop-frontend"
      target="_blank"
    >
      (c){{ new Date().getFullYear() }} B SHOP
    </a>
  </footer>
</template>

<script>
import LogoComponent from '@/components/LogoComponent.vue'

export default {
  name: 'FooterComponent',
  components: { LogoComponent },
}
</script>

<style lang="scss" scoped>
footer {
  padding: 70px 0;
  text-align: center;
  opacity: 0.3;

  .logo {
    display: block;
    margin-bottom: 4px;
  }
}
</style>
