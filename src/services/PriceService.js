import axios from 'axios';

/**
 * Moved to separate service so we can have a promise with return types (when using TypeScript).
 */
export default {

    get() {
        return axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
    }
}
