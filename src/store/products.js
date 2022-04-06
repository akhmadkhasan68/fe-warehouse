import $axios from "../services/api"

const state = () => ({
    dataProducts: [],
    dataDetailProduct: [],
    dataPaginateProducts: [],
    page: 1,
    keyword: ""
})

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.dataProducts = payload
    },

    ASSIGN_DATA_DETAIL(state, payload){
        state.dataDetailProduct = payload
    },
    
    ASSIGN_PAGINATE_DATA(state, payload) {
        state.dataPaginateProducts = payload
    },

    SET_PAGE(state, payload) {
        state.page = payload
    },

    SET_KEYWORD(state, payload) {
        state.keyword = payload
    },
 }
 
 const actions = {
    getPaginateDataProducts({state, commit}, payload){
        return new Promise((resolve, reject) => {
            $axios.get(`/operator/products/paginate`, {
                params: {
                    page: state.page,
                    keyword: state.keyword
                }
            }).then(response => {
                commit('ASSIGN_PAGINATE_DATA', response.data.data)
                resolve(response.data.data)
            }).catch(err => {
                reject(err);
            })
        })
    },
    getDataProducts({state, commit}, payload){
        return new Promise((resolve, reject) => {
            $axios.get(`/operator/products`, {
                params: {
                    page: state.page,
                    keyword: state.keyword
                }
            }).then(response => {
                commit('ASSIGN_DATA', response.data.data)
                resolve(response.data.data)
            }).catch(err => {
                reject(err);
            })
        })
    },
    getDetailProduct({state, commit}, payload){
        return new Promise((resolve, reject) => {
            $axios.get(`/operator/products/${payload}`)
            .then(response => {
                resolve(response.data.data)
            }).catch(err => {
                reject(err);
            })
        })
    }
 }
 
 export default {
    namespaced: true,
    state,
    actions,
    mutations
 }