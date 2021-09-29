import api from "../../api/api"

// State object
const state = {
    books: [],
    writers: [],
    genres: [],
    errors: [],
    loading: false
}

// Getter functions
const getters = {

}

// Actions 
const actions = {
    fetchAllBooks({ commit }){
        commit('SET_LOADING', true)
        api.get('admin/ebook/index')
        .then((response) =>{
            commit('SET_BOOKS', response.data)
            commit('SET_LOADING', false)
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
        api.post(`admin/ebook/update/${payload.id}`, payload)
        .then(() => {
            dispatch('fetchAllBooks', null)
            this._vm.$eventHub.$emit('success-notification', 'Knjiga uspješno spremljena');
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
            this._vm.$eventHub.$emit('error-notification', error);
        })
    },
    createBook({ commit, dispatch }, payload){
        api.post('admin/ebook/create', payload)
        .then(() => {
            dispatch('fetchAllBooks', null)
            this._vm.$eventHub.$emit('success-notification', 'Knjiga uspješno kreirana');
        })
        .catch((error) => {
            commit('SET_ERRORS', error)
            this._vm.$eventHub.$emit('error-notification', error);
        })
    },
    deleteBook({ commit, dispatch }, payload){
        api.post(`admin/ebook/delete/${payload}`)
        .then(() => {
            dispatch('fetchAllBooks', null)
            this._vm.$eventHub.$emit('success-notification', 'Knjiga uspješno izbrisana');
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