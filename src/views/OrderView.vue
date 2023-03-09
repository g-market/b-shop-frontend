<template>
  <main class="container">
    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800">주문 결제</h1>
    <div class="row">
      <div class="col-lg-6">
        <!-- Circle Buttons -->
        <div class="card shadow mb-4">
          <div class="card-header py-3 text-center">
            <h6 class="m-0 text-primary">주문자 정보</h6>
          </div>
          <div class="card-body">
            <p class="p-2">
              <span class="me-3"><mdicon name="account" /></span>
              <span>{{ member.name }}</span>
            </p>
            <!-- Circle Buttons (Default) -->
            <p class="p-2">
              <span class="me-3"><mdicon name="email-multiple-outline" /></span>
              <span>{{ member.email }}</span>
            </p>
            <p class="p-2">
              <span class="me-3"><mdicon name="cellphone-sound" /></span>
              <span>{{ member.phoneNumber }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card shadow">
          <div class="card-header py-3 text-center">
            <h6 class="m-0 text-primary">
              주문 상품 {{ selectedOptions.length }}개
            </h6>
          </div>
          <div class="card-body">
            <ul>
              <li
                v-for="selectedOption in selectedOptions"
                :key="selectedOption.itemOption.id"
              >
                <OrderItemComponent :selectedOption="selectedOption" />
              </li>
            </ul>
          </div>
        </div>
        <div class="card shadow mt-2">
          <div class="card-header py-3 text-center">
            <h6 class="m-0 fw-bold text-primary">상품 주문하기</h6>
          </div>
          <div class="card-body pb-0">
            <p class="p-2 d-flex justify-content-between">
              <span class="me-3 fw-bold">상품금액</span>
              <span>{{ $filters.formatCurrency(getTotalPrice) }}</span>
            </p>
            <p class="ps-2 pe-2 d-flex justify-content-between">
              <span class="me-3 fw-bold">배송비</span>
              <span>{{ $filters.formatCurrency(getDeliveryPrice) }}</span>
            </p>
          </div>
          <hr />
          <div>
            <div class="ps-3 pe-3 pb-1">
              <p class="d-flex justify-content-between fs-5">
                <span class="me-3 fw-bold">총 결제 금액</span>
                <span>
                  {{
                    $filters.formatCurrency(getTotalPrice + getDeliveryPrice)
                  }}
                </span>
              </p>
            </div>
            <div class="p-2">
              <button
                type="button"
                class="btn btn-primary w-100 h-100 text-white"
                @click="orderItem()"
              >
                결제하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import OrderItemComponent from '@/components/OrderItemComponent.vue'

export default {
  name: 'OrderView',
  components: { OrderItemComponent },
  computed: {
    ...mapState('order', ['selectedOptions']),
    ...mapState('member', ['member']),
    getTotalPrice() {
      let totalPrice = 0
      for (const selectedOption of this.selectedOptions) {
        totalPrice +=
          (selectedOption.basePrice + selectedOption.itemOption.optionPrice) *
          selectedOption.orderCount
      }
      return totalPrice
    },
    getDeliveryPrice() {
      return 0
    },
  },
  methods: {
    async orderItem() {
      const orderItemList = []
      for (const selectedOption of this.selectedOptions) {
        orderItemList.push({
          itemId: selectedOption.itemId,
          itemOptionId: selectedOption.itemOption.id,
          orderCount: selectedOption.orderCount,
        })
      }
      const data = await this.$store.dispatch(
        'order/CREATE_ORDER',
        orderItemList,
      )
      if (this.$route.query.fromCart === 'true') {
        await this.$store.dispatch('cart/DELETE_CARTS', orderItemList)
      }
      alert('주문이 정상적으로 진행되었습니다.')
      this.$router.push(`/orders/${data.id}`)
    },
  },
}
</script>

<style lang="scss" scoped></style>
