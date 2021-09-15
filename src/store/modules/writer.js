import api from "../../api/api"

// State object
const state = {
    writers: [],
    errors: [],
    loading: false
}

// Getter functions
const getters = {

}

// Actions 
const actions = {
    fetchAllWriters({ commit }){
        commit('SET_LOADING', true)
        api.get("/admin/writer/index")
        .then((response) => {
            commit('SET_WRITERS', response.data)
            commit('SET_LOADING', false)
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
        })
    },
    updateWriter({ commit, dispatch }, payload){
        api.post(`/admin/writer/update/${payload.id}`, payload)
        .then(() => {
            dispatch('fetchAllWriters', null)
            this._vm.$eventHub.$emit('success-notification', 'Pisac je uspješno spremljen!');
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
            commit('SET_ERRORS', error)
        })
    },
    createWriter({ commit, dispatch }, payload){
        api.post('/admin/writer/create', payload)
        .then(() => {
            dispatch('fetchAllWriters', null)
            this._vm.$eventHub.$emit('success-notification', 'Pisac je uspješno kreiran!');
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
            commit('SET_ERRORS', error)
        })
    },
    deleteWriter({ commit, dispatch }, payload){
        api.post(`/admin/writer/delete/${payload}`)
        .then(() => {
            dispatch('fetchAllWriters', null)
            this._vm.$eventHub.$emit('success-notification', 'Pisac je uspješno izbrisan!');
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
            commit('SET_ERRORS', error)
        })
    }
}

// Mutations
const mutations = {
    SET_WRITERS: (state, writers) => state.writers = writers,
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