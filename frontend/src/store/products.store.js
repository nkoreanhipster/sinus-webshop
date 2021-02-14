import * as M from './mutationTypes'
import * as API from '@/api'

/**
 * Product related
 */
export default {
    state: {
        products: [],             // Produkter som kommer från databasen
        cart: [],                 // Produkt som kund lägger i sin cart, I stort sett identisk med produktObject 
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
         * Tar bort product från display
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
            state.cart = state.cart.filter(x => x._id !== payload._id)
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
        UPDATE_CART(state, payload) {
            var itemTobeUpdated = state.cart.find(p => p._id === payload._id);
            itemTobeUpdated = payload
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

        // async insertNewProduct({ commit }, payload) {
        //     let response = await API.products.newProduct(payload)
        //     commit(M.ADD_PRODUCT, response)
        // },

        // async patchProduct({ commit }, payload) {
        //     let response = await API.products.patchProduct(payload)
        //     // todo;
        //     // Should this update product list? Call the get all action
        //     //
        //     return response
        // },

        // todo; should be used?
        // async deleteSingleProductbyId({ commit }, id) {
        //     let response = await API.products.deleteProduct(id)
        //     return response
        // },

        addProductToCart({ commit }, payload) {
            commit(M.ADD_TO_CART, payload)
        },
    },
    getters: {
        /**
         * Synliga produkter
         * @param {Array} products 
         */
        productCatalog: (state) => {
            return state.products
        },

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

    }
}