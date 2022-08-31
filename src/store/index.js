import { defineStore } from 'pinia';

export const useCriptoStore = defineStore('cryptoStore', {
  state: () => ({ crypto: ['BTC', 'ETH'] }),
  getters: {},
  actions: {},
});
