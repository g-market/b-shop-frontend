<template>
  <RouterLink to="/" class="logo"><span>B </span>SHOP</RouterLink>
</template>

<script>
export default {
  name: 'LogoComponent',
}
</script>

<style lang="scss" scoped>
@import '@/scss/main.scss';

.logo {
  font-family: 'Oswald', 'sans-serif';
  font-size: 20px;
  color: $black;
  text-decoration: none;

  &:hover {
    color: $black;
  }

  span {
    color: $primary;
  }
}
</style>
