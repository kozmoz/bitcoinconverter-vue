import Vue from 'vue'
import Vuex from 'vuex'
import {CURRENCY_EUR, DIRECTION_FROMBTC, LOADING_STATUS_NOT_LOADING} from "../domain/constants";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);

// Conditional use the strict flag because it is expensive.
const strict = process.env.NODE_ENV !== 'production';

// Create the state management datastore.
const store = new Vuex.Store({
    strict,
    state: {
        loadingStatus: LOADING_STATUS_NOT_LOADING,
        currency: CURRENCY_EUR,
        direction: DIRECTION_FROMBTC,
        amount: 1,

        tickerPrices: {
            updated: null /* Date */,
            rateEUR: null /* number */,
            rateUSD: null /* number */
        },
        loadErrorMessage: ''
    },
    actions,
    mutations,
    getters
});

export default store;

// Update the ticker prices every minute.
function fetchTickerPrices() {
    store.dispatch('fetchTickerPrices');
    setTimeout(fetchTickerPrices, 60000 /* One minute. */);
}
fetchTickerPrices();

