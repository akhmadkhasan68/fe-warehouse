import $axios from "../services/api"

const state = () => ({
    datas: [],
    page: 1
})

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.datas = payload
    },

    SET_PAGE(state, payload) {
        state.page = payload
    },
 }
 
 const actions = {
    getDataTable({state, commit}, payload){
        return new Promise((resolve, reject) => {
            let search = typeof payload != 'undefined' ? payload:''
            $axios.get(`/transactions`, {params: {page: state.page, q: search}}).then(response => {
                commit('ASSIGN_DATA', response.data.data)
                resolve(response.data.data)
            }).catch(err => {
                reject(err);
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