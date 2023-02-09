<template>
  <header>
    <div class="container-fluid">
      <div class="navb-logo">
        <img src="../assets/logo.svg" alt="logo" />
      </div>

      <div class="navb-items">
        <div class="item">
          <a href="/">Home</a>
        </div>
        <div class="item">
          <a href="/services">Services</a>
        </div>
        <div class="item">
          <a href="/cases">Cases</a>
        </div>
        <div class="item">
          <a href="/about">About</a>
        </div>
        <div class="item-btn">
          <img
            src="https://play-lh.googleusercontent.com/vtlk86Aif2oq7KVaxGRqlYnbku90pfXAHv8xXR-WIrfvVrOfhJSJwVbzB3kxMIyYmgyl=s48-rw"
            @click="hiworksLogin"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    hiworksLogin: function () {
      window.location.href =
        'https://api.hiworks.com/open/auth/authform?client_id=g9weeb6q1rsgirhtgcxsmyj4wt7ktcer6045c8d8d357e7.34276869.open.apps&access_type=offline'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/main.scss';

header {
  width: 100vw;
  height: 100px;
  background-color: #fff;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 25%);
  display: flex;
  & .container-fluid {
    width: 100%;
    padding: 0 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  & .navb-logo img {
    width: 140px;
    height: 66px;
  }
  & .navb-items {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    letter-spacing: 3px;
  }
  & .item {
    text-align: center;
    margin-inline: 15%;
    font-size: 20px;
    letter-spacing: 3px;
    color: #102447;
    padding: 5px 0;
    transition: all 0.2s ease;
    border-bottom: 0px solid $primary;
    border-top: 0px solid $primary;
    cursor: pointer;
    &:hover {
      border-bottom: 3px solid $primary;
      border-top: 3px solid $primary;
    }
  }
  & .item-btn a {
    background-color: #274d8a;
    width: 150px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    transition: all 0.5s ease;
    &:hover {
      background-color: $primary;
    }
  }
}
</style>
