import $axios from "../services/api"

const state = () => ({
    dataOutlets: [],
    dataPaginateOutlets: [],
    page: 1,
    keyword: ""
})

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.dataOutlets = payload
    },
    
    ASSIGN_PAGINATE_DATA(state, payload) {
        state.dataPaginateOutlets = payload
    },

    SET_PAGE(state, payload) {
        state.page = payload
    },

    SET_KEYWORD(state, payload) {
        state.keyword = payload
    },
 }
 
 const actions = {
    getPaginateDataOutlets({state, commit}, payload){
        return new Promise((resolve, reject) => {
            $axios.get(`/operator/outlets/paginate`, {
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
 }
 
 export default {
    namespaced: true,
    state,
    actions,
    mutations
 }