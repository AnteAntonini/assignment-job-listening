import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        checkedTag: []
    },
    getters: {
        fetchTag: (state) => {
            return state.checkedTag
        }
    },
    mutations: {
        checkedTag(state, tag) {
            state.checkedTag.push(tag)
        }
    },
    actions: {
        dispatchTag(context, tag) {
            context.commit('checkedTag', tag)
        }
    },
    plugins: [createPersistedState()]
})