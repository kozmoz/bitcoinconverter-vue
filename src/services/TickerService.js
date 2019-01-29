import axios from 'axios';

// Determine if we are in development mode.
const development = process.env.NODE_ENV !== 'production';

// The URL is proxied in vue.config.js.
const url = development ? '/stubs/currentprice.json' : 'https://api.coindesk.com/v1/bpi/currentprice.json';

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
            axios.get(url)
                .then(response => {
                    const result = {};
                    result.updated = new Date(response.data.time.updatedISO);
                    result.rateEUR = response.data.bpi.EUR.rate_float;
                    result.rateUSD = response.data.bpi.USD.rate_float;
                    resolve(result);
                })
                .catch(response => {
                    // Response with code or message (if reason is unknown).
                    if (response.code === 'ECONNABORTED') {
                        reject({code: response.code});
                    } else {
                        reject({message: response.message});
                    }
                });
        });
    }
}
