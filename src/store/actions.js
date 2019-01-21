import {
    LOADING_STATUS_ERROR,
    LOADING_STATUS_LOADING,
    LOADING_STATUS_NOT_LOADING,
    SET_LOAD_ERROR,
    SET_LOADING_STATUS,
    SET_TICKER_PRICES
} from "../domain/constants";
import TickerService from "../services/TickerService";

let messages;

export default {
    fetchTickerPrices(context) {

        context.commit(SET_LOADING_STATUS, LOADING_STATUS_LOADING);
        TickerService.getTickerPrices()
            .then(resultObject => {
                context.commit(SET_LOADING_STATUS, LOADING_STATUS_NOT_LOADING);
                context.commit(SET_TICKER_PRICES, resultObject);
                context.commit(SET_LOAD_ERROR, '');
            })
            .catch(error => {
                context.commit(SET_LOADING_STATUS, LOADING_STATUS_ERROR);
                if (error.code) {
                    context.commit(SET_LOAD_ERROR, messages.t(`message.error_${error.code}`));
                } else {
                    context.commit(SET_LOAD_ERROR, error.message);
                }
            });
    },

    setMessageBundle(context, i18n) {
        messages = i18n;
    }
}
