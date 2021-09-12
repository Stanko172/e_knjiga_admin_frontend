import api from "../../api/api"

// State object
const state = {
    genres: [],
    errors: []
}

// Getter functions
const getters = {

}

// Actions 
const actions = {
    fetchAllGenres({ commit }){
        api.get("/admin/genre/index")
        .then((response) => {
            commit('SET_GENRES', response.data)
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
        })
    },
    updateGenre({ commit, dispatch }, payload){
        api.post(`/admin/genre/update/${payload.id}`, payload)
        .then(() => {
            dispatch('fetchAllGenres', null)
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
            commit('SET_ERRORS', error)
        })
    },
    createGenre({ commit, dispatch }, payload){
        api.post('/admin/genre/create', payload)
        .then(() => {
            dispatch('fetchAllGenres', null)
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
            commit('SET_ERRORS', error)
        })
    },
    deleteGenre({ commit, dispatch }, payload){
        api.post(`/admin/genre/delete/${payload}`)
        .then(() => {
            dispatch('fetchAllGenres', null)
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
            commit('SET_ERRORS', error)
        })
    }
}

// Mutations
const mutations = {
    SET_GENRES: (state, genres) => state.genres = genres,
    SET_ERRORS: (state, errors) => state.error = errors
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
} 