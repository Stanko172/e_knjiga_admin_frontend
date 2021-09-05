import api from "../../api/api"

// State object
const state = {
    users: [],
    loading: false
}

// Getter functions
const getters = {

}

// Actions 
const actions = {
    getAllUsers({ commit }){
        commit('SET_LOADING', true)
        api.get("/admin/user/index")
        .then((response) => {
            commit('SET_USERS', response.data)
            commit('SET_LOADING', false)
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
        })
    },
    createUser({ commit }, payload){
        commit('SET_LOADING', true)
        api.post("/admin/user/create", payload)
        .then((response) => {
            console.log(response.data)
            commit('SET_LOADING', false)
            this._vm.$eventHub.$emit('success-notification', 'Korisnik uspješno kreiran!');
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
        })
    },
    editUser({ commit }, payload){
        commit('SET_LOADING', true)
        api.post("/admin/user/edit", payload)
        .then((response) => {
            console.log(response.data)
            commit('SET_LOADING', false)
            this._vm.$eventHub.$emit('success-notification', 'Korisnik uspješno spremljen!');
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
        })
    },
    deleteUser({ commit }, payload){
        commit('SET_LOADING', true)
        api.delete(`/admin/user/delete/${payload}`)
        .then((response) => {
            console.log(response.data)
            commit('SET_LOADING', false)
            this._vm.$eventHub.$emit('success-notification', 'Korisnik uspješno izbrisan!');
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
        })
    }
}

// Mutations
const mutations = {
    SET_USERS: (state, users) => state.users = users,
    SET_LOADING: (state, loading) => state.loading = loading
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
} 