<template>
  <header>
    <h1 class="header-title">모든 제품</h1>
    <select aria-label="정렬 기준">
      <option value="openAt,desc">신상품순</option>
      <option value="openAt,desc">리뷰 많은 순</option>
    </select>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  margin-left: 1rem;
  padding: 1rem 0px;

  .header-title {
    font-size: 1.5rem;
  }

  select {
    width: 150px;
    border-top: none;
    border-right: none;
    border-left: none;
    border-image: initial;
    border-bottom: 1px solid black;
    padding: 10px;
    background-color: rgb(250, 249, 249);

    option {
      font-weight: normal;
      display: block;
      white-space: nowrap;
      min-height: 1.2em;
      padding: 0px 2px 1px;
    }
  }
}
</style>
