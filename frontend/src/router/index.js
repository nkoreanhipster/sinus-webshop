import Vue from 'vue'
import VueRouter from 'vue-router'
import Products from '../views/Products.vue'
import Checkout from '../views/Checkout.vue'
import Admin from '../views/Admin.vue'
import OrderDone from '../views/OrderDone.vue'
import Profile from '../views/Profile.vue'
import Register from '../views/Register.vue'
import Product from '../views/Product.vue'
import {getToken} from '@/lib/_helpers'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Products', component: Products },
  { path: '/products/:id', name: 'SpecificProduct', component: Product },
  { path: '/admin', name: 'Admin', component: Admin },
  { path: '/order-done', name: 'OrderDone', component: OrderDone },
  { path: '/checkout', name: 'Checkout', component: Checkout },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/register', name: 'Register', component: Register },
  { path: '*', redirect: '/' }, // Default fallback to '/'
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((from, to, next) => {
  console.log({ from, to, next, token:getToken() })
  next()
})

export default router
