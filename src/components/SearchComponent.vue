<template>
  <section aria-label="제품 검색 영역" className="container">
    <div className="search-bar">
      <input type="text" maxLength="100" placeholder="검색어를 입력해주세요." />
      <div className="search-icon" aria-hidden="true">
        <mdicon name="magnify" />
      </div>
    </div>
    <div className="category-list">
      <div
        role="radiogroup"
        aria-label="카테고리 선택하기"
        className="radio-group"
      >
        <span aria-hidden="true" className="category-title"></span>
        <button
          font-size="13"
          value="keyboard"
          role="radio"
          aria-checked="true"
          className="category-item category-active"
        >
          2023
        </button>
        <button
          font-size="13"
          value="mouse"
          role="radio"
          aria-checked="true"
          className="category-item"
        >
          2022
        </button>
        <button
          font-size="13"
          value="monitor"
          role="radio"
          aria-checked="true"
          className="category-item"
        >
          2021
        </button>
        <button
          font-size="13"
          value="stand"
          role="radio"
          aria-checked="true"
          className="category-item"
        >
          2020
        </button>
        <button
          font-size="13"
          value="software"
          role="radio"
          aria-checked="false"
          className="category-item"
        >
          2019
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '@/scss/main.scss';

section {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;

  .search-bar {
    width: 70%;
    display: flex;
    -webkit-box-align: center;
    align-items: center;

    input {
      width: 100%;
      height: 2.8rem;
      background: rgb(255, 255, 255);
      outline: none;
      border: 1px solid $primary;
      border-radius: 1.625rem;
      padding: 0px 3.5rem 0px 1.5rem;
      font-size: 1rem;
    }

    .search-icon {
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      width: 3.5rem;
      height: 2.8rem;
      margin-left: -3.5rem;
      background: none;
      border: none;
      outline: none;
    }
  }

  .category-list {
    display: flex;
    gap: 0.8rem;

    .radio-group {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      gap: 0.125rem;
    }

    .category-title {
      font-size: 0.9rem;
      margin-right: 0.2rem;
    }

    .category-item {
      width: max-content;
      font-size: 13px;
      padding: 0.2rem 0.5rem;
      background-color: rgb(207, 207, 207);
      border-radius: 2rem;
      border: none;
      font-weight: 500;
      transition: all 300ms ease 0s;

      &.category-active {
        width: max-content;
        font-size: 13px;
        padding: 0.2rem 0.5rem;
        background-color: $primary-btn;
        border-radius: 2rem;
        border: none;
        font-weight: 500;
        transition: all 300ms ease 0s;
      }
    }
  }
}
</style>
