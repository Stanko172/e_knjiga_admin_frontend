import api from "../../api/api"

// State object
const state = {
    requests: [],
    request: {},
    loaded: false,
    confirmMessage: '',
    deleteMessage: ''
}

// Getter functions
const getters = {

}

// Actions 
const actions = {
    getAllRequests({ commit }){
        commit('SET_LOADED', false)
        api.get("/admin/membership_request/index")
        .then((response) => {
            commit('SET_REQUESTS', response.data)
            commit('SET_LOADED', true)
        })
    },
    confirmRequest({ commit, dispatch }, payload){
        commit('SET_LOADED', false)
        api.post("/admin/membership_request/store", payload)
        .then((response) => {
            dispatch('getAllRequests', null)
            commit('SET_CONFIRM_MESSAGE', response.data.message)
            commit('SET_REQUEST', response.data.request)
            commit('SET_LOADED', true)
        })
    },
    deleteRequest({ commit, dispatch }, payload){
        commit('SET_LOADED', false)
        api.post("/admin/membership_request/delete", payload)
        .then((response) => {
            dispatch('getAllRequests', null)
            commit('SET_DELETE_MESSAGE', response.data)
            commit('SET_LOADED', true)
        })
    }
}

// Mutations
const mutations = {
    SET_REQUESTS: (state, requests) => state.requests = requests,
    SET_REQUEST: (state, request) => state.request = request,
    SET_LOADED: (state, loaded) => state.loaded = loaded,
    SET_DELETE_MESSAGE: (state, message) => state.deleteMessage = message,
    SET_CONFIRM_MESSAGE: (state, message) => state.confirmMessage = message,
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
} 