// import * as Mutations from './mutationTypes'
// import * as API from '@/api'

// /**
//  * Order related
//  */
// export default {
//     // state: {},
//     // mutations: {},
//     actions: {
//         async getAllOrders({ commit, state }) {
//             let token = state.currentUser.token
//             if (!token || typeof token === 'undefined') {
//                 return {
//                     message: "User not logged in"
//                 }
//             }
//             let response = await API.products.getListOfAllOrders(token)
//             return response
//         },

//         async getUserOrderHistory({ commit, state }) {
//             console.log('XX',state.currentUser.token)
//             let response = await API.order.getListOfAllOrders(state.currentUser.token)
//             state.currentUser.orderHistory = response
//         },

//         async submitNewOrder({ commit, state }) {
//             // Destruct id properties
//             let ids = state.cart.map(item => item._id)
//             let body = {
//                 _id: state.currentUser._id,
//                 timeStamp: Date.now(),
//                 status: 'inProcess',
//                 items: ids, // Array of product IDs
//                 orderValue: state.cart.reduce((a, b) => a.price + b.price)
//             }

//             let response = await API.order.submitNewOrder(body, state.currentUser.token)
//             return response
//         },
//     },
//     getters: {
//         orderHistory: (state, getters, rootState) => {
//             // console.log('isAuthenticated', rootState.userModule.isAuthenticated)
//             // console.log('currentUser', rootState.userModule.currentUser)
//             // console.log('orderHistory', rootState.userModule.currentUser.orderHistory)
//             return rootState.currentUser.orderHistory
//         }
//     }
// }