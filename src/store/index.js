import { defineStore } from 'pinia';
import actions from './actions/index.js';
import getters from './getters/index.js';

export const useCryptoStore = defineStore('cryptoStore', {
  state: () => ({
    accessToken: '',
    signedUp: false,
    traderName: '',
    traderEmail: '',
    traderUid: '',
    crypto: [],
    traders: [],
<<<<<<< HEAD
    singleTraderAccounts: {},
    singleTraderPurchases: {},
=======
    singleTraderAccounts: [],
    singleTraderPurchases: [],
    singleTraderPortfolio: [],
>>>>>>> 817aa5479d8059f7f58d0d8fcd24a8066dec378d
  }),
  getters,
  actions,
});
