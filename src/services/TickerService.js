import axios from 'axios';

/**
 * Moved to separate service so we can have a promise with return types (when using TypeScript).
 */
export default {

    /**
     * Get the BTC price for both EUR and USD.
     *
     * @return {Promise<Object>} The response with the date and prices
     */
    getTickerPrices() {

        return new Promise(function (resolve, reject) {

            // Todo: add timeout.

            axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
                .then(response => {
                    const result = {};
                    result.updated = new Date(response.data.time.updatedISO);
                    result.rateEUR = response.data.bpi.EUR.rate_float;
                    result.rateUSD = response.data.bpi.USD.rate_float;
                    resolve(result);
                })
                .catch(response => {
                    const loadError = JSON.stringify(response);
                    reject(loadError)
                });
        });
    }
}
