// Define all available currencies for conversion from and to Bitcoin.
const CURRENCIES = [
    {key: 'EUR', label: 'Euro', sign: '\u20ac'},
    {key: 'USD', label: 'US Dollar', sign: '$'}
];

const DIRECTIONS = [
    {key: 'TOBTC', label: 'Convert from bitcoin to $currency'},
    {key: 'FROMBTC', label: 'Convert from $currency to bitcoin'}
];

/**
 * Component to select currency from a list of currencies.
 */
Vue.component('btc-select-currency', {
    props: ['currency'],
    data: () => ({
        CURRENCIES
    }),

    template: `
      <div class="form-group">
        <label for="currencyField">Currency</label>

          <select 
          id="currencyField" 
          class="form-control w-50"
          :value="currency"
          @change="$emit('update:currency', $event.target.value)">
            <option v-for="c in CURRENCIES" :value="c.key">
                {{c.label}} {{c.sign}}
            </option>
          </select>
      </div>
`
});

/**
 * Component to select the conversion direction.
 */
Vue.component('btc-select-conversiondir', {
    props: ['currency', 'direction'],
    data: () => ({
        DIRECTIONS
    }),

    template: `
      <div class="form-group">
        <label>Direction</label>
        <div class="form-check" v-for="d in DIRECTIONS">
          <input 
              type="radio"
              :id="'direction' + d.key" 
              name="direction"
              class="form-check-input"
              :value="d.key"
              :checked="direction === d.key" 
              @change="$emit('update:direction', $event.target.value)" />
          <label class="form-check-label" :for="'direction' + d.key">
            {{d.label.replace('$currency',currency)}}
          </label>
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
        update: function (value) {
            if (value === '') {
                this.$emit('update:amount', undefined);
            } else if (/^[0-9]+$/.test(value)) {
                this.$emit('update:amount', parseInt(value, 10));
            }
        }
    },

    template: `
      <div class="form-group">
          <label for="amount">Amount</label>
          <div class="input-group w-50">
              <div class="input-group-prepend">
                  <span class="input-group-text">
                      <template v-if="direction === 'FROMBTC'">&#x0e3f;</template>
                      <template v-else-if="currency === 'EUR'">&#x20ac;</template>
                      <template v-else="">$</template>
                  </span>
              </div>
              <input
              id="amount" 
              name="amount"
              maxlength="10" 
              v-validate="'numeric'" 
              :value="amount" 
              @input="update($event.target.value)" 
              type="text" class="form-control" 
              :class="{'is-invalid': errors.has('amount')}"/>
              <div class="invalid-feedback" v-if="errors.has('amount')">Only numbers are allowed</div>
          </div>
          <small id="passwordHelpBlock" class="form-text text-muted">Type the desired amount in as an integer</small>
      </div>
`
});

Vue.use(VeeValidate);

// Start Vue.js app.
new Vue({
    el: '#app',
    data: {
        currency: CURRENCIES[0].key,
        direction: DIRECTIONS[0].key,
        amount: 1,
        updateerror: '',
        exchangerateupdate: undefined,
        exchangerateeur: undefined,
        exchangerateusd: undefined
    },
    computed: {
        calculatedResult: function () {
            return this.amount;
        }
    }
});
