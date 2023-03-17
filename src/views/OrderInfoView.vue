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
            model-type="yyyy-MM-dd'T'HH:mm:ss"
            :format="startDateFormat"
            ref="startDate"
            utc
          />
          <VueDatePicker
            class="col"
            v-model="endDate"
            model-type="yyyy-MM-dd'T'HH:mm:ss"
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
                <th scope="col">주문 번호</th>
                <th scope="col" class="text-center">주문 정보</th>
                <th scope="col" class="text-center">주문 일자</th>
                <th scope="col" class="text-center">주문 상태</th>
                <th scope="col" class="text-center">주문 금액</th>
                <th scope="col" class="text-center">주문 취소</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border-bottom"
                v-for="orderInfo in orders"
                :key="orderInfo.orderId"
              >
                <td class="text-center">
                  <RouterLink
                    :to="`/orders/${orderInfo.orderId}`"
                    class="link__order"
                  >
                    {{ orderInfo.orderId }}
                  </RouterLink>
                </td>
                <td class="item-info">
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
                      <RouterLink
                        :to="`/orders/${orderInfo.orderId}`"
                        class="link__order"
                      >
                        {{ orderInfo.itemName }}
                        <span class="description">
                          {{
                            showItemTotalCount(orderInfo.itemTotalCount - 1)
                          }}</span
                        >
                      </RouterLink>
                    </div>
                  </div>
                </td>
                <td class="text-center">
                  {{ $filters.formatSimpleDate(orderInfo.createdAt) }}
                </td>
                <td class="text-center">
                  {{ $filters.changeKoreanOrderStatus(orderInfo.orderStatus) }}
                </td>
                <td class="text-center">
                  {{ $filters.formatCurrency(orderInfo.totalPrice) }}
                </td>
                <td class="text-center">
                  <button
                    @click="cancelOrder(orderInfo.orderId)"
                    :class="
                      isAccepted(orderInfo.orderStatus)
                        ? 'btn cancel-btn'
                        : 'btn cancel-btn disabled'
                    "
                  >
                    주문 취소
                  </button>
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
  <section class="pt-5">
    <div class="row">
      <nav id="pagination" aria-label="Page navigation">
        <div
          role="radiogroup"
          aria-label="페이지 선택하기"
          class="radio-group pagination justify-content-center"
        >
          <button
            :class="
              page.first
                ? 'page-item page-link disabled'
                : 'page-item page-link'
            "
            @click="prevPage()"
          >
            Prev
          </button>
          <div
            class="d-inline btn-wrapper"
            v-for="pageNumber in page.totalPages"
          >
            <button
              :key="pageNumber"
              :value="pageNumber"
              role="radio"
              aria-checked="true"
              :class="
                isSelectedPage(pageNumber)
                  ? 'page-item page-link active'
                  : 'page-item page-link'
              "
              @click="changeSelectedPage(pageNumber)"
              v-show="
                Math.abs(pageNumber - (page.number + 1)) < 3 ||
                pageNumber === page.totalPages ||
                pageNumber === 1
              "
            >
              {{ pageNumber }}
            </button>
          </div>
          <button
            :class="
              page.last ? 'page-item page-link disabled' : 'page-item page-link'
            "
            @click="nextPage()"
          >
            Next
          </button>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { formatSimpleDate } from '@/utils/filters'
import moment from 'moment'

