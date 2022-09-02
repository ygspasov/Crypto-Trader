export default {
  async loadCrypto() {
    const APIkey = process.env.VUE_APP_MY_ENV_VARIABLE;
    const response = await fetch(
      `https://api.nomics.com/v1/currencies/ticker?key=${APIkey}`
    );
    const responseData = await response.json();
    responseData.forEach(el => {
      el.price_date = new Date(el.price_date).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      });
      el.high_timestamp = new Date(el.high_timestamp).toLocaleDateString(
        'en-us',
        {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        }
      );
      this.crypto.push({
        id: el.id,
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
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch');
      throw error;
    }
  },
};
