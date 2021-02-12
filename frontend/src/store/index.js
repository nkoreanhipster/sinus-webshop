import Vue from 'vue'
import Vuex from 'vuex'
import { fakeProducts } from './dummy-data.js'
import api from '@/api'
let { auth, register, products, order } = api

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],             // Produkter som kommer från databasen
    cart: [],                 // Produkt som kund lägger i sin cart, I stort sett identisk med produktObject 
    isAuthenticated: false,   // Triggar login-modal m.m.
    isModalActive: {
      login: false,           // Loginbox
      cart: false,            // Cart för items
      cover: false            // Täcker hela sidan med svart bakgrund
    },
    currentUser: {             // Hämtas vid inlogg, annars denna som default
      _id: '',
      name: 'Johan Kivi',
      role: 'anonymous',
      email: null,
      token: null,
      password: '',
      adress: {
        street: '',
        zip: '',
        city: ''
      },
      orderHistory: []
    }
  },
  mutations: {
    /**
     * Sätter produkten
     * @param {Array} payload 
     */
    SET_PRODUCTS(state, payload = []) {
      state.products = payload
    },

    /**
     * Lägg till produkt i db
     * @param {Object} payload 
     */
    ADD_PRODUCT(state, payload = {}) {
      state.products.push(payload)
    },

    /**
     * Ta bort från db
     * @param {Object} payload 
     */
    REMOVE_PRODUCT(state, payload = {}) {
      state.products = state.products.filter(x => x._id !== payload._id)
    },

    ADD_TO_CART(state, payload) {
      //payload.map(x => x.amount = 1)
      state.cart.push(payload)
    },

    REMOVE_FROM_CART(state, payload) {
      state.cart = state.cart.filter(x => x._id !== payload._id)
    },

    CLEAR_CART(state, payload) {
      state.cart = []
    },

    // Uppdatera kundvagnen.
    UPDATE_CART(state, payload) {
      var itemTobeUpdated = state.cart.find(p => p._id === payload._id);
      itemTobeUpdated = payload
    },

    // Login eller ej,. status
    TOGGLE_AUTH(state, payload) {
      state.isAuthenticated = !state.isAuthenticated
    },

    TOGGLE_MODAL(state, nameOfModal) {
      state.isModalActive[nameOfModal] = !state.isModalActive[nameOfModal]
      Object.keys(state.isModalActive).filter(key => key !== nameOfModal).map(key => state.isModalActive[key] = false)
    },

    SET_CURRENTUSER(state, payload) {
      let { user, token } = payload
      state.currentUser.role = user.role
      state.currentUser.email = user.email
      state.currentUser.token = token
    },
  },
  actions: {
    async loadProductsFromDB({ commit }) {
      let response = await products.getProducts()
      commit('SET_PRODUCTS', response)
    },

    async loadSingleProductbyId({ commit }, id) {
      let response = await products.getProduct(id)
      return response // Should be json
    },

    async insertNewProduct({ commit }, payload) {
      let response = await products.newProduct(payload)
      commit('ADD_PRODUCT', response)
    },

    async patchProduct({ commit }, payload) {
      let response = await products.patchProduct(payload)
      // todo;
      // Should this update product list? Call the get all action
      //
      return response
    },

    async deleteSingleProductbyId({ commit }, id) {
      let response = await products.deleteProduct(id)
      return response
    },

    async getAllOrders({ commit, state }) {
      let token = state.currentUser.token
      if (!token || typeof token === 'undefined') {
        return {
          message: "User not logged in"
        }
      }
      let response = await products.getListOfAllOrders(token)
      return response
    },

    async getUserOrderHistory({ commit, state }) {
     
      let response  = await order.getListOfAllOrders(state.currentUser.token)
      // {
      //   "items": [
      //     "243baSCUq5sJGwEg",
      //     "TVOvQePGV2B4kPhU"
      //   ],
      //   "timeStamp": 1613141407639,
      //   "status": "inProcess",
      //   "orderValue": 1798,
      //   "_id": "bPmN7ifxvkBL3lpx"
      // }
      state.currentUser.orderHistory = response
    },

    addProductToCart({ commit }, payload) {
      commit('ADD_TO_CART', payload)
    },

    async submitNewOrder({ commit, state }) {
      // Destruct id properties
      let ids = state.cart.map(item => item._id)
      let body = {
        _id: state.currentUser._id,
        timeStamp: Date.now(),
        status: 'inProcess',
        items: ids, // Array of product IDs
        orderValue: state.cart.reduce((a,b) => a.price+b.price)
      }

      let response = await order.submitNewOrder(body, state.currentUser.token)
      return response
    },

    /**
     * Pass data into endpoiunt
     * @param {Object} payload Data from login form
     */
    async tryAndLogin({ commit,state }, payload) {
      let response = await auth.tryLoginAttempt(payload)
      if (response.error)
        return response
      else if (response.token && response.user) {
        commit('SET_CURRENTUSER', response)
        commit('TOGGLE_AUTH', response)
        commit('TOGGLE_MODAL', 'login')
      }

      //let data = {role:'',isAuthenticated:true}; // todo; fake
      //;
    },

    async tryAndRegister({ commit }, payload) {
      let response = await register.registerNewUser(payload)
      if (response.error) {
        return response
      }
      else if (response.token && response.user) {
        return response
      }
      //commit('TOGGLE_AUTH', response);
    },

    toggleModal({ commit }, nameOfModal) {
      commit('TOGGLE_MODAL', nameOfModal)
    }
  },

  getters: {
    // Alla prdokuter
    productCatalog: (state) => {
      return state.products
    },

    modalStates: (state) => {
      return state.isModalActive
    },

    totalItemsInCart: state => {
      return state.cart.length
    },

    // Beräkna ihop kostnaden av alla produkter
    sumOfCartItems: (state) => {
      if (state.cart.length < 1) {
        return 0
      }
      let sum = state.cart.reduce((n, { price }) => n + price, 0)
      return sum
    },

    cart: state => {
      return state.cart
    },

    isAuthenticated: (state) => {
      return state.isAuthenticated ? true : false
    },

    orderHistory: (state) => {
      return state.currentUser.orderHistory
    }
  }
  // modules: {}
})
