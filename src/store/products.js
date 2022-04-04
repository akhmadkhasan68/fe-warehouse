import $axios from "../services/api"

const state = () => ({
    dataProducts: [],
    dataPaginateProducts: [],
    page: 1
})

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.dataProducts = payload
    },
    
    ASSIGN_PAGINATE_DATA(state, payload) {
        state.dataPaginateProducts = payload
    },

    SET_PAGE(state, payload) {
        state.page = payload
    },
 }
 
 const actions = {
    getPaginateDataProducts({state, commit}, payload){
        return new Promise((resolve, reject) => {
            $axios.get(`/operator/products`).then(response => {
                commit('ASSIGN_DATA', response.data.data)
                resolve(response.data.data)
            }).catch(err => {
                reject(err);
            })
        })
    },
 }
 
 export default {
    namespaced: true,
    state,
    actions,
    mutations
 }