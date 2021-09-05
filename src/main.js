import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { abilitiesPlugin } from '@casl/vue'
import ability from './services/ability'
import vuetify from './plugins/vuetify'
import Snotify from 'vue-snotify'; 
import 'vue-snotify/styles/material.css';

Vue.config.productionTip = false

//Global event hub
Vue.prototype.$eventHub = new Vue();

//Vue CASL
Vue.use(abilitiesPlugin, ability)

//Notifications UI
Vue.use(Snotify)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
