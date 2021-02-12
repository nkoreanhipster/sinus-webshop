import Vue from 'vue'
import VueRouter from 'vue-router'
import Products from '../views/Products.vue'
import Checkout from '../views/Checkout.vue'
import Admin from '../views/Admin.vue'
import AdminProducts from '../views/AdminProducts.vue'
import OrderDone from '../views/OrderDone.vue'
import Profile from '../views/Profile.vue'
import Register from '../views/Register.vue'
import Test from '../views/_Test.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Products',
    component: Products
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/admin-products',
    name: 'AdminProducts',
    component: AdminProducts
  },
  { 
    path: '/order-done',
    name: 'OrderDone',
    component: OrderDone
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },{
    path: '/test',
    name: 'Test',
    component: Test
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
