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
      beforeEnter: authCheck,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: '/register',
          component: () => import('@/views/MemberRegisterView.vue'),
        },
        {
          path: '/me',
          component: () => import('@/views/MemberUpdateView.vue'),
        },
        {
          path: '/items/:id',
          component: () => import('@/views/ItemView.vue'),
        },
        {
          path: '/carts',
          component: () => import('@/views/CartView.vue'),
        },
        {
          path: '/orders',
          name: 'orders',
          component: () => import('@/views/OrderView.vue'),
        },
        {
          path: '/order-infos',
          component: () => import('@/views/OrderInfoView.vue'),
        },
        {
          path: '/orders/:id',
          component: () => import('@/views/OrderSuccessView.vue'),
        },
      ],
    },
    {
      path: '/login/oauth2/code/hiworks',
      component: () => import('@/views/layout/AuthSuccess.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

export default router
