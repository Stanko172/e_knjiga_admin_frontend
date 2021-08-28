import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { abilitiesPlugin } from '@casl/vue'
import ability from './services/ability'

Vue.config.productionTip = false

//Global event hub
Vue.prototype.$eventHub = new Vue();

//Vue CASL
Vue.use(abilitiesPlugin, ability)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
