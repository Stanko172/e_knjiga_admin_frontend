import api from "../../api/api"

// State object
const state = {
    promotions: [],
    errors: [],
    loading: false
}

// Getter functions
const getters = {

}

// Actions 
const actions = {
    fetchAllPromotions({ commit }){
        commit('SET_LOADING', true)
        api.get("/admin/promotion/index")
        .then((response) => {
            commit('SET_PROMOTIONS', response.data)
            commit('SET_LOADING', false)
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
        })
    },
    updatePromotion({ commit, dispatch }, payload){
        api.post(`/admin/promotion/update/${payload.id}`, payload)
        .then(() => {
            dispatch('fetchAllPromotions', null)
            this._vm.$eventHub.$emit('success-notification', 'Promocija je uspješno spremljena!');
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
            commit('SET_ERRORS', error)
        })
    },
    createPromotion({ commit, dispatch }, payload){
        api.post('/admin/promotion/create', payload)
        .then(() => {
            dispatch('fetchAllPromotions', null)
            this._vm.$eventHub.$emit('success-notification', 'Promocija je uspješno kreirana!');
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
            commit('SET_ERRORS', error)
        })
    },
    deletePromotion({ commit, dispatch }, payload){
        api.post(`/admin/promotion/delete/${payload}`)
        .then(() => {
            dispatch('fetchAllPromotions', null)
            this._vm.$eventHub.$emit('success-notification', 'Promocija je uspješno izbrisana!');
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
            commit('SET_ERRORS', error)
        })
    }
}

// Mutations
const mutations = {
    SET_PROMOTIONS: (state, promotions) => state.promotions = promotions,
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