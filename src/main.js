import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { abilitiesPlugin } from '@casl/vue'
import ability from './services/ability'
import vuetify from './plugins/vuetify'
import Snotify from 'vue-snotify'; 
import 'vue-snotify/styles/material.css';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.config.productionTip = false

//Global event hub
Vue.prototype.$eventHub = new Vue();

//Vue CASL
Vue.use(abilitiesPlugin, ability)

//Notifications UI
Vue.use(Snotify)

//Loading overlay UI
Vue.use(VueLoading)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
