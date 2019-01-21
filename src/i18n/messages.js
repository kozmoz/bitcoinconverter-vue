import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

// Ready translated locale messages
const messages = {
    en: {
        message: {
            EUR_label: 'Euro',
            USD_label: 'Dollar',
            EUR_sign: '€',
            USD_sign: '$',
            BTC_sign: '฿',
            TOBTC_label: 'Convert from {currency} to Bitcoin',
            FROMBTC_label: 'Convert from Bitcoin to {currency}',
            nl: 'Nederlands',
            en: 'English',
            error_ECONNABORTED: 'Timeout connecting to ticker service',
            rate_updated: 'The exchange rate is updated every minute',
            rate_update_time: 'Last update at',
            currency: 'Currency',
            direction: 'Direction',
            amount: 'Amount',
            amount_error: 'Only numbers are allowed',
            form_error: 'Verify that everything is filled out correctly',
            'inputamount-formtext-integer': 'The amount is an integer'
        }
    },
    nl: {
        message: {
            EUR_label: 'Euro',
            USD_label: 'Dollar',
            EUR_sign: '€',
            USD_sign: '$',
            BTC_sign: '฿',
            TOBTC_label: 'Zet {currency} om naar Bitcoin',
            FROMBTC_label: 'Zet Bitcoin om naar {currency}',
            nl: 'Nederlands',
            en: 'English',
            error_ECONNABORTED: 'Timeout bij verbinden met ticker service',
            rate_updated: 'De wisselkoers wordt elke minuut bijgewerkt',
            rate_update_time: 'Laatste update om',
            currency: 'Valuta',
            direction: 'Richting',
            amount: 'Hoeveelheid',
            amount_error: 'Alleen getallen zijn toegestaan',
            form_error: 'Controleer of alles correct is ingevuld',
            'inputamount-formtext-integer': 'Het aantal is een geheel getal'
        }
    }
};

export default new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages,
});
