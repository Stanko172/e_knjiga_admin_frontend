import api from "../../api/api"

// State object
const state = {
    permissions: [],
    loading: false
}

// Getter functions
const getters = {

}

// Actions 
const actions = {
    getAllPermissions({ commit }){
        commit('SET_LOADING', true)
        api.get("/admin/permission/index")
        .then((response) => {
            commit('SET_PERMISSIONS', response.data)
            commit('SET_LOADING', false)
        })
    },
    savePermission({ commit, dispatch }, payload){
        commit('SET_LOADING', true)
        api.post("/admin/permission/save", payload)
        .then((response) => {
            console.log(response)
            dispatch('getAllPermissions', null)
            commit('SET_LOADING', false)
        })
    },
    deletePermission({ commit, dispatch }, payload){
        commit('SET_LOADING', true)
        api.delete(`/admin/permission/delete/${payload}`)
        .then((response) => {
            console.log(response)
            dispatch('getAllPermissions', null)
            commit('SET_LOADING', false)
        })
    }
}

// Mutations
const mutations = {
    SET_PERMISSIONS: (state, permissions) => state.permissions = permissions,
    SET_LOADING: (state, loading) => state.loading = loading,
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
} 