import Vue from 'vue'
import VueRouter from 'vue-router'
import DefaultLayout from '../layouts/default-layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: DefaultLayout,
    children: [
      { path: '/dashbord', name: 'dashbord', meta: { title: '主面板', icon: 'fund' }, component: () => import(/* webpackChunkName: "about" */ '../views/dashbord/dashbord.vue')},
      { path: '/app', name: 'app', meta: { title: '应用管理', icon: 'appstore' }, component: () => import(/* webpackChunkName: "about" */ '../views/app/index.vue')},
      { path: '/error', name: 'error', meta: { title: '错误管理', icon: 'file-excel' }, component: () => import(/* webpackChunkName: "about" */ '../views/error/index.vue')},
    ]
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
