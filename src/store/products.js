import $axios from "../services/api"

const state = () => ({
    dataProducts: [],
    dataDetailProduct: [],
    dataPaginateProducts: [],
    page: 1,
    per_page: 10,
    keyword: "",
    category_id: ""
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
    
    SET_PER_PAGE(state, payload) {
        state.per_page = payload
    },

    SET_KEYWORD(state, payload) {
        state.keyword = payload
    },
    
    SET_CATEGORY(state, payload) {
        state.category_id = payload
    },
 }
 
 const actions = {
    getPaginateDataProducts({state, commit}, payload){
        let params = {
            page: state.page,
            keyword: state.keyword,
            per_page: state.per_page
        }
        if(state.category_id != "") params.category_id = state.category_id
        
        return new Promise((resolve, reject) => {
            $axios.get(`/operator/products/paginate`, {
                params: params
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
            $axios.get(`/operator/products`).then(response => {
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