<template>
  <div class="container">
    <div class="row">
      <div class="col converter-block-title text-center text-white">
        <h2>{{ title }}</h2>

        <select-language></select-language>
      </div>
    </div>

    <div v-cloak id="app" class="row py-3 bg-light">
      <div class="col-sm-12 col-md-6">
        <form novalidate="novalidate">
          <!-- Reusable component, not dependent on data store. -->
          <select-currency :currencies="CURRENCIES" :currency="currency" @update:currency="updateCurrency"></select-currency>

          <select-conversion-direction :currency="currency" :direction="direction" :directions="DIRECTIONS" @update:direction="updateDirection">
          </select-conversion-direction>

          <input-amount :amount="amount" :currency="currencyForInput" class="mb-0" @update:amount="updateAmount"></input-amount>
        </form>
      </div>

      <div class="col-sm-12 col-md-6 m-auto bg-light">
        <div class="converter-block-result bg-white text-center px-3 py-3 my-3">
          <!-- Component reads the data from the store. -->
          <conversion-result></conversion-result>

          <p v-if="errors.items.length" class="mb-0 text-danger">
            {{ $t("message.form_error") }}
          </p>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <p>
          Example Vue.js web application, following this blog post:
          <a href="http://juur.link/2019/01/vue-js-angularjs-done-right-part-2/" target="_blank"
            >https://juur.link/2019/01/vue-js-angularjs-done-right-part-2/</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import SelectLanguage from './components/SelectLanguage';
import SelectCurrency from './components/SelectCurrency';
import SelectConversionDirection from './components/SelectConversionDirection';
import InputAmount from './components/InputAmount';
import ConversionResult from './components/ConversionResult';
import { CURRENCIES, CURRENCY_BTC, DIRECTION_FROMBTC, DIRECTIONS, SET_AMOUNT, SET_CURRENCY, SET_DIRECTION } from './domain/constants';
import { mapMutations, mapState } from 'vuex';

export default {
  computed: {
    // Actually we map those computed properties to the state in the global $store.
    // currency: function() { return this.$store.state.currency }
    ...mapState(['currency', 'direction', 'amount']),

    CURRENCIES: () => CURRENCIES,
    DIRECTIONS: () => DIRECTIONS,

    /**
     * Determine if we have to show 'USD', 'EUR' or 'BTC'.
     */
    currencyForInput: function() {
      if (this.direction === DIRECTION_FROMBTC) {
        return CURRENCY_BTC;
      } else {
        return this.currency;
      }
    },
    title: function() {
      return process.env.VUE_APP_TITLE;
    }
  },
  methods: {
    updateLanguage(e) {
      this.$i18n.locale = e.target.value;
    },
    // State! Actually a call this.$store.commit('SET_CURRENCY')
    ...mapMutations({
      updateCurrency: SET_CURRENCY,
      updateDirection: SET_DIRECTION,
      updateAmount: SET_AMOUNT
    })
  },
  components: {
    SelectLanguage,
    SelectConversionDirection,
    SelectCurrency,
    InputAmount,
    ConversionResult
  }
};
</script>

<style>
/* Import bootstrap styling. */
@import "~bootstrap/dist/css/bootstrap.min.css";

body {
  padding: 1em;
}

body > * {
  max-width: 1024px;
}

a {
  color: #42b983;
}

[v-cloak] {
  display: none;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.converter-block-title {
  background: linear-gradient(to bottom, #184791 0%, #00256f 100%);
}

.converter-block-result {
  border: 3px solid #00256f;
  border-radius: 10px;
}
</style>
