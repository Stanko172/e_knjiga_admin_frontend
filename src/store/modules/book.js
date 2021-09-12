import api from "../../api/api"

// State object
const state = {
    books: [],
    writers: [],
    genres: [],
    errors: []
}

// Getter functions
const getters = {

}

// Actions 
const actions = {
    fetchAllBooks({ commit }){
        api.get('admin/book/index')
        .then((response) =>{
            commit('SET_BOOKS', response.data)
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
            this._vm.$eventHub.$emit('error-notification', error);
        })
    },
    fetchAllWriters({ commit }){
        api.get('admin/writer/index')
        .then((response) =>{
            commit('SET_WRITERS', response.data)
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
            this._vm.$eventHub.$emit('error-notification', error);
        })
    },
    fetchAllGenres({ commit }){
        api.get('admin/genre/index')
        .then((response) =>{
            commit('SET_GENRES', response.data)
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
            this._vm.$eventHub.$emit('error-notification', error);
        })
    },
    updateBook({ commit, dispatch }, payload){
        api.post(`admin/book/update/${payload.id}`, payload)
        .then(() => {
            dispatch('fetchAllBooks', null)
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
            this._vm.$eventHub.$emit('error-notification', error);
        })
    },
    createBook({ commit, dispatch }, payload){
        api.post('admin/book/create', payload)
        .then(() => {
            dispatch('fetchAllBooks', null)
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
            this._vm.$eventHub.$emit('error-notification', error);
        })
    },
    deleteBook({ commit, dispatch }, payload){
        api.post(`admin/book/delete/${payload}`)
        .then(() => {
            dispatch('fetchAllBooks', null)
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
            this._vm.$eventHub.$emit('error-notification', error);
        }) 
    }

}

// Mutations
const mutations = {
    SET_BOOKS: (state, books) => state.books = books,
    SET_WRITERS: (state, writers) => state.writers = writers,
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