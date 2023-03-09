<template>
  <main class="mt-5 pt-4">
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6 mb-4">
          <ItemCarousel />
        </div>
        <div class="col-md-6 mb-4 h-100">
          <div class="p-4">
            <div class="mb-3">
              <span class="badge bg-primary me-1">
                {{ item.year }}
              </span>
              <span class="badge bg-secondary me-1">
                {{ item.categoryDto.name }}
              </span>
            </div>

            <!--Item Simple Info-->
            <p class="item-title mb-4">${{ item.name }}</p>

            <div class="item-sale-info">
              <div aria-hidden="true" class="item-category">
                <div aria-hidden="true" class="item-category__icon">
                  <mdicon name="heart" />
                </div>
                <div class="item-buy__count">{{ item.itemStatus }}</div>
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

            <hr />
            <!--option-box-->
            <div class="buy-option-area">
              <div class="option-box">
                <select class="w-100" @change="addOption($event)">
                  <option disabled selected ref="default">옵션 선택</option>
                  <option
                    v-for="itemOption in item.itemOptionDtoList"
                    :key="itemOption.id"
                    :value="toString(itemOption)"
                    :class="{
                      disabled: isZeroStockQuantity(itemOption.stockQuantity),
                    }"
                  >
                    <template
                      v-if="isZeroStockQuantity(itemOption.stockQuantity)"
                    >
                      [품절] {{ itemOption.description }}(추가 가격:
                      {{ $filters.formatCurrency(itemOption.optionPrice) }})
                    </template>
                    <template v-else>
                      {{ itemOption.description }}(추가 가격:
                      {{ $filters.formatCurrency(itemOption.optionPrice) }})
                    </template>
                  </option>
                </select>
              </div>
              <div class="selected-option-wrapper">
                <ul v-if="selectedOptions.length !== 0">
                  <li
                    v-for="selectedOption in selectedOptions"
                    :key="selectedOption"
                    class="selected-option d-flex justify-content-between"
                  >
                    <div class="option d-flex align-items-center">
                      <span>
                        {{ selectedOption.itemOption.description }}
                        ({{
                          $filters.formatCurrency(
                            selectedOption.itemOption.optionPrice,
                          )
                        }})</span
                      >
                    </div>
                    <div class="amount w-50">
                      <div
                        class="amount-control d-flex justify-content-center align-items-center"
                      >
                        <div
                          class="btn btn-gray d-inline-block"
                          @click="minusOrderCount(selectedOption)"
                        >
                          -
                        </div>
                        <input
                          type="text"
                          name="qty"
                          :value="selectedOption.orderCount"
                          :max="selectedOption.itemOption.stockQuantity"
                          maxlength="3"
                          class="w-50 text-center"
                        />
                        <div
                          class="btn btn-gray d-inline-block"
                          @click="addOrderCount(selectedOption)"
                        >
                          +
                        </div>
                      </div>
                    </div>
                    <div
                      class="price d-flex justify-content-end align-items-center pe-2"
                    >
                      <span>
                        {{
                          $filters.formatCurrency(
                            (selectedOption.basePrice +
                              selectedOption.itemOption.optionPrice) *
                              selectedOption.orderCount,
                          )
                        }}
                      </span>
                    </div>
                    <a
                      class="m-2 d-flex justify-content-center align-items-center"
                      @click="deleteSelectedOption(selectedOption)"
                    >
                      x
                    </a>
                  </li>
                </ul>
                <div class="total-price mt-4" v-if="getTotalPrice > 0">
                  <p class="text-end">
                    총 상품 금액
                    <span class="ms-3 fs-2">{{
                      $filters.formatCurrency(getTotalPrice)
                    }}</span>
                  </p>
                </div>
              </div>

              <!--구매, 장바구니 button 제공-->
              <div class="btn-buy-wrapper d-flex w-100 mt-1">
                <button
                  type="button"
                  class="btn btn-buy w-50 me-3 text-black"
                  @click="routeOrders"
                >
                  바로구매
                </button>
                <button
                  type="button"
                  class="btn btn-cart w-50 text-black"
                  @click="openCreateCartMessage"
                >
                  <mdicon name="cart-outline" />
                </button>
                <!--장바구니 성공시에 메시지 제공-->
                <div
                  class="add-cart-layer w-100"
                  ref="add_cart"
                  style="display: none"
                >
                  <div class="cart">
                    <div class="cart-message">
                      장바구니에 상품이 담겼습니다.
                    </div>
                    <RouterLink to="/carts" class="route-cart">
                      장바구니로 가기
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div class="container-fluid">
        <div class="row">
          <!--Grid column-->
          <div class="col text-center">
            <p class="my-4 display-6 text-center">제품 상세 정보</p>
            <div>
              <span v-html="markdownToHtml" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ItemCarousel from '@/components/ItemCarousel.vue'
