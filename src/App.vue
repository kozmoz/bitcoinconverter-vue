<template>

    <div class="container">
        <div class="row">
            <div class="col converter-block-title text-center text-white">
                <h2>{{title}}</h2>
            </div>
        </div>

        <div id="app" class="row py-3 bg-light" v-cloak>
            <div class="col-sm-12 col-md-6">
                <form novalidate="novalidate">

                    <select-currency
                            :currencies="CURRENCIES"
                            :currency.sync="currency">
                    </select-currency>

                    <select-conversion-direction
                            :directions="DIRECTIONS"
                            :currency="currency"
                            :direction.sync="direction">
                    </select-conversion-direction>

                    <input-amount
                            class="mb-0"
                            :amount.sync="amount"
                            :currency="currency"
                            :direction="direction">
                    </input-amount>
                </form>
            </div>

            <div class="col-sm-12 col-md-6 m-auto bg-light">
                <div class="converter-block-result bg-white text-center px-3 py-3">

                    <conversion-result
                            :amount="amount"
                            :currency="currency"
                            :direction="direction">
                    </conversion-result>

                    <p class="mb-0 text-danger" v-if="errors.items.length">
                        Verify that everything is filled out correctly</p>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <p>Example Vue.js web application, following blog post:
                    <a href="https://juur.link/2019/01/vue-js-angularjs-done-right/" target="_blank">https://juur.link/2019/01/vue-js-angularjs-done-right/</a>
                </p>
            </div>
        </div>

    </div>
</template>

<script>
    import SelectCurrency from './components/SelectCurrency'
    import SelectConversionDirection from "./components/SelectConversionDirection";
    import InputAmount from "./components/InputAmount";
    import ConversionResult from "./components/ConversionResult";

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

    export default {
        data: () => ({
            title: process.env.VUE_APP_TITLE,
            currency: 'EUR',
            direction: 'FROMBTC',
            amount: 1,
            CURRENCIES,
            DIRECTIONS
        }),
        components: {
            SelectConversionDirection,
            SelectCurrency,
            InputAmount,
            ConversionResult
        },
        mounted() {
            // console.log('==== App title: ', process.env.VUE_APP_TITLE);
        }
    }
</script>

<style>
    /* Import bootstrap styling. */
    @import '~bootstrap/dist/css/bootstrap.min.css';

    body {
        padding: 1em;
    }

    body > * {
        max-width: 1024px;
    }

    [v-cloak] {
        display: none
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