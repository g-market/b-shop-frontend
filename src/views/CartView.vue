<template>
  <main class="container">
    <!--Page Heading-->
    <h1 class="h3 mb-4 text-muted">장바구니</h1>

    <!-- Content Row -->
    <div class="row me-0">
      <div class="col-xl-8 col-lg-7">
        <div
          v-show="itemIds.length"
          class="card shadow mb-4"
          v-for="itemId in itemIds"
          :key="itemId"
        >
          <div class="card-header py-3">
            <h6 class="m-0 text-primary">
              {{ cartMap.get(itemId)[0].name }}
            </h6>
          </div>
          <div class="card-body">
            <ul>
              <li
                v-for="cartMapValue in cartMap.get(itemId)"
                :key="cartMapValue.itemOptionId"
              >
                <div class="row">
                  <div class="mb-2 col w-25 h-25">
                    <RouterLink
                      :to="`/items/${cartMapValue.itemId}`"
                      class="link__item"
                      target="_blank"
                    >
                      <!--        <img :src="item.thumbnail" alt="item 썸네일" class="rounded" />-->
                      <img
                        :src="cartMapValue.itemThumbnailUrl"
                        alt="item 썸네일"
                        class="rounded w-50"
                      />
                    </RouterLink>
                  </div>
                  <div class="option d-flex align-items-center col-3">
                    <span>
                      {{ cartMapValue.description }}
                      ({{ $filters.formatCurrency(cartMapValue.optionPrice) }})
                    </span>
                  </div>
                  <div class="amount d-flex align-items-center col-3">
                    <div
                      class="amount-control d-flex justify-content-center align-items-center"
                    >
                      <div
                        class="btn btn-gray d-inline-block"
                        @click="minusOrderCount(cartMapValue)"
                      >
                        -
                      </div>
                      <input
                        type="text"
                        name="qty"
                        :value="cartMapValue.orderCount"
                        :max="cartMapValue.stockQuantity"
                        maxlength="3"
                        class="w-25 text-center"
                      />
                      <div
                        class="btn btn-gray d-inline-block"
                        @click="addOrderCount(cartMapValue)"
                      >
                        +
                      </div>
                    </div>
                  </div>
                  <div
                    class="amount d-flex justify-content-end align-items-center col-3"
                  >
                    <div
                      class="price d-flex justify-content-end align-items-center"
                    >
                      <span>
                        {{
                          $filters.formatCurrency(
                            (cartMapValue.basePrice +
                              cartMapValue.optionPrice) *
                              cartMapValue.orderCount,
                          )
                        }}
                      </span>
                    </div>
                    <div class="text-end">
                      <a
                        class="ms-5 fw-bold x-button"
                        @click="deleteCart(cartMapValue)"
                      >
                        x
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Donut Chart -->
      <div class="col-xl-4 col-lg-5">
        <div class="card shadow mb-4">
          <!-- Card Header - Dropdown -->
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">결제 정보</h6>
          </div>
          <!-- Card Body -->
          <div class="card-body mt-1">
            <div class="order-info d-flex flex-column">
              <div class="d-flex justify-content-between mb-2">
                <span class="text-muted">상품수</span>
                <div>{{ getTotalCount() }}개</div>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span class="text-muted">상품금액</span>
                <div>{{ $filters.formatCurrency(getTotalPrice()) }}</div>
              </div>
              <div class="d-flex justify-content-between">
                <span class="text-muted">배송비</span>
                <div>{{ $filters.formatCurrency(info.deliveryPrice) }}</div>
              </div>
              <hr />
              <div class="d-flex justify-content-between mb-2">
                <span class="fw-bold fs-5">총 결제금액</span>
                <div class="fw-bold fs-5">
                  {{ $filters.formatCurrency(getTotalPrice()) }}
                </div>
              </div>
              <div class="p-2">
                <button
                  type="button"
                  class="btn btn-primary w-100 h-100 text-white"
                  @click="routeOrderView()"
                >
                  구매하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CartView',
  data() {
    return {
      cartMap: {},
      itemIds: [],
      info: {
        deliveryPrice: 0,
      },
    }
  },
  async created() {
    await this.$store.dispatch('cart/FETCH_CARTS')
    this.cartMap = new Map()
    this.carts.forEach(cart => {
      if (!this.cartMap.has(cart.itemId)) {
        this.cartMap.set(cart.itemId, [])
        // cartMap.keys() 새로 고침하면 에러가 발생..
        this.itemIds.push(cart.itemId)
      }
      this.cartMap.get(cart.itemId).push(cart)
    })
    for (const val of this.cartMap.values()) {
      console.log(val)
    }
  },
  computed: {
    ...mapState('cart', ['carts']),
  },
  methods: {
    addOrderCount(cartMapValue) {
      if (cartMapValue.orderCount === cartMapValue.stockQuantity) {
        alert(
          `[현재 재고] ${cartMapValue.stockQuantity}개 이하 만큼만 담을 수 있습니다.`,
        )
        return
      }
      cartMapValue.orderCount += 1
    },
    minusOrderCount(cartMapValue) {
      if (cartMapValue.orderCount === 1) {
        alert('최소 수량은 1개입니다.')
        return
      }
      cartMapValue.orderCount -= 1
    },
    async deleteCart(cartMapValue) {
      const isConfirmed = confirm('선택하신 상품을 삭제하시겠습니까?')
      if (!isConfirmed) {
        return
      }
      const data = {
        itemId: cartMapValue.itemId,
        itemOptionId: cartMapValue.itemOptionId,
      }
      await this.$store.dispatch('cart/DELETE_CART', data)

      const newCartMapValues = this.cartMap
        .get(cartMapValue.itemId)
        .filter(cart => cart.itemOptionId !== cartMapValue.itemOptionId)
      this.cartMap.set(cartMapValue.itemId, newCartMapValues)
      if (newCartMapValues.length === 0) {
        this.itemIds = this.itemIds.filter(
          itemId => itemId !== cartMapValue.itemId,
        )
      }
    },
    getTotalCount() {
      let totalCount = 0
      for (const itemId of this.itemIds) {
        const cartMapValue = this.cartMap.get(itemId)
        for (const { orderCount } of cartMapValue) {
          totalCount += orderCount
        }
      }
      return totalCount
    },
    getTotalPrice() {
      let totalPrice = 0
      for (const itemId of this.itemIds) {
        const cartMapValue = this.cartMap.get(itemId)
        for (const { basePrice, optionPrice, orderCount } of cartMapValue) {
          totalPrice += (basePrice + optionPrice) * orderCount
        }
      }
      return totalPrice
    },
    routeOrderView() {
      let selectedOptions = []
      for (const itemId of this.itemIds) {
        const cartMapValue = this.cartMap.get(itemId)
        for (const data of cartMapValue) {
          let selectedOption = {
            itemId: data.itemId,
            itemOption: {
              id: data.itemOptionId,
              optionPrice: data.optionPrice,
              description: data.description,
            },
            orderCount: data.orderCount,
            basePrice: data.basePrice,
            itemName: data.name,
            thumbnail: data.itemThumbnailUrl,
          }
          selectedOptions.push(selectedOption)
        }
      }
      this.$store.commit('order/setSelectedOptions', selectedOptions)
      this.$router.push('/orders')
    },
  },
}
</script>

<style lang="scss" scoped>
.btn-gray {
  background-color: #eee;
  padding: 0.3rem;
  margin: 0.1rem;
}
.x-button {
  font-size: 1.4rem;
}
</style>
