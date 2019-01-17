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
            'inputamount-formtext-integer': 'Het aantal is een geheel getal'
        }
    }
};

export default new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages,
});
