import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userId: 0,

    },
    mutations: {
        chargeUser: function(state, payload) {
            console.log("El payload es:", payload);
            state.userId = payload;
            console.log(state.userId)
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