import Vue from 'vue'
import Vuex from 'vuex'
import transactions from './transactions'
import operators from './operators'
import units from "./units"
import categories from "./categories"
import items from "./items"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        
    },
    mutations: {
        
    },
    getters: {
        
    },
    actions: {
        
    },
    modules: {
        transactions, operators, units, categories, items
    }
})

export default store