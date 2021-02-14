// import * as Mutations from './mutationTypes'
// import * as API from '@/api'

// /**
//  * USer and auth related
//  */
// export default {
//     state: {},
//     mutations: {
//         SET_CURRENTUSER(state, payload) {
//             let { user, token } = payload
//             state.currentUser.role = user.role
//             state.currentUser.email = user.email
//             state.currentUser.token = token
//         },
//         TOGGLE_AUTH(state, payload) {
//             state.isAuthenticated = !state.isAuthenticated
//         },
//         UPDATE_USER(state, payload) {
//             state.currentUser = {...state.currentUser, ...payload}
//         },
//     },
//     actions: {
//         /**
//          * User form
//          * @param {Object} payload 
//          */
//         async tryAndLogin({ commit, state }, payload) {
//             let response = await API.auth.tryLoginAttempt(payload)
//             if (response.error)
//                 return response
//             else if (response.token && response.user) {
//                 console.log({response})
//                 commit('UPDATE_USER', response)
//                 commit('TOGGLE_AUTH', response)
//                 commit('TOGGLE_MODAL', 'login')
//             }
//         },

//         async tryAndRegister({ commit }, payload) {
//             let response = await API.register.registerNewUser(payload)
//             if (response.error) {
//                 return response
//             }
//             else if (response.token && response.user) {
//                 return response
//             }
//         },
//     },
//     getters: {
//         isAuthenticated: (state) => {
//             return state.isAuthenticated ? true : false
//         },
//     }
// }