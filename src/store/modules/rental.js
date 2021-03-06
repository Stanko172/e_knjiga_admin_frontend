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
    fetchAllRentalRequests({ commit }){
        commit('SET_LOADING', true)
        api.get("/admin/rental_request/index")
        .then((response) => {
            commit('SET_DATA', response.data)
            commit('SET_LOADING', false)
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
        })
    },
    fetchAllRentalRequestsConfirmed({ commit }){
        commit('SET_LOADING', true)
        api.get("/admin/rental/index")
        .then((response) => {
            commit('SET_DATA', response.data)
            commit('SET_LOADING', false)
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
        })
    },
    acceptRentalRequest({ commit, dispatch }, payload){
        commit('SET_LOADING', true)
        api.post("/admin/rental_request/create", payload)
        .then((response) => {
            dispatch('fetchAllRentalRequests', null)
            commit('SET_LOADING', false)
            this._vm.$eventHub.$emit('success-notification', response.data.message);
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
        })
    },
    rejectRentalRequest({ commit, dispatch }, payload){
        commit('SET_LOADING', true)
        api.post("/admin/rental_request/delete", payload)
        .then((response) => {
            dispatch('fetchAllRentalRequests', null)
            commit('SET_LOADING', false)
            this._vm.$eventHub.$emit('success-notification', response.data.message);
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
        })
    },
    pickedUp({ commit, dispatch }, payload){
        commit('SET_LOADING', true)
        api.patch(`/admin/rental/picked_up/${payload}`)
        .then((response) => {
            dispatch('fetchAllRentalRequestsConfirmed', null)
            commit('SET_LOADING', false)
            this._vm.$eventHub.$emit('success-notification', response.data.message);
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
        })
    },
    returned({ commit, dispatch }, payload){
        commit('SET_LOADING', true)
        api.patch(`/admin/rental/returned/${payload}`)
        .then((response) => {
            dispatch('fetchAllRentalRequestsConfirmed', null)
            commit('SET_LOADING', false)
            this._vm.$eventHub.$emit('success-notification', response.data.message);
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