import Vue from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';

import './plugins/clipboard.js';
import './plugins/codemirror.js';
import './plugins/element.js';

import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === 'production'
    ? 'https://codebin-nest.herokuapp.com/api'
    : 'http://localhost:3000/api';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