import { mapState } from 'vuex'
import _uniqBy from 'lodash/uniqBy'
import { marked } from 'marked'

export default {
  name: 'ItemView',
  components: { ItemCarousel },
  async created() {
    const itemId = this.$route.params.id
    this.$store.dispatch('item/FETCH_ITEM', itemId)
  },
  computed: {
    ...mapState('item', ['item']),
    getTotalPrice() {
      let totalPrice = 0
      for (const selectedOption of this.selectedOptions) {
        totalPrice +=
          (selectedOption.basePrice + selectedOption.itemOption.optionPrice) *
          selectedOption.orderCount
      }
      return totalPrice
    },
    markdownToHtml() {
      return marked(this.item.description)
    },
  },
  data() {
    return {
      selectedOptions: [],
    }
  },
  methods: {
    addOption(event) {
      const itemOption = JSON.parse(event.target.value)
      const itemId = Number(this.$route.params.id)
      const basePrice = this.item.basePrice
      const itemName = this.item.name
      const thumbnail = this.item.thumbnail
      const selected = {
        itemId,
        itemOption,
        orderCount: 1,
        basePrice,
        itemName,
        thumbnail,
      }
      const original = _uniqBy(this.selectedOptions, 'itemOption.id')
      this.selectedOptions.push(selected)
      const added = _uniqBy(this.selectedOptions, 'itemOption.id')
      if (original.length === added.length) {
        alert('이미 선택 되어 있는 옵션입니다')
        this.selectedOptions = original
      }
      this.$refs.default.selected = true
    },
    toString(obj) {
      return JSON.stringify(obj)
    },
    addOrderCount(selectedOption) {
      if (
        selectedOption.orderCount === selectedOption.itemOption.stockQuantity
      ) {
        alert(
          `[현재 재고] ${selectedOption.itemOption.stockQuantity}개 이하 만큼만 담을 수 있습니다.`,
        )
        return
      }
      selectedOption.orderCount += 1
    },
    minusOrderCount(selectedOption) {
      if (selectedOption.orderCount === 1) {
        alert('최소 수량은 1개입니다.')
        return
      }
      selectedOption.orderCount -= 1
    },
    routeOrders() {
      if (this.selectedOptions.length === 0) {
        alert('옵션을 선택해주세요.')
        return
      }
      this.$store.commit('order/setSelectedOptions', this.selectedOptions)
      this.$router.push('/orders')
    },
    async openCreateCartMessage() {
      if (this.selectedOptions.length === 0) {
        alert('옵션을 선택해주세요.')
        return
      }
      for (const selectedOption of this.selectedOptions) {
        const cartCreateRequest = {
          itemId: selectedOption.itemId,
          itemOptionId: selectedOption.itemOption.id,
          orderCount: selectedOption.orderCount,
        }
        await this.$store.dispatch('cart/CREATE_CART', cartCreateRequest)
      }
      const addCartObj = this.$refs.add_cart
      addCartObj.style.display = 'block'
      setTimeout(function () {
        addCartObj.style.display = 'none'
      }, 3000)
      this.selectedOptions = []
    },
    deleteSelectedOption(target) {
      this.selectedOptions = this.selectedOptions.filter(
        element => element.itemOption.id !== target.itemOption.id,
      )
    },
    isZeroStockQuantity(stockQuantity) {
      if (stockQuantity === 0) {
        return true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/main.scss';

.item-title {
  line-height: 1.2;
  font-weight: 500;
  font-size: 1.5rem;
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

    .item-status-name {
      font-size: 16px;
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

    .item-price__count {
      font-size: 16px;
    }
  }
}

.buy-option-area {
  margin-bottom: 0.5rem;
  width: 100%;
}

select {
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  color: #666;
  height: 1.5rem;
}

// button
.btn-gray {
  background-color: #eee;
  padding: 0.3rem;
  margin: 0.1rem;
}
.btn-buy {
  background-color: $secondary;
}
.btn-cart {
  background-color: $gray-400;
}

.buy-option-area {
  .selected-option-wrapper {
    font-size: 0.8rem;
    color: $gray-600;
  }
  .selected-option {
    border: 1px solid #ddd;
    .option {
      width: 30%;
      padding-left: 1rem;
    }
  }
}

.amount {
  display: flex;
}

.price {
  text-align: right;
}

.btn-buy-wrapper {
  position: relative;
}

.add-cart-layer {
  position: absolute;
  top: 40px;
  right: 0;
  background-color: #383838;
  border-radius: 1rem;
  padding: 1rem;
  .cart {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  z-index: 999;
  .cart-message {
    font-size: 1.3rem;
    font-weight: bold;
    color: white;
  }
  .route-cart {
    font-weight: bold;
    color: $primary;
  }
}
</style>
