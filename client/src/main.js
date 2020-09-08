import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "./plugins/clipboard.js";
import "./plugins/codemirror.js";
import "./plugins/element.js";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
