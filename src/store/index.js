import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import request from './modules/request'
import permission from './modules/permission'
import role from './modules/role'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    request,
    permission,
    role,
    user
  }
})
