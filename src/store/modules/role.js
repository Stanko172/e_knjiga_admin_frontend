import api from "../../api/api"

// State object
const state = {
    roles: [],
    loading: false
}

// Getter functions
const getters = {

}

// Actions 
const actions = {
    getAllRoles({ commit }){
        commit('SET_LOADING', true)
        api.get("/admin/role/index")
        .then((response) => {
            commit('SET_ROLES', response.data)
            commit('SET_LOADING', false)
        })
    },
    createRole({ commit }, payload){
        commit('SET_LOADING', true)
        api.post("/admin/role/create", payload)
        .then((response) => {
            console.log(response.data)
            commit('SET_LOADING', false)
            this._vm.$eventHub.$emit('success-notification', 'Rola uspješno kreirana!');
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
        })
    },
    editRole({ commit }, payload){
        commit('SET_LOADING', true)
        api.post("/admin/role/edit", payload)
        .then((response) => {
            console.log(response.data)
            commit('SET_LOADING', false)
            this._vm.$eventHub.$emit('success-notification', 'Rola uspješno spremljena!');
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
        })
    },
    deleteRole({ commit }, payload){
        commit('SET_LOADING', true)
        api.delete(`/admin/role/delete/${payload}`)
        .then((response) => {
            console.log(response.data)
            commit('SET_LOADING', false)
            this._vm.$eventHub.$emit('success-notification', 'Rola uspješno izbrisana!');
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
        })
    }
}

// Mutations
const mutations = {
    SET_ROLES: (state, roles) => state.roles = roles,
    SET_LOADING: (state, loading) => state.loading = loading
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
} 