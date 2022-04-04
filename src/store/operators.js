import $axios from "../services/api"

const state = () => ({
    dataOperators: [],
    page: 1
})

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.dataOperators = payload
    },

    SET_PAGE(state, payload) {
        state.page = payload
    },
 }
 
 const actions = {
    getDataOperators({state, commit}, payload){
        return new Promise((resolve, reject) => {
            $axios.get(`/operator/operators`).then(response => {
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