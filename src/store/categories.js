import $axios from "../services/api"

const state = () => ({
    dataCategories: [],
    dataPaginateCategories: [],
    page: 1
})

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.dataCategories = payload
    },
    
    ASSIGN_PAGINATE_DATA(state, payload) {
        state.dataPaginateCategories = payload
    },

    SET_PAGE(state, payload) {
        state.page = payload
    },
 }
 
 const actions = {
    getDataCategories({state, commit}, payload){
        return new Promise((resolve, reject) => {
            $axios.get(`/category`).then(response => {
                commit('ASSIGN_DATA', response.data.data)
                resolve(response.data.data)
            }).catch(err => {
                reject(err);
            })
        })
    },
    getPaginateDataCategories({state, commit}, payload){
        return new Promise((resolve, reject) => {
            $axios.get(`/category/paginate`).then(response => {
                commit('ASSIGN_PAGINATE_DATA', response.data.data)
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