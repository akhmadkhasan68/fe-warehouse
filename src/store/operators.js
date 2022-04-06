import $axios from "../services/api"

const state = () => ({
    dataOperators: [],
    dataPaginateOperators: [],
    page: 1,
    keyword: ""
})

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.dataOperators = payload
    },

    ASSIGN_DATA_PAGINATE(state, payload) {
        state.dataPaginateOperators = payload
    },

    SET_PAGE(state, payload) {
        state.page = payload
    },

    SET_KEYWORD(state, payload){
        state.keyword = payload
    }
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

    getPaginateDataOperators({state, commit}, payload){
        return new Promise((resolve, reject) => {
            $axios.get(`/operator/operators/paginate`, {
                params: {
                    page: state.page,
                    keyword: state.keyword,
                }
            }).then(response => {
                commit('ASSIGN_DATA_PAGINATE', response.data.data)
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