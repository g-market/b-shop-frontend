<template>
  <main class="container-xl px-4 mt-4">
    <div class="card invoice">
      <div
        class="card-header p-4 p-md-5 border-bottom-0 bg-gradient-primary-to-secondary"
      >
        <div class="row gx-4 justify-content-between align-items-center">
          <div
            class="col-12 col-lg-auto mb-5 mb-lg-0 text-center text-lg-start"
          >
            <div class="h2 mb-0">
              <LogoComponent />
            </div>
          </div>
          <div class="col-12 col-lg-auto text-center text-lg-end">
            <div class="h3 text-primary">Invoice</div>
            #{{ orderInfoResponse.orderId }}
            <br />
            주문 일자 : {{ $filters.formatDate(orderInfoResponse.createdAt) }}
          </div>
        </div>
      </div>
      <div class="card-body p-4 p-md-5">
        <div class="table-responsive">
          <table class="table table-borderless mb-0">
            <thead class="border-bottom">
              <tr class="small text-uppercase text-muted">
                <th scope="col">상품 정보</th>
                <th scope="col" class="text-center">주문 일자</th>
                <th scope="col" class="text-center">주문 상태</th>
                <th scope="col" class="text-center">주문 금액(수량)</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border-bottom"
                v-for="orderItem in orderInfoResponse.orderItemList"
                :key="orderItem.itemOptionId"
              >
                <td>
                  <div class="item-wrapper d-flex">
                    <div class="item-thumbnail w-25 h-25">
                      <RouterLink
                        :to="`/items/${orderItem.itemId}`"
                        class="link__item"
                      >
                        <img
                          :src="orderItem.itemThumbnail"
                          alt="item 썸네일"
                          class="rounded w-50"
                        />
                      </RouterLink>
                    </div>
                    <div
                      class="itemInfo-wrapper d-flex flex-column justify-content-center"
                    >
                      <div class="">
                        {{ orderItem.itemName }}
                      </div>
                      <div class="description">
                        옵션 : {{ orderItem.itemOptionDescription }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="text-center">
                  {{ $filters.formatSimpleDate(orderInfoResponse.createdAt) }}
                </td>
                <td class="text-center">
                  {{
                    $filters.changeKoreanOrderStatus(
                      orderInfoResponse.orderStatus,
                    )
                  }}
                </td>
                <td class="">
                  <div
                    class="d-flex flex-column justify-content-center align-items-center"
                  >
                    <div>
                      {{
                        $filters.formatCurrency(
                          orderItem.price * orderItem.orderCount,
                        )
                      }}
                    </div>
                    <div class="description">{{ orderItem.orderCount }}개</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="3" class="text-end pb-0">
                  <div class="text-uppercase small fw-700 text-muted me-4">
                    상품금액:
                  </div>
                </td>
                <td class="text-end pb-0">
                  <div class="h5 mb-0 fw-700 me-4">
                    {{ $filters.formatCurrency(orderInfoResponse.totalPrice) }}
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="3" class="text-end pb-0">
                  <div class="text-uppercase small fw-700 text-muted me-4">
                    배송비:
                  </div>
                </td>
                <td class="text-end pb-0">
                  <div class="h5 mb-0 fw-700 me-4">
                    {{ $filters.formatCurrency(deliveryPrice) }}
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="3" class="text-end pb-0">
                  <div class="text-uppercase small fw-700 text-muted me-4">
                    총 결제 금액:
                  </div>
                </td>
                <td class="text-end pb-0">
                  <div class="h5 mb-0 fw-700 text-primary me-4">
                    {{
                      $filters.formatCurrency(
                        orderInfoResponse.totalPrice + deliveryPrice,
                      )
                    }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card-footer p-4 p-lg-5 border-top-0">
        <div class="row gx-4">
          <div class="col-md-6 col-lg-3 mb-4 mb-lg-0">
            <div class="small text-muted text-uppercase fw-700 mb-2">To</div>
            <div class="h6 mb-1">Company Name</div>
            <div class="small">가비아</div>
            <div class="small">경기도 성남시 분당구 대왕판교로 670</div>
          </div>
          <div class="col-md-6 col-lg-3 mb-4 mb-lg-0">
            <div class="small text-muted text-uppercase fw-700 mb-2">From</div>
            <div class="h6 mb-0">가비아 B-SHOP</div>
            <div class="small">유스페이슬몰2 B동</div>
            <div class="small">경기도 성남시 분당구 대왕판교로 670</div>
          </div>
          <div class="col-lg-6">
            <div class="small text-muted text-uppercase fw-700 mb-2">Note</div>
            <div class="small mb-0">오늘도 좋은 하루 되세요. 😃</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import LogoComponent from '@/components/LogoComponent.vue'
import { mapState } from 'vuex'

export default {
  name: 'OrderSuccessView',
  components: { LogoComponent },
  data() {
    return {
      deliveryPrice: 0,
    }
  },
  async created() {
    this.$store.dispatch('order/FETCH_ORDER', this.$route.params.id)
  },
  computed: {
    ...mapState('order', ['orderInfoResponse']),
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/main.scss';

.description {
  font-size: 0.8rem;
  color: $gray-500;
}
</style>
