import Vue from 'vue'
import Vuex from 'vuex'
import { fakeProducts } from './dummy-data.js'
import api from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    // Produkter som kommer från databasen
    // Lista med object
    products: [],
    // Produkt som kund lägger i sin cart
    // I stort sett identisk med produktObject
    cart: [],
    // Triggar login-modal m.m.
    isAuthenticated: false,
    // '', 'user' eller 'admin'
    role: '',
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
      state.cart.push(...payload)
    },

    REMOVE_FROM_CART(state, payload) {
      state.cart = state.cart.filter(x => x._id !== payload._id)
    },

    // Uppdatera kundvagnen.
    UPDATE_CART(state, payload) {
      var itemTobeUpdated = state.cart.find(p => p._id === payload._id);
      itemTobeUpdated = payload
    },

    // Login eller ej,. status
    TOGGLE_AUTH(state, payload) {
      state.isAuthenticated = payload.isAuthenticated
      state.role = payload.role
    },
  },
  actions: {
    async loadProductsFromDB({ commit }) {
      //let response = await API.yayaya()
      //commit('SET_PRODUCTS', response)
      console.log('gör inget då ')
    },
    async load__FAKE__ProductsFromDB({ commit }) {
      commit('SET_PRODUCTS', fakeProducts)
    },

    addProductsToCart({ commit }, payload) {
      commit('ADD_TO_CART', payload)
    },

    /**
     * Pass data into endpoiunt
     * @param {Object} payload Data from login form
     */
    async tryAndLogin({ commit }, payload) {
      let response = await api.auth.tryLoginAttempt(payload)
      console.log('Action tru and login -->', { response })
      //let data = {role:'',isAuthenticated:true}; // todo; fake
      commit('TOGGLE_AUTH', response);
    },

    async tryAndRegister({ commit }, payload) {
      let response = await api.register.registerNewUser(payload)
      console.log('Action tryAndRegister-->', { response })
      //let data = {role:'',isAuthenticated:true}; // todo; fake
      commit('TOGGLE_AUTH', response);
    },
  },

  getters: {
    // Alla prdokuter
    productCatalog: (state) => {
      return state.products
    },

    itemsInCart: (state) => {
      return state.cart.length
    },

    cart: (state) => {
      return state.cart
    },

    isAuthenticated: (state) => {
      return state.isAuthenticated ? true : false
    },
  }
  // modules: {}
})
