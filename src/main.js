// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios'

Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.$ajax = axios

// axios 配置

axios.defaults.timeout = 5000;

//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// axios.defaults.headers.post['Content-Type'] = 'json';

// axios.defaults.baseURL = 'http://localhost:8080/项目名/';

axios.defaults.baseURL = 'http://106.12.17.163:5560/';


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
