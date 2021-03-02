// Mutation methods.
export const SET_LOADING_STATUS = 'SET_LOADING_STATUS';
export const SET_TICKER_PRICES = 'SET_TICKER_PRICES';
export const SET_LOAD_ERROR = 'SET_LOAD_ERROR';
export const SET_CURRENCY = 'SET_CURRENCY';
export const SET_DIRECTION = 'SET_DIRECTION';
export const SET_AMOUNT = 'SET_AMOUNT';

export const LOADING_STATUS_ERROR = 'ERROR';
export const LOADING_STATUS_LOADING = 'LOADING';
export const LOADING_STATUS_NOT_LOADING = 'NOT_LOADING';

// Define all available currencies for conversion from and to Bitcoin.
export const CURRENCY_BTC = 'BTC';
export const CURRENCY_EUR = 'EUR';
export const CURRENCY_USD = 'USD';
export const CURRENCIES = [CURRENCY_EUR, CURRENCY_USD];

// Conversion directions.
export const DIRECTION_FROMBTC = 'FROMBTC';
export const DIRECTION_TOBTC = 'TOBTC';
export const DIRECTIONS = [DIRECTION_FROMBTC, DIRECTION_TOBTC];
