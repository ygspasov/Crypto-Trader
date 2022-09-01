import { defineStore } from 'pinia';
const APIkey = process.env.VUE_APP_MY_ENV_VARIABLE;
export const useCriptoStore = defineStore('cryptoStore', {
  state: () => ({
    crypto: [],
  }),
  getters: {},
  actions: {
    async loadCrypto() {
      const response = await fetch(
        `https://api.nomics.com/v1/currencies/ticker?key=${APIkey}`
      );
      const responseData = await response.json();
      (this.cripto = []),
        responseData.forEach(el => {
          this.crypto.push({
            name: el.name,
            currency: el.currency,
            price: el.price,
            'price date': el.price_date,
            'number of exchanges': el.num_exchanges,
            'market cap': el.market_cap,
            'market cap dominance': el.market_cap_dominance,
            high: el.high,
            'high time stamp': el.high_timestamp,
          });
        });
      console.log(this.crypto);
      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch');
        throw error;
      }
    },
  },
});
