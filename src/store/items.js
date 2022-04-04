import $axios from "../services/api"

const state = () => ({
    dataItems: [],
    dataPaginateItems: [],
    page: 1
})

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.dataItems = payload
    },
    
    ASSIGN_PAGINATE_DATA(state, payload) {
        state.dataPaginateItems = payload
    },

    SET_PAGE(state, payload) {
        state.page = payload
    },
 }
 
 const actions = {
    getPaginateDataItems({state, commit}, payload){
        return new Promise((resolve, reject) => {
            $axios.get(`/operator/products/paginate`, {
                params: {
                    page: state.page
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