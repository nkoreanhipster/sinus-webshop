// import * as M from './mutationTypes'
// import * as API from '@/api'

// /**
//  * User Experience related, modal toggle and interactions
//  */
// export default {
//     state: {
//         isModalActive: {
//             login: false,           // Loginbox
//             cart: false,            // Cart för items
//             cover: false            // Täcker hela sidan med svart bakgrund
//         },
//         bannerSize: {
//             maxHeight: 353,
//             minHeight: 100
//         },
//     },
//     mutations: {
//         [M.SET_BANNER_SIZE](state, payload) {
//             state.bannerSize = { ...state.bannerSize, ...payload }
//         },

//         [M.TOGGLE_MODAL](state, nameOfModal) {
//             state.isModalActive[nameOfModal] = !state.isModalActive[nameOfModal]
//             Object.keys(state.isModalActive).filter(key => key !== nameOfModal).map(key => state.isModalActive[key] = false)
//         },

//         [M.CLOSE_ALL_MODALS](state) {
//             Object.keys(state.isModalActive).map(key => state.isModalActive[key] = false)
//         },
//     },
//     actions: {
//         toggleModal({ commit }, nameOfModal) {
//             commit(M.TOGGLE_MODAL, nameOfModal)
//         },

//         changeBannerSize({ commit }, payload) {
//             commit(M.SET_BANNER_SIZE, payload)
//         },

//         closeAllModals({ commit }, payload) {
//             commit(M.CLOSE_ALL_MODALS)
//         },

//         /**
//          * Reset default page view to defualt values
//          * BannerSize -> {}
//          * Modals -> false
//          */
//         resetInterface({ commit, dispatch }) {
//             dispatch('changeBannerSize', {
//                 maxHeight: 353,
//                 minHeight: 100
//             });
//             dispatch('closeAllModals')
//         },
//     },
//     getters: {
//         bannerSize: (state) => {
//             return state.bannerSize
//         },
//         modalStates: (state) => {
//             return state.isModalActive
//         },
//     }
// }