import { CURRENCY_EUR, DIRECTION_FROMBTC } from '@/domain/constants';

export default {
  calculatedResult: state => {
    if (!state.amount) {
      return 0;
    }

    if (state.direction === DIRECTION_FROMBTC) {
      // Convert BTC to currency.
      return state.currency === CURRENCY_EUR ? state.amount * state.tickerPrices.rateEUR : state.amount * state.tickerPrices.rateUSD;
    }
    return state.currency === CURRENCY_EUR ? state.amount / state.tickerPrices.rateEUR : state.amount / state.tickerPrices.rateUSD;
  }
};
