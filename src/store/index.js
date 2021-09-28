import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userId: 0,

    },
    mutations: {
        chargeUser: function(state, payload) {
            state.userId = payload;
        }
    },
    actions: {
        chargeUserAction: function(context) {
            //context.commit
        }
    },
    modules: {},
    getters: {
        getId: function(state) {
            return state.userId;
        }
    }
})