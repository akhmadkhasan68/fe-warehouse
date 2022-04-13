import $axios from "../services/api"

const state = () => ({
    dataPaginateTransactions: [],
    dataDetailTransaction: [],
    page: 1,
})

const mutations = {
    ASSIGN_PAGINATE_DATA(state, payload) {
        state.dataPaginateTransactions = payload
    },
    
    ASSIGN_DETAIL_DATA(state, payload) {
        state.dataDetailTransaction = payload
    },

    SET_PAGE(state, payload) {
        state.page = payload
    },
 }
 
 const actions = {
    getPaginateDataTransactions({commit, state}, payload){
        return new Promise((resolve, reject) => {
            $axios.get(`/admin/transactions`, {
                params: payload
            })
            .then((response) => {
                commit('ASSIGN_PAGINATE_DATA', response.data.data)
                resolve(response.data.data)
            })
            .catch((error) => {
                reject(error)
            })
        })
    },
    getDetailTransaction({commit, state}, payload){
        return new Promise((resolve, reject) => {
            $axios.get(`/admin/transactions/${payload}`)
            .then(response => {
                commit('ASSIGN_DETAIL_DATA', response.data.data)
                resolve(response.data.data)
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    submitData({commit}, payload){
        return new Promise((resolve, reject) => {
            $axios.post(`/operator/transactions`, payload)
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                reject(error)
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