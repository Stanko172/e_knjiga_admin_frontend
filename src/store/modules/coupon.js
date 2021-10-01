import api from "../../api/api"

// State object
const state = {
    coupons: [],
    users: [],
    errors: [],
    loading: false
}

// Getter functions
const getters = {

}

// Actions 
const actions = {
    fetchAllCoupons({ commit }){
        commit('SET_LOADING', true)
        api.get("/admin/coupon/index")
        .then((response) => {
            commit('SET_COUPONS', response.data)
            commit('SET_LOADING', false)
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
        })
    },
    fetchAllUsers({ commit }){
        commit('SET_LOADING', true)
        api.get("/admin/coupon/users")
        .then((response) => {
            commit('SET_USERS', response.data)
            commit('SET_LOADING', false)
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
        }) 
    },
    updateCoupon({ commit, dispatch }, payload){
        api.post(`/admin/coupon/update/${payload.id}`, payload)
        .then(() => {
            dispatch('fetchAllCoupons', null)
            this._vm.$eventHub.$emit('success-notification', 'Kupon je uspješno spremljen!');
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
            commit('SET_ERRORS', error)
        })
    },
    createCoupon({ commit, dispatch }, payload){
        api.post('/admin/coupon/create', payload)
        .then(() => {
            dispatch('fetchAllCoupons', null)
            this._vm.$eventHub.$emit('success-notification', 'Kupon je uspješno kreiran!');
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
            commit('SET_ERRORS', error)
        })
    },
    deleteCoupon({ commit, dispatch }, payload){
        api.post(`/admin/coupon/delete/${payload}`)
        .then(() => {
            dispatch('fetchAllCoupons', null)
            this._vm.$eventHub.$emit('success-notification', 'Kupon je uspješno izbrisan!');
        })
        .catch((error) => {
            this._vm.$eventHub.$emit('error-notification', error);
            commit('SET_ERRORS', error)
        })
    }
}

// Mutations
const mutations = {
    SET_COUPONS: (state, coupons) => state.coupons = coupons,
    SET_USERS: (state, users) => state.users = users,
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