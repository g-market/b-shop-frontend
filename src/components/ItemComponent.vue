<template>
  <a class="item-wrapper" @click="handleRoute()">
    <div class="item">
      <div class="item-image position-relative">
        <span class="notify-badge" v-if="isReserved(item.itemStatus)">{{
          $filters.changeKoreanItemStatus(item.itemStatus)
        }}</span>
        <img :src="item.thumbnail" alt="아이템 이미지" loading="lazy" />
      </div>
      <p class="item-title">{{ item.name }}</p>
      <div class="item-sale-info">
        <div aria-hidden="true" class="item-category">
          <div aria-hidden="true" class="item-category__icon">
            <mdicon name="alpha-c-box" />
          </div>
          <div>{{ item.categoryDto.name }}</div>
        </div>
        <div aria-hidden="true" class="item-price">
          <div aria-hidden="true" class="item-price__icon">
            <mdicon name="currency-krw" />
          </div>
          <div class="item-price__count">
            {{ $filters.formatCurrency(item.basePrice) }}
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: 'ItemComponent',
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    isReserved(itemStatus) {
      if (itemStatus === 'RESERVED') {
        return true
      }
    },
    handleRoute() {
      if (this.item.itemStatus === 'RESERVED') {
        alert('예약 상품입니다.')
        return
      }
      this.$router.push(`items/${this.item.itemId}`)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/main.scss';

.item-wrapper {
  &:hover {
    text-decoration: none;
    cursor: pointer;
  }

  .item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.5rem;
    border-radius: 0.375rem;
    padding: 1rem;
    min-width: 13rem;
    width: 17rem;
    animation: 500ms ease 0s 1 normal none running fade-in-0;

    .item-image {
      width: 100%;
      aspect-ratio: 1 / 1;
      overflow: hidden;
      border: 1px solid rgb(207, 207, 207);
      background-color: rgb(255, 255, 255);
      display: flex;
      align-items: center;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .item-title {
      line-height: 1.2;
      font-weight: 500;
      font-size: 1rem;
    }

    .item-sale-info {
      display: flex;
      justify-content: space-between;

      .item-category {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;

        .item-category__icon {
          width: 14px;
          height: 14px;
          margin-right: 0.5rem;
          display: flex;
          align-items: center;
          color: rgb(246, 190, 190);
        }
      }

      .item-price {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.3rem;

        .item-price__icon {
          width: 14px;
          height: 14px;
          margin-right: 0.5rem;
          display: flex;
          align-items: center;
          color: $gray-400;
        }
      }
    }
  }
}
.notify-badge {
  position: absolute;
  right: 0px;
  top: 0px;
  background: rgb(241, 223, 223);
  text-align: center;
  border-radius: 30px 30px 30px 30px;
  color: $gray-700;
  padding: 5px 10px;
  font-size: 0.8rem;
}
</style>
