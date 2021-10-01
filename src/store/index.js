import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import request from './modules/request'
import permission from './modules/permission'
import role from './modules/role'
import user from './modules/user'
import book from './modules/book'
import ebook from './modules/ebook'
import writer from './modules/writer'
import genre from './modules/genre'
import rental from './modules/rental'
import coupon from './modules/coupon'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    request,
    permission,
    role,
    user,
    book,
    ebook,
    writer,
    genre,
    rental,
    coupon
  }
})