export default {
  name: 'OrderInfoView',
  async created() {
    const pageable = {
      page: this.page.number,
      size: this.size,
    }
    const searchParams = {
      orderSearchConditions: null,
      pageable,
    }
    const data = await this.$store.dispatch('order/FETCH_ORDERS', searchParams)
    this.setPage(data)
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      periods: ['1주일', '1개월', '3개월', '전체 시기'],
      selectedPeriod: '전체 시기',
      orderStatusList: ['전체 상태', 'ACCEPTED', 'COMPLETED', 'CANCELLED'],
      page: {
        number: 0,
        totalElements: 0,
        totalPages: 0,
        first: true,
        last: false,
      },
      size: 10,
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
        this.startDate = null
        this.endDate = null
      }
    },
    async fetchOrderInfos() {
      if (this.startDate == null && this.endDate == null) {
        this.startDate = null
        this.endDate = null
        const pageable = {
          page: 0,
          size: this.size,
        }
        const searchParams = {
          orderSearchConditions: null,
          pageable,
        }
        const data = await this.$store.dispatch(
          'order/FETCH_ORDERS',
          searchParams,
        )
        this.setPage(data)
        return data
      }
      if (this.startDate == null && this.endDate != null) {
        alert('시작일과 종료일을 둘 다 기입해주세요.')
        return
      }

      if (this.startDate != null && this.endDate == null) {
        alert('시작일과 종료일을 둘 다 기입해주세요.')
        return
      }

      if (moment(this.startDate).isAfter(this.endDate)) {
        alert('시작일은 종료일보다 클 수 없습니다.')
        return
      }
      const startDate = this.formatStartLocalDateTime(this.startDate)
      const endDate = this.formatEndLocalDateTime(this.endDate)
      const orderSearchConditions = {
        startDate,
        endDate,
      }
      const pageable = {
        page: 0,
        size: this.size,
      }
      const searchParams = {
        orderSearchConditions,
        pageable,
      }
      const data = await this.$store.dispatch(
        'order/FETCH_ORDERS',
        searchParams,
      )
      this.setPage(data)
      return data
    },
    showItemTotalCount(number) {
      if (number === 0) {
        return
      }
      return '외' + ` ${number}` + '건'
    },
    formatStartLocalDateTime(date) {
      let localDateTime = formatSimpleDate(date)
      return localDateTime + 'T00:00:00'
    },
    formatEndLocalDateTime(date) {
      let localDateTime = formatSimpleDate(date)
      return localDateTime + 'T23:59:59'
    },
    isSelectedPage(currPage) {
      if (this.page.number + 1 === currPage) {
        return true
      }
    },
    async changeSelectedPage(currPage) {
      this.page.number = currPage - 1
      const data = await this.fetchOrdersByPageMove()
      this.setPage(data)
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    },
    async prevPage() {
      this.page.number -= 1
      const data = await this.fetchOrderInfos()
      this.setPage(data)
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    },
    async nextPage() {
      this.page.number += 1
      const data = await this.fetchOrderInfos()
      this.setPage(data)
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    },
    async fetchOrdersByPageMove() {
      if (this.startDate == null && this.endDate == null) {
        this.startDate = null
        this.endDate = null
        const pageable = {
          page: this.page.number,
          size: this.size,
        }
        const searchParams = {
          orderSearchConditions: null,
          pageable,
        }
        const data = await this.$store.dispatch(
          'order/FETCH_ORDERS',
          searchParams,
        )
        this.setPage(data)
        return data
      }
      if (this.startDate == null && this.endDate != null) {
        alert('시작일과 종료일을 둘 다 기입해주세요.')
        return
      }

      if (this.startDate != null && this.endDate == null) {
        alert('시작일과 종료일을 둘 다 기입해주세요.')
        return
      }

      if (moment(this.startDate).isAfter(this.endDate)) {
        alert('시작일은 종료일보다 클 수 없습니다.')
        return
      }
      const startDate = this.formatStartLocalDateTime(this.startDate)
      const endDate = this.formatEndLocalDateTime(this.endDate)

      const orderSearchConditions = {
        startDate,
        endDate,
      }

      const pageable = {
        page: this.page.number,
        size: this.size,
      }
      const searchParams = {
        orderSearchConditions,
        pageable,
      }
      const data = await this.$store.dispatch(
        'order/FETCH_ORDERS',
        searchParams,
      )
      this.setPage(data)
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    },
    setPage(data) {
      this.page = {
        number: data.number,
        totalElements: data.totalElements,
        totalPages: data.totalPages,
        first: data.first,
        last: data.last,
      }
    },
    async cancelOrder(orderId) {
      const isConfirm = confirm(
        '주문 취소는 접수 상태에서만 가능합니다. 취소 하시겠습니까?',
      )
      if (isConfirm) {
        await this.$store.dispatch('order/CANCEL_ORDER', orderId)
      }
      const data = await this.fetchOrderInfos()
      this.setPage(data)
    },
    isAccepted(orderStatus) {
      return orderStatus === 'ACCEPTED'
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

.item-info {
  width: 60%;
}

.cancel-btn {
  background-color: $primary-btn;
  font-size: 0.9rem;
}
</style>
