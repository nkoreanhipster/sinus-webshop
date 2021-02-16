import Vue from 'vue'
import Vuex from 'vuex'
// import productModule from './products.store'
// import userModule from './user.store'
// import uxModule from './ux.store'
// import orderModule from './orders.store'
import * as API from '@/api'
import * as M from './mutationTypes'

Vue.use(Vuex)

export default new Vuex.Store({
  // modules: {
  //   productModule, userModule, uxModule, orderModule
  // },
  state: {
    isAuthenticated: false,   // Triggar login-modal m.m.
    currentUser: {             // Hämtas vid inlogg, annars denna som default
      _id: '',
      name: '',
      role: '',
      email: null,
      token: null,
      password: '',
      adress: {
        street: '',
        zip: '',
        city: ''
      },
      orderHistory: []
    },

    products: [],             // Produkter som kommer från databasen
    cart: [],                 // Produkt som kund lägger i sin cart, I stort sett identisk med produktObject 
    isModalActive: {
      login: false,           // Loginbox
      cart: false,            // Cart för items
      cover: false            // Täcker hela sidan med svart bakgrund
    },
    bannerSize: {
      maxHeight: 353,
      minHeight: 100
    },

  },
  mutations: {
    /**
        * Sätter products för display
        * @param {Array} payload 
        */
    [M.SET_PRODUCTS](state, payload = []) {
      state.products = payload
    },

    /**
     * Lägger till product i display
     * @param {Object} payload 
     */
    [M.ADD_PRODUCT](state, payload = {}) {
      state.products.push(payload)
    },

    /**
     * Tar bort product från display. 
     * todo;
     * @param {Object} payload 
     */
    REMOVE_PRODUCT(state, payload = {}) {
      state.products = state.products.filter(x => x._id !== payload._id)
    },

    /**
     * Lägg till i kundvagnen
     * @param {Object} payload 
     */
    [M.ADD_TO_CART](state, payload) {
      //payload.map(x => x.amount = 1)
      state.cart.push(payload)
    },

    /**
     * Ta bort från kundvagnen
     * @param {Object} payload 
     */
    [M.REMOVE_FROM_CART](state, payload) {
      for (let cartItem of state.cart) {
        if (cartItem._id === payload._id) {
          state.cart.splice(state.cart.indexOf(cartItem), 1)
          break;
        }
      }
      // let index = state.cart.findIndex(x => x._id == payload._id)
      // console.log({index})
      // if(index < 0)return;
      // state.cart = state.cart.splice(index, 1) // Remove single
    },

    /**
     * Rensa kundvagnen
     */
    [M.CLEAR_CART](state) {
      state.cart = []
    },

    /**
     * Uppdatera kundvagnen.
     * todo; används eller funkar denna?
     * @param {*} payload 
     */
    // UPDATE_CART(state, payload) {
    //   var itemTobeUpdated = state.cart.find(p => p._id === payload._id);
    //   itemTobeUpdated = payload
    // },

    SET_CURRENTUSER(state, payload) {
      let { user, token } = payload
      state.currentUser.role = user.role
      state.currentUser.email = user.email
      state.currentUser.token = token
      state.currentUser.name = user.name
    },

    TOGGLE_AUTH(state, payload) {
      state.isAuthenticated = !state.isAuthenticated
    },

    UPDATE_USER(state, payload) {
      state.currentUser = { ...state.currentUser, ...payload }
    },

    [M.SET_BANNER_SIZE](state, payload) {
      state.bannerSize = { ...state.bannerSize, ...payload }
    },

    [M.TOGGLE_MODAL](state, nameOfModal) {
      state.isModalActive[nameOfModal] = !state.isModalActive[nameOfModal]
      Object.keys(state.isModalActive).filter(key => key !== nameOfModal).map(key => state.isModalActive[key] = false)
    },

    [M.CLOSE_ALL_MODALS](state) {
      Object.keys(state.isModalActive).map(key => state.isModalActive[key] = false)
    },
  },
  actions: {
    async loadProductsFromDB({ commit }) {
      let response = await API.products.getProducts()
      commit(M.SET_PRODUCTS, response)
    },

    async loadSingleProductbyId({ commit }, id) {
      let response = await API.products.getProduct(id)
      return response // Should be json
    },

    async addProduct({ commit, state }, payload) {
      let response = await API.products.newProduct(payload, state.currentUser.token)
      return response
    },

    async deleteProduct({ commit, dispatch, state }, id) {
      let token = state.currentUser.token
      let response = await API.products.deleteProduct(id, token)
      dispatch('loadProductsFromDB') // Reload products todo; Could probably use commit('UPDATE_CART') to avoid reloading whole db
      return response
    },

    async updateProduct({ commit, state }, payload) {
      let response = await API.products.patchProduct(payload, state.currentUser.token)
      return response
    },

    addProductToCart({ commit }, payload) {
      commit(M.ADD_TO_CART, payload)
    },

    removeFromCart({ commit }, payload) {
      commit(M.REMOVE_FROM_CART, payload)
    },

    clearCart({ commit }, payload) {
      commit(M.CLEAR_CART)
    },

    async getAllOrders({ commit, state }) {
      let token = state.currentUser.token
      if (!token || typeof token === 'undefined') {
        return {
          message: "User not logged in"
        }
      }
      let response = await API.order.getListOfAllOrders(token)
      return response
    },

    async getUserOrderHistory({ commit, state }) {
      let response = await API.order.getListOfAllOrders(state.currentUser.token)
      commit('UPDATE_USER', { orderHistory: response })
    },

    async submitNewOrder({ commit, state }) {
      // Destruct id properties
      let ids = state.cart.map(item => item._id)
      let body = {
        _id: state.currentUser._id,
        timeStamp: Date.now(),
        status: 'inProcess',
        items: ids, // Array of product IDs
        orderValue: state.cart.reduce((a, b) => a.price + b.price)
      }

      let response = await API.order.submitNewOrder(body, state.currentUser.token)
      return response
    },

    /**
    * User form
    * @param {Object} payload 
    */
    async tryAndLogin({ commit, state }, payload) {
      let response = await API.auth.tryLoginAttempt(payload)
      if (response.error)
        return response
      else if (response.token && response.user) {
        commit('SET_CURRENTUSER', response)
        commit('TOGGLE_AUTH', response)
        commit('TOGGLE_MODAL', 'login')
      }
    },

    async tryAndRegister({ commit }, payload) {
      let response = await API.register.registerNewUser(payload)
      return response
    },

    toggleModal({ commit }, nameOfModal) {
      commit(M.TOGGLE_MODAL, nameOfModal)
    },

    changeBannerSize({ commit }, payload) {
      commit(M.SET_BANNER_SIZE, payload)
    },

    closeAllModals({ commit }, payload) {
      commit(M.CLOSE_ALL_MODALS)
    },

    /**
     * Reset default page view to defualt values
     * BannerSize -> {}
     * Modals -> false
     */
    resetInterface({ commit, dispatch }) {
      dispatch('changeBannerSize', {
        maxHeight: 353,
        minHeight: 100
      });
      dispatch('closeAllModals')
    },
  },
  getters: {
    /**
     * Synliga produkter
     */
    productCatalog: (state) => {
      return state.products
    },

    /**
     * Orders. #Admin only
     */
    // orders: (state) => {
    //   return state.orders
    // },

    /**
     * Nuvarande cart
     * @param {Array} cart 
     */
    cart: state => {
      return state.cart
    },

    /**
     * Totalt antal varor i cart
     * @param {Number} length 
     */
    totalItemsInCart: state => {
      return state.cart.length
    },

    /**
     * Beräkna ihop kostnaden av alla produkter
     * @return {Number} sum 
     */
    sumOfCartItems: (state) => {
      if (state.cart.length < 1) {
        return 0
      }
      let sum = state.cart.reduce((n, { price }) => n + price, 0)
      return sum
    },

    orderHistory: (state, getters, rootState) => {
      // console.log('isAuthenticated', rootState.userModule.isAuthenticated)
      // console.log('currentUser', rootState.userModule.currentUser)
      // console.log('orderHistory', rootState.userModule.currentUser.orderHistory)
      return state.currentUser.orderHistory
    },

    isAuthenticated: (state) => {
      return state.isAuthenticated ? true : false
    },

    bannerSize: (state) => {
      return state.bannerSize
    },

    modalStates: (state) => {
      return state.isModalActive
    },

    currentUser: (state) => {
      return state.currentUser
    },

    userRole: (state) => {
      if (!state.currentUser.role) {
        return ''
      }
      return state.currentUser.role
    },
  }
})
