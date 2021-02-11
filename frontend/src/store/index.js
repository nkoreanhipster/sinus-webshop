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
    curentUser: {             // Hämtas vid inlogg, annars denna som default
      role: '',
      email: null,
      token: null,
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
    },

    SET_CURRENTUSER(state, payload) {
      state.currentUser = payload
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

    // async load__FAKE__ProductsFromDB({ commit }) {
    //   commit('SET_PRODUCTS', fakeProducts)
    // },

    addProductToCart({ commit }, payload) {
      commit('ADD_TO_CART', payload)
    },

    async submitNewOrder({ commit }) {
      let _order = {
        items: this.state.cart,
        customer: '_____X',
        payment: true,
      }

      let response = await order.submitNewOrder(_order)
      return response
    },

    /**
     * Pass data into endpoiunt
     * @param {Object} payload Data from login form
     */
    async tryAndLogin({ commit }, payload) {
      let response = await auth.tryLoginAttempt(payload)
      console.log({ response })
      if (response.error)
        return response
      else if (response.token && response.user) {
        console.log('toggling')
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
  }
  // modules: {}
})
