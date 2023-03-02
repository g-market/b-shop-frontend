<template>
  <div class="d-flex">
    <div class="item-thumbnail w-25 h-100 mb-2">
      <RouterLink :to="`/items/${item.id}`" class="link__item" target="_blank">
        <!--        <img :src="item.thumbnail" alt="item 썸네일" class="rounded" />-->
        <img
          src="https://gabiaoffice.hiworks.com/gabia.com/common/profile/me"
          alt="item 썸네일"
          class="rounded"
        />
      </RouterLink>
    </div>
    <div
      class="item-info d-flex flex-column justify-content-center align-items-start"
    >
      <div class="name">
        <span class="fw-bold">
          {{ selectedOption.itemName }}
        </span>
      </div>
      <div class="option">{{ selectedOption.itemOption.description }}</div>
      <div class="price">
        <span class="fw-bold"
          >{{
            $filters.formatCurrency(
              (selectedOption.basePrice +
                selectedOption.itemOption.optionPrice) *
                selectedOption.orderCount,
            )
          }}
        </span>
        <span> / {{ selectedOption.orderCount }}개 </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'OrderItemComponent',
  props: {
    selectedOption: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapState('item', ['item']),
  },
}
</script>

<style lang="scss" scoped>
.link__item {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
