export interface CurrencyList {
    code: string;
}

export const ISO_CURRENCIES_CODE: {[key: string]: CurrencyList} = {
    // Europa
    EUR: {code: 'EUR'},
    GBP: {code: 'GBP'},
    CHF: {code: 'CHF'},
    SEK: {code: 'SEK'},
    NOK: {code: 'NOK'},
    DKK: {code: 'DKK'},
    PLN: {code: 'PLN'},
    CZK: {code: 'CZK'},
    HUF: {code: 'HUF'},
    RON: {code: 'RON'},
    BGN: {code: 'BGN'},
    HRK: {code: 'HRK'},

    // Sudamérica
    ARS: {code: 'ARS'},
    BRL: {code: 'BRL'},
    CLP: {code: 'CLP'},
    COP: {code: 'COP'},
    PEN: {code: 'PEN'},
    UYU: {code: 'UYU'},
    PYG: {code: 'PYG'},
    BOB: {code: 'BOB'},
    VES: {code: 'VES'},

    // Norteamérica
    USD: {code: 'USD'},
    CAD: {code: 'CAD'},
    MXN: {code: 'MXN'},

    // Asia
    JPY: {code: 'JPY'},
    CNY: {code: 'CNY'},
    INR: {code: 'INR'},
    KRW: {code: 'KRW'},
    SGD: {code: 'SGD'},
    HKD: {code: 'HKD'},
    MYR: {code: 'MYR'},
    IDR: {code: 'IDR'},
    THB: {code: 'THB'},
    VND: {code: 'VND'},
    PKR: {code: 'PKR'},

    // Oceanía
    AUD: {code: 'AUD'},
    NZD: {code: 'NZD'},

    // África
    ZAR: {code: 'ZAR'},
    EGP: {code: 'EGP'},
    NGN: {code: 'NGN'},
    KES: {code: 'KES'},
    GHS: {code: 'GHS'},
};
