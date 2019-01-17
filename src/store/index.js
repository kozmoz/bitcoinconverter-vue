import Vue from 'vue'
import Vuex from 'vuex'
import {
    CURRENCY_EUR,
    DIRECTION_FROMBTC,
    LOADING_STATUS_ERROR,
    LOADING_STATUS_LOADING,
    LOADING_STATUS_NOT_LOADING,
    SET_AMOUNT,
    SET_CURRENCY,
    SET_DIRECTION,
    SET_LOAD_ERROR,
    SET_LOADING_STATUS,
    SET_TICKER_PRICES
} from "../domain/constants";
import TickerService from "../services/TickerService";

Vue.use(Vuex);

// Conditional use the strict flag because it is expensive.
const strict = process.env.NODE_ENV !== 'production';

// Create the state management datastore.
export default new Vuex.Store({
    strict,
    state: {
        loadingStatus: LOADING_STATUS_NOT_LOADING,
        currency: CURRENCY_EUR,
        direction: DIRECTION_FROMBTC,
        amount: 1,

        tickerPrices: {
            updated: null /* Date object*/,
            rateEUR: null /* Number */,
            rateUSD: null /* Number */
        },
        loadErrorMessage: ''
    },
    mutations: {
        [SET_LOADING_STATUS](state, status) {
            state.loadingStatus = status;
        },
        [SET_TICKER_PRICES](state, prices) {
            // Replace complete object to detect changes.
            // https://vuex.vuejs.org/guide/mutations.html#mutations-follow-vue-s-reactivity-rules
            state.tickerPrices = prices;
        },
        [SET_LOAD_ERROR](state, loadErrorMessage) {
            state.loadErrorMessage = loadErrorMessage;
        },
        [SET_CURRENCY](state, currency) {
            // Todo: validate input.
            state.currency = currency;
        },
        [SET_DIRECTION](state, direction) {
            // Todo: validate input.
            state.direction = direction;
        },
        [SET_AMOUNT](state, amount) {
            // Todo: validate input.
            state.amount = amount;
        }
    },
    actions: {
        fetchTickerPrices(context) {
            console.log('==== fetchTickerPrices()');

            context.commit(SET_LOADING_STATUS, LOADING_STATUS_LOADING);
            TickerService.getTickerPrices().then(result => {
                console.log('==== result: ', result);
                if (result.updated) {
                    context.commit(SET_LOADING_STATUS, LOADING_STATUS_NOT_LOADING);
                    context.commit(SET_TICKER_PRICES, result);
                    context.commit(SET_LOAD_ERROR, '');
                } else {
                    context.commit(SET_LOADING_STATUS, LOADING_STATUS_ERROR);
                    context.commit(SET_LOAD_ERROR, result);
                }
            });
        }
    },
    // Cached results.
    getters: {
        calculatedResult: state => {
            if (!state.amount) {
                return 0;
            }

            if (state.direction === DIRECTION_FROMBTC) {
                // Convert BTC to currency.
                return state.currency === CURRENCY_EUR ?
                    state.amount * state.tickerPrices.rateEUR :
                    state.amount * state.tickerPrices.rateUSD;
            }
            return state.currency === CURRENCY_EUR ?
                state.amount / state.tickerPrices.rateEUR :
                state.amount / state.tickerPrices.rateUSD;
        }
    }
});
