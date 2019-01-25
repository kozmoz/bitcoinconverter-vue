import Vue from 'vue'
import App from './App'
import VeeValidate from 'vee-validate';
import store from './store';
import i18n from './i18n/messages';
import axios from 'axios';

// https://vuejs.org/v2/api/#Global-Config
Vue.config.productionTip = false;

// Use the vee-validate plugin.
Vue.use(VeeValidate);

// Override default timeout for Axios (5 seconds).
axios.defaults.timeout = 5000;

// Bootstrap the Vue app.
var app = new Vue({
    el: '#app',
    i18n,
    store,
    render: createElement => createElement(App)
});

// The store needs to set localized (error) messages.
store.dispatch('setMessageBundle', i18n);
