import api from "../../api/api"
import csrf from "../../api/csrf"
import router from "../../router";

// State object
const state = {
    user: null,
    registerErrors: null,
    loginErrors: null,
    isLoggedIn: false
}

// Getter functions
const getters = {

}

// Actions 
const actions = {
    async register({ commit }, form){
        await csrf.getCookie();
        api.post('/register', form).then((response) => {
            commit('UPDATE_REGISTER_RESPONSE', response)
        })
        .catch((error) => {
            commit('UPDATE_REGISTER_ERRORS', error)
        })
    },
    async login({ commit }, form){
        await csrf.getCookie();
        api.post('/login', form)
        .then((response) =>{
            localStorage.setItem("auth", "true")
            commit('SET_USER', response.data)
            router.push({name: 'Home'})
        })
        .catch((error) => {
            commit('UPDATE_LOGIN_ERRORS', error)
        })
    },
    async logout(){
        await csrf.getCookie();

        api.post('/logout')
        .then(() => {
            localStorage.removeItem("auth")
            router.push({name: 'Login'})
        })
    },
    getUser({ commit }){
        api.get("/user")
        .then((response) => {
            commit('SET_USER', response.data)
        })
    },
    checkLoginStatus({ commit }){
        const status = localStorage.getItem('auth')
        commit('SET_LOGIN_STATUS', status)
    }

}

// Mutations
const mutations = {
    SET_USER: (state, user) => state.user = user,
    UPDATE_REGISTER_ERRORS: (state, errors) => state.registerErrors = errors.response.data.errors,
    UPDATE_LOGIN_ERRORS: (state, errors) => state.loginErrors = errors.response.data.errors,
    SET_LOGIN_STATUS: (state, status) => state.isLoggedIn = status
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
} 