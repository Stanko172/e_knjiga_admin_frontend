import api from "../../api/api"

// State object
const state = {
    data: [],
    errors: [],
    loading: false
}

// Getter functions
const getters = {

}

// Actions 
const actions = {
    fetchAllData({ commit }){
        commit('SET_LOADING', true)
        api.get("/admin/dashboard/index")
        .then((response) => {
            commit('SET_DATA', response.data)
            commit('SET_LOADING', false)
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
        })
    },
}

// Mutations
const mutations = {
    SET_DATA: (state, data) => state.data = data,
    SET_ERRORS: (state, errors) => state.error = errors,
    SET_LOADING: (state, loading) => state.loading = loading
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
} 