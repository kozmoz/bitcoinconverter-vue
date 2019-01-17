<template>
    <div class="container">
        <div class="row">
            <div class="col converter-block-title text-center text-white">

                <h2>{{title}}</h2>

                <!-- Todo: create component. -->
                <div class="position-absolute pr-2 language-selection">
                    <div class="form-group my-0">
                        <!--suppress HtmlFormInputWithoutLabel -->
                        <select class="form-control form-control-sm" :value="locale" @input="updateLanguage">
                            <option v-for="language of languages" :key="language" :value="language">
                                {{ $t(`message.${language}`) }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <div id="app" class="row py-3 bg-light" v-cloak>
            <div class="col-sm-12 col-md-6">
                <form novalidate="novalidate">

                    <p>$store.state.currency: {{$store.state.currency}}</p>
                    <p>$store.state.direction: {{$store.state.direction}}</p>
                    <p>$store.state.amount: {{$store.state.amount}}</p>
                    <p>$store.state.tickerPrices: {{$store.state.tickerPrices}}</p>

                    <!-- Reusable component, not dependent on data store. -->
                    <select-currency
                            :currencies="CURRENCIES"
                            :currency="currency"
                            @update:currency="updateCurrency">
                    </select-currency>

                    <select-conversion-direction
                            :directions="DIRECTIONS"
                            :currency="currency"
                            :direction="direction"
                            @update:direction="updateDirection">
                    </select-conversion-direction>

                    <input-amount
                            class="mb-0"
                            :amount="amount"
                            :currency="currencyForInput"
                            @update:amount="updateAmount">
                    </input-amount>

                </form>
            </div>

            <div class="col-sm-12 col-md-6 m-auto bg-light">
                <div class="converter-block-result bg-white text-center px-3 py-3">

                    <!-- Component reads the data from the store. -->
                    <conversion-result>
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
    import {
        CURRENCIES,
        DIRECTION_FROMBTC,
        DIRECTIONS,
        SET_AMOUNT,
        SET_CURRENCY,
        SET_DIRECTION
    } from "./domain/constants";
    import {mapMutations, mapState} from 'vuex';


    export default {
        computed: {
            // Actually we map those computed properties to the state in the global $store.
            // currency: function() { return this.$store.state.currency }
            ...mapState([
                'currency',
                'direction',
                'amount'
            ]),

            CURRENCIES: () => CURRENCIES,
            DIRECTIONS: () => DIRECTIONS,

            /**
             * Determine if we have to show 'USD', 'EUR' or 'BTC'.
             */
            currencyForInput: function () {
                if (this.direction === DIRECTION_FROMBTC) {
                    return 'BTC';
                } else {
                    return this.currency;
                }
            },
            languages: function () {
                return Object.keys(this.$i18n.messages);
            },
            title: function () {
                return process.env.VUE_APP_TITLE;
            },
            locale: function () {
                return this.$i18n.locale;
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
            SelectConversionDirection,
            SelectCurrency,
            InputAmount,
            ConversionResult
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
    .language-selection {
        right: 0;
        /* Vertical align. */
        top: 50%;
        transform: translateY(-50%)
    }

    .converter-block-title {
        background: linear-gradient(to bottom, #184791 0%, #00256f 100%);
    }

    .converter-block-result {
        border: 3px solid #00256f;
        border-radius: 10px;
    }
</style>