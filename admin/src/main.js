import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/until/ant-desigan-vue-import'
import '@/assets/styles/global.scss'
import { apolloProvider } from '@/until/apollo-provider'


Vue.config.productionTip = false

new Vue({
  router,
  apolloProvider,
  store,
  render: h => h(App)
}).$mount('#app')
