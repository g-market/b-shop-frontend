<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const startDateFormat = startDate => {
  const day = startDate.getDate()
  const month = startDate.getMonth() + 1
  const year = startDate.getFullYear()

  return `${year}-${month}-${day}`
}

const endDateFormat = endDate => {
  const day = endDate.getDate()
  const month = endDate.getMonth() + 1
  const year = endDate.getFullYear()
  return `${year}-${month}-${day}`
}
</script>

<template>
  <main class="container-xl p-5 mt-5">
    <div class="card card-raised mb-5">
      <div class="card-header bg-transparent px-4">
        <div class="d-flex justify-content-between align-items-center">
          <div class="me-4">
            <h2 class="display-6 mb-0">주문 조회</h2>
            <div class="card-text">Details and history</div>
          </div>
        </div>
      </div>
      <div class="card-body p-4">
        <!-- Simple DataTables example-->
        <div class="table-filter row mb-4">
          <div class="period-list col-3">
            <div
              role="radiogroup"
              aria-label="기간 선택하기"
              class="radio-group"
            >
              <span aria-hidden="true" class="period-title"></span>
              <button
                v-for="period in periods"
                :key="period"
                :value="period"
                role="radio"
                aria-checked="true"
                :class="
                  isSelected(period)
                    ? 'period-item period-active'
                    : 'period-item'
                "
                @click="changeSelectedPeriod(period)"
              >
                {{ period }}
              </button>
            </div>
          </div>
          <VueDatePicker
            class="col"
            v-model="startDate"
            :format="startDateFormat"
            ref="startDate"
            utc
          />
          <VueDatePicker
            class="col"
            v-model="endDate"
            :format="endDateFormat"
            ref="startDate"
            utc
          />
          <button class="btn btn-primary col-2" @click="fetchOrderInfos">
            검색
          </button>
        </div>
        <div class="table-responsive">
          <table class="table table-borderless mb-0">
            <thead class="border-bottom">
              <tr class="small text-uppercase text-muted">
                <th scope="col">주문 정보</th>
                <th scope="col" class="text-center">주문 일자</th>
                <th scope="col" class="text-center">주문 상태</th>
                <th scope="col" class="text-center">주문 금액(수량)</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border-bottom"
                v-for="orderInfo in orders.orderInfoList"
                :key="orderInfo.orderId"
              >
                <td>
                  <div class="item-wrapper d-flex">
                    <div class="item-thumbnail w-25 h-25">
                      <RouterLink
                        :to="`/orders/${orderInfo.orderId}`"
                        class="link__order"
                      >
                        <img
                          :src="orderInfo.itemThumbnail"
                          alt="item 썸네일"
                          class="rounded w-50"
                        />
                      </RouterLink>
                    </div>
                    <div
                      class="itemInfo-wrapper d-flex flex-column justify-content-center"
                    >
                      <div class="">
                        {{ orderInfo.itemName }}
                      </div>
                      <div class="description">
                        옵션 : {{ orderInfo.orderStatus }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="text-center">
                  {{ $filters.formatSimpleDate(orderInfo.createdAt) }}
                </td>
                <td class="text-center">
                  {{ $filters.changeKoreanOrderStatus(orderInfo.orderStatus) }}
                </td>
                <!--                <td class="">-->
                <!--                  <div-->
                <!--                    class="d-flex flex-column justify-content-center align-items-center"-->
                <!--                  >-->
                <!--                    <div>-->
                <!--                      {{-->
                <!--                        $filters.formatCurrency(-->
                <!--                          orderItem.price * orderItem.orderCount,-->
                <!--                        )-->
                <!--                      }}-->
                <!--                    </div>-->
                <!--                    <div class="description">{{ orderItem.orderCount }}개</div>-->
                <!--                  </div>-->
                <!--                </td>-->
                <!--              </tr>-->
                <!--              <tr>-->
                <!--                <td colspan="3" class="text-end pb-0">-->
                <!--                  <div class="text-uppercase small fw-700 text-muted">-->
                <!--                    상품금액:-->
                <!--                  </div>-->
                <!--                </td>-->
                <!--                <td class="text-end pb-0">-->
                <!--                  <div class="h5 mb-0 fw-700">-->
                <!--                    {{ $filters.formatCurrency(orderInfoResponse.totalPrice) }}-->
                <!--                  </div>-->
                <!--                </td>-->
                <!--              </tr>-->
                <!--              <tr>-->
                <!--                <td colspan="3" class="text-end pb-0">-->
                <!--                  <div class="text-uppercase small fw-700 text-muted">-->
                <!--                    배송비:-->
                <!--                  </div>-->
                <!--                </td>-->
                <!--                <td class="text-end pb-0">-->
                <!--                  <div class="h5 mb-0 fw-700">-->
                <!--                    {{ $filters.formatCurrency(deliveryPrice) }}-->
                <!--                  </div>-->
                <!--                </td>-->
                <!--              </tr>-->
                <!--              <tr>-->
                <!--                <td colspan="3" class="text-end pb-0">-->
                <!--                  <div class="text-uppercase small fw-700 text-muted">-->
                <!--                    총 결제 금액:-->
                <!--                  </div>-->
                <!--                </td>-->
                <!--                <td class="text-end pb-0">-->
                <!--                  <div class="h5 mb-0 fw-700 text-primary">-->
                <!--                    {{-->
                <!--                      $filters.formatCurrency(-->
                <!--                        orderInfoResponse.totalPrice + deliveryPrice,-->
                <!--                      )-->
                <!--                    }}-->
                <!--                  </div>-->
                <!--                </td>-->
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
import { formatSimpleDate } from '@/utils/filters'
import { mapState } from 'vuex'

export default {
  name: 'OrderInfoView',
  async created() {
    this.$store.dispatch('order/FETCH_ORDERS', null)
    console.log(this.orders)
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      periods: ['1주일', '1개월', '3개월', '전체 시기'],
      selectedPeriod: '전체 시기',
      orderStatusList: ['전체 상태', 'ACCEPTED', 'COMPLETED', 'CANCELLED'],
    }
  },
  computed: {
    ...mapState('order', ['orders']),
  },
  methods: {
    isSelected(period) {
      if (period === this.selectedPeriod) {
        return true
      }
    },
    changeSelectedPeriod(period) {
      this.selectedPeriod = period
      this.endDate = new Date()
      this.startDate = new Date(this.endDate)
      if (period === '1주일') {
        this.startDate.setDate(this.endDate.getDate() - 7)
      } else if (period === '1개월') {
        this.startDate.setDate(this.endDate.getDate() - 30)
      } else if (period === '3개월') {
        this.startDate.setDate(this.endDate.getDate() - 90)
      } else {
        this.endDate = null
        this.startDate = null
      }
    },
    async fetchOrderInfos() {
      if (this.startDate == null || this.endDate == null) {
        alert('검색 기간을 설정해 주세요')
        return
      }
      const startDate = formatSimpleDate(this.startDate.toISOString())
      const endDate = formatSimpleDate(this.endDate.toISOString())
      const dateParam = {
        startDate,
        endDate,
      }
      this.$store.dispatch('order/FETCH_ORDERS', dateParam)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/main.scss';

.period-list {
  display: flex;
  gap: 0.8rem;

  .radio-group {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    gap: 0.125rem;
  }

  .period-title {
    font-size: 0.9rem;
    margin-right: 0.2rem;
  }

  .period-item {
    width: max-content;
    font-size: 13px;
    padding: 0.2rem 0.5rem;
    background-color: rgb(207, 207, 207);
    border-radius: 2rem;
    border: none;
    font-weight: 500;
    transition: all 300ms ease 0s;

    &.period-active {
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

.description {
  font-size: 0.8rem;
  color: $gray-500;
}
</style>
