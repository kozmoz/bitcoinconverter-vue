const express = require('express');

const {PORT = '3000'} = process.env;
const app = express();


app.use('/stubs/currentprice.json', (req, res) => {
    const data = {
        time: {
            updated: 'Jan 29, 2019 14:35:00 UTC',
            updatedISO: '2019-01-29T14:35:00+00:00',
            updateduk: 'Jan 29, 2019 at 14:35 GMT'
        },
        disclaimer: 'This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org',
        chartName: 'Bitcoin',
        bpi: {
            USD: {
                code: 'USD',
                symbol: '&#36;',
                rate: '3,422.7933',
                description: 'United States Dollar',
                rate_float: 3422.7933
            },
            GBP: {
                code: 'GBP',
                symbol: '&pound;',
                rate: '2,594.7786',
                description: 'British Pound Sterling',
                rate_float: 2594.7786
            },
            EUR: {
                code: 'EUR',
                symbol: '&euro;',
                rate: '2,995.6082',
                description: 'Euro',
                rate_float: 2995.6082
            }
        }
    };
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.send(JSON.stringify(data, null, 2));
});

const server = app.listen(PORT, function () {
    console.log('Express server listening on port ' + server.address().port);
});
