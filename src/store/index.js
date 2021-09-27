import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userId: 1
    },
    mutations: {},
    actions: {},
    modules: {},
    getters: {
        getId(state) {
            return state.userId;
        }
    }
})