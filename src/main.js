import Vue from 'vue'
import App from './App'
import VeeValidate from "vee-validate";
import store from "./store";
import i18n from "./i18n/messages";

// https://vuejs.org/v2/api/#Global-Config
Vue.config.productionTip = false;

// Use the vee-validate plugin.
Vue.use(VeeValidate);

// Bootstrap the Vue app.
new Vue({
    el: '#app',
    i18n,
    store,
    render: createElement => createElement(App)
});

// Update the ticker prices every minute.
function fetchTickerPrices() {
    store.dispatch('fetchTickerPrices');
    setTimeout(fetchTickerPrices, 60000 /* One minute. */);
}
fetchTickerPrices();




