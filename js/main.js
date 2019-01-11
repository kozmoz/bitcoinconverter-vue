// Define all available currencies for conversion from and to Bitcoin.
const CURRENCIES = [
    {key: 'EUR', label: 'Euro', sign: '\u20ac'},
    {key: 'USD', label: 'US Dollar', sign: '$'}
];

// Conversion directions.
const DIRECTIONS = [
    {key: 'FROMBTC', label: 'Convert from bitcoin to $currency'},
    {key: 'TOBTC', label: 'Convert from $currency to bitcoin'}
];

/**
 * Component to select currency from a list of currencies.
 */
Vue.component('btc-select-currency', {
    props: {
        currency: String,
        currencies: Array
    },
    template: `
      <div class="form-group row">
        <label for="currencyField" class="col-sm-3 col-form-label">Currency</label>
        <div class="col-sm-9">
          <select 
          id="currencyField" 
          name="currencyField" 
          class="form-control"
          :value="currency"
          @change="$emit('update:currency', $event.target.value)">
            <option v-for="c in currencies" :value="c.key">
                {{c.label}} {{c.sign}}
            </option>
          </select>
        </div>  
      </div>
`
});

/**
 * Component to select the conversion direction.
 */
Vue.component('btc-select-conversiondir', {
    props: {
        currency: String,
        direction: String,
        directions: Array
    },
    template: `
      <div class="form-group row">
        <legend class="col-form-label col-sm-3 pt-0">Direction</legend>
        <div class="col-sm-9">
          <div class="form-check" v-for="d in directions">
            <input 
                type="radio"
                :id="'direction' + d.key" 
                name="direction"
                class="form-check-input"
                :value="d.key"
                :checked="direction === d.key" 
                @change="$emit('update:direction', $event.target.value)" />
            <label class="form-check-label" :for="'direction' + d.key">
              {{d.label.replace('$currency', currency)}}
            </label>
          </div>
        </div>
      </div>
`
});

/**
 * Component to enter the amount for the exchange.
 */
Vue.component('btc-input-amount', {
    props: {
        amount: Number || undefined,
        currency: String,
        direction: String
    },
    methods: {
        // Convert amount to number/undefined and emit an update event.
        update: function (value) {
            if (value === '') {
                this.$emit('update:amount', undefined);
            } else if (/^[0-9]+$/.test(value)) {
                this.$emit('update:amount', parseInt(value, 10));
            }
        }
    },
    template: `
      <div class="form-group row">
          <label for="amount" class="col-sm-3 col-form-label">Amount</label>
          <div class="col-sm-9">
            <div class="input-group w-75">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <template v-if="direction === 'FROMBTC'">&#x0e3f;</template>
                        <template v-else-if="currency === 'EUR'">€</template>
                        <template v-else="">$</template>
                    </span>
                </div>
                <input
                id="amount" 
                name="amount"
                type="text" 
                maxlength="10" 
                v-validate="'numeric'" 
                :value="amount" 
                @input="update($event.target.value)" 
                class="form-control" 
                :class="{'is-invalid': errors.has('amount')}"/>
                <div class="invalid-feedback" v-if="errors.has('amount')">Only numbers are allowed</div>
            </div>
            <small id="passwordHelpBlock" class="form-text text-muted">The amount is an integer</small>
          </div>
      </div>
`
});

/**
 * Component to calculate the final exchange rate.
 */
Vue.component('btc-conversion-result', {
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
            axios
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
    },
    template: `
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
`
});


Vue.use(VeeValidate /* vee-validate plugin. */);

// Start Vue.js app.
new Vue({
    el: '#app',
    data: {
        currency: 'EUR',
        direction: 'FROMBTC',
        amount: 1,
        CURRENCIES,
        DIRECTIONS
    }
});
