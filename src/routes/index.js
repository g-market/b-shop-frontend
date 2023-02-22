import { createRouter, createWebHistory } from 'vue-router'
import HomeLayout from '@/views/layout/HomeLayout.vue'
import store from '@/store/index'

const authCheck = async function (to, from, next) {
  if (store.state.member.token === '') {
    location.href = import.meta.env.VITE_HIWORKS_LOGIN_PAGE
  }
  next()
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeLayout,
      children: [
        {
          path: '/',
          beforeEnter: authCheck,
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: '/register',
          beforeEnter: authCheck,
          component: () => import('@/views/MemberRegisterView.vue'),
        },
        {
          path: '/me',
          beforeEnter: authCheck,
          component: () => import('@/views/MemberUpdateView.vue'),
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
