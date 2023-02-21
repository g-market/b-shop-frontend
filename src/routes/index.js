import { createRouter, createWebHistory } from 'vue-router'
import member from '@/store/member'
import HomeLayout from '@/views/layout/HomeLayout.vue'

const authCheck = async function (to, from, next) {
  try {
    if (!member.getters.isLogin) {
      this.$store.dispatch('member/REISSUE_ACCESS_TOKEN')
    }
  } catch (error) {
    location.href = import.meta.env.VITE_HIWORKS_LOGIN_PAGE
  }
  next()
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeLayout,
      children: [
        {
          path: '/',
          // beforeEnter: authCheck,
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: '/register',
          component: () => import('@/views/MemberRegisterView.vue'),
        },
      ],
    },
    {
      path: '/login/oauth2/code/hiworks',
      component: () => import('@/views/layout/AuthSuccess.vue'),
    },
  ],
})

export default router
