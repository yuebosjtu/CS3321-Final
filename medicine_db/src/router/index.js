import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import VisitorDashboard from '../views/VisitorDashboard.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import QueryView from '../views/QueryView.vue'
import QueryResultView from '../views/QueryResultView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/visitor', component: VisitorDashboard },
  { path: '/admin', component: AdminDashboard },
  { path: '/query', component: QueryView },
  { path: '/query-result', component: QueryResultView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
