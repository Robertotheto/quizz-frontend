import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import routes from './routes.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/questions',
      name: 'questions',
      component: () => import('../views/QuestionView.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/result',
      name: 'result',
      component: () => import('../views/ResultQuestionView.vue'),
      meta: {
        auth: true
      }
    }
  ]
})
router.beforeEach(routes)
export default router
