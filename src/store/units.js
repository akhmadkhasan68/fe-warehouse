import $axios from "../services/api"

const state = () => ({
    dataUnits: [],
    dataPaginateUnits: [],
    page: 1
})

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.dataUnits = payload
    },
    
    ASSIGN_PAGINATE_DATA(state, payload) {
        state.dataPaginateUnits = payload
    },

    SET_PAGE(state, payload) {
        state.page = payload
    },
 }
 
 const actions = {
    getDataUnits({state, commit}, payload){
        return new Promise((resolve, reject) => {
            $axios.get(`/unit`).then(response => {
                commit('ASSIGN_DATA', response.data.data)
                resolve(response.data.data)
            }).catch(err => {
                reject(err);
            })
        })
    },
    getPaginateDataUnits({state, commit}, payload){
        return new Promise((resolve, reject) => {
            $axios.get(`/unit/paginate`).then(response => {
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