import { SET_AMOUNT, SET_CURRENCY, SET_DIRECTION, SET_LOAD_ERROR, SET_LOADING_STATUS, SET_TICKER_PRICES } from '../domain/constants';

export default {
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
};
