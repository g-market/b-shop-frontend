<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
    <div class="container">
      <div class="header-item header-item__left">
        <LogoComponent class="pe-3" />
        <div class="nav nav-pills">
          <div v-for="nav in navigations" :key="nav.name" class="nav-item">
            <RouterLink
              :to="nav.href"
              active-class="active"
              :class="{ active: isMatch(nav.path) }"
              class="nav-link"
            >
              {{ nav.name }}
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="gabia-image">
        <img
          src="https://gabiaoffice.hiworks.com/gabia.com/common/logo"
          alt="gabia logo"
          @click="routeHome"
        />
      </div>
      <div class="header-item header-item__right">
        <div v-if="isLogin" class="member-info">
          <button
            type="button"
            class="member-profile-btn"
            :class="{ 'icon-btn__selected': isMemberDetailSelected }"
            @click="changeMemberDetailSelected"
          >
            <div class="photo">
              <img
                class="member-photo-30"
                :src="member.profileImageUrl"
                alt="멤버 이미지"
              />
            </div>
          </button>
          <div
            class="member-info-detail"
            tabindex="0"
            :style="showMemberDetail"
          >
            <div class="my-info">
              <div class="gt-float-left">
                <img
                  :src="member.profileImageUrl"
                  alt="member-img"
                  class="member-photo-75"
                />
              </div>
              <div class="info-wrapper mt-3">
                <p class="my-name">{{ member.name }}</p>
                <p class="my-email">{{ member.email }}</p>
              </div>
            </div>
            <div class="bottom-menu">
              <RouterLink to="/me" @click="routeMemberUpdate">
                <mdicon name="pencil" />
                회원 정보 수정
              </RouterLink>
              <a @click="logout">
                <mdicon name="logout" />
                로그아웃
              </a>
            </div>
          </div>
        </div>
        <div v-else @click="hiworksLogin">
          <mdicon name="login" />
          로그인
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import LogoComponent from '@/components/LogoComponent.vue'
import { mapGetters, mapState } from 'vuex'
import 'bootstrap'

export default {
  name: 'NavBar',
  components: { LogoComponent },
  data() {
    return {
      navigations: [
        {
          name: '장바구니',
          href: '/carts',
        },
        {
          name: '주문 조회',
          href: '/order-infos',
          path: /^\/order-infos/,
        },
      ],
      isShowMemberDetail: false,
      isMemberDetailSelected: false,
    }
  },
  computed: {
    showMemberDetail() {
      return this.isShowMemberDetail ? { display: '' } : { display: 'none' }
    },
    ...mapGetters('member', ['isLogin']),
    ...mapState('member', ['member']),
  },
  methods: {
    isMatch(path) {
      if (!path) return false
      return path.test(this.$route.fullPath)
    },
    hiworksLogin() {
      location.href = import.meta.env.VITE_HIWORKS_LOGIN_PAGE
    },
    changeMemberDetailSelected() {
      this.isMemberDetailSelected = !this.isMemberDetailSelected
      this.isShowMemberDetail = !this.isShowMemberDetail
    },
    async routeHome() {
      this.isMemberDetailSelected = !this.isMemberDetailSelected
      this.isShowMemberDetail = false

      this.$store.commit(
        'searchStatus/initSelectedYearAndSelectedCategoryAndItemName',
      )
      await this.$store.dispatch('item/FETCH_ITEMS', {
        year: 2023,
        category: null,
        itemName: null,
        page: 0,
      })
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      this.$router.push('/')
    },
    async logout() {
      if (confirm('로그아웃 하시겠습니까?')) {
        await this.$store.dispatch('member/LOGOUT')
        location.href = import.meta.env.VITE_HIWORKS_LOGIN_PAGE
      }
    },
    routeMemberUpdate() {
      this.isMemberDetailSelected = !this.isMemberDetailSelected
      this.isShowMemberDetail = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/main.scss';

nav {
  height: 70px;
  padding: 0 40px;
  border-bottom: 2px solid $gray-400;

  .header-item {
    //display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
  }

  .gabia-image {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      object-fit: contain;
      width: 150px;
      height: 33px;
    }
  }

  .header-item__left {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
  }

  .left-wrapper {
    display: flex;
    align-items: center;
  }

  .header-item__right {
    display: flex;
    justify-content: flex-end;
    position: relative;
  }
}

.member-info {
  width: 100%;
  display: flex;
  justify-content: flex-end;

  .member-profile-btn {
    width: 36px;
    height: 36px;
    border-radius: 4px;
    padding: 3px;
    position: relative;

    .member-photo-30 {
      display: block;
      width: 100%;
      border-radius: 100%;
    }
  }

  .icon-btn__selected {
    background-color: rgba(159, 166, 173, 0.2);
  }

  .member-info-detail {
    position: absolute;
    width: 350px;
    top: 52px;
    right: 0;
    z-index: 1;
    box-shadow: 2px 5px 4px 0 rgb(0 0 0 / 16%);
    margin-top: 0;
    padding: 1rem;
    background: #fff;
    border: 1px solid #909090;
    border-radius: 4px;

    .my-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 24px;
      margin-bottom: 24px;

      .gt-float-left {
        float: left !important;

        .member-photo-75 {
          display: block;
          width: 75px;
          height: 75px;
          border-radius: 50%;
        }
      }

      .info-wrapper {
        text-align: left;

        .my-name {
          font-size: 16px;
          font-weight: 600;
        }

        .my-email {
          font-size: 14px;
          margin-top: 8px;
          font-weight: 500;
        }
      }
    }

    .bottom-menu {
      text-align: left;
      display: flex;
      justify-content: space-between;

      a {
        font-size: 0.8rem;
        line-height: 1.2;
      }
    }
  }
}
</style>
