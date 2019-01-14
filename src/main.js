import Vue from 'vue'
import App from './App'
import VeeValidate from "vee-validate";

// https://vuejs.org/v2/api/#Global-Config
Vue.config.productionTip = false;

// Use the vee-validate plugin.
Vue.use(VeeValidate);

// Bootstrap the Vue app.
new Vue({
    el: '#app',
    render: createElement => createElement(App),
});