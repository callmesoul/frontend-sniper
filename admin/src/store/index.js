import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null
  },
  mutations: {
    ['SET_TOKEN'](state,{ token }){
      localStorage.setItem('token', token);
      state.token = token;
    },
    ['LOG_OUT'](state){
      localStorage.removeItem('token');
      state.token = null;
    },
  },
  actions: {

  },
  modules: {

  }
})
