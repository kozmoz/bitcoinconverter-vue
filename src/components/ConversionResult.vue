<template>
    <div>
        <div v-if="loading">Loading exchange rates...</div>
        <div v-else-if="!loadError">

            <h3>
                <template v-if="direction === 'TOBTC' && currency === 'EUR'">€</template>
                <template v-if="direction === 'TOBTC' && currency === 'USD'">$</template>
                {{amount || 0}}
                <template v-if="direction === 'FROMBTC'">BTC</template>
                =
                <template v-if="direction === 'FROMBTC' && currency === 'EUR'">€</template>
                <template v-if="direction === 'FROMBTC' && currency === 'USD'">$</template>
                {{calculatedResult | numberRound(direction === 'TOBTC' ? 5 : 2)}}
                <template v-if="direction === 'TOBTC'">BTC</template>
            </h3>
            <p class="mb-0">
                <small class="text-muted">The exchange rate is updated every minute</small>
            </p>
            <p class="mb-0">
                <small class="text-muted" v-if="update">
                    Last update at {{update | dateHHMM}}, 1 BTC =
                    <template v-if="currency === 'EUR'">€ {{rateEUR | numberRound(2)}}</template>
                    <template v-if="currency === 'USD'">$ {{rateUSD | numberRound(2)}}</template>
                    (buy)
                </small>
            </p>
        </div>
        <div v-else class="alert alert-danger" role="alert">{{loadError}}</div>
    </div>
</template>

<script>
    /**
     * Component to calculate the final exchange rate.
     */

    import PriceService from '../services/PriceService';

    export default {
        props: {
            amount: Number,
            currency: String,
            direction: String
        },
        data: () => ({
            loading: false,
            loadError: '',
            update: undefined,
            rateEUR: undefined,
            rateUSD: undefined
        }),
        // Vue.js mounted hook.
        mounted() {
            const updateExchangeRatePeriodically = () => {
                PriceService
                    .get('https://api.coindesk.com/v1/bpi/currentprice.json')
                    .then(response => {
                        this.loading = false;
                        this.loadError = '';
                        this.update = new Date(response.data.time.updatedISO);
                        this.rateEUR = response.data.bpi.EUR.rate_float;
                        this.rateUSD = response.data.bpi.USD.rate_float;
                    })
                    .catch(response => {
                        this.loading = false;
                        this.loadError = JSON.stringify(response);
                    });
                // Refresh the data every minute.
                setTimeout(updateExchangeRatePeriodically, 60000 /* One minute. */);
            };
            this.loading = true;
            updateExchangeRatePeriodically();
        },
        computed: {
            calculatedResult() {
                if (this.direction === 'FROMBTC') {
                    // Convert BTC to currency.
                    return this.currency === 'EUR' ? this.amount * this.rateEUR : this.amount * this.rateEUR;
                } else {
                    return this.currency === 'EUR' ? this.amount / this.rateEUR : this.amount / this.rateUSD;
                }
            }
        },
        filters: {
            dateHHMM(value) {
                if (!value) {
                    return '';
                }
                return ('00' + value.getHours()).substr(-2) + ':' +
                    ('00' + value.getMinutes()).substr(-2);
            },
            numberRound(value, decimals) {
                if (!value || !value.toFixed) {
                    return '';
                }
                return value.toFixed(decimals || 2);
            }
        }
    }
</script>
