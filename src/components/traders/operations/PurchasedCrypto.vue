<template>
  <div>
    <v-data-table
      dense
      :headers="headers"
      :items="purchases"
      item-key="opId"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>
<script>
import { useCryptoStore } from '@/store/index';
export default {
  data() {
    const store = useCryptoStore();
    return {
      store,
      traderUid: '',
      headers: [
        {
          text: 'Crypto',
          align: 'start',
          sortable: false,
          value: 'cryptoName',
        },
        { text: 'Amount', value: 'amount' },
        { text: 'Type', value: 'opType' },
        { text: 'Date', value: 'dateOfOperation' },
        { text: 'Currency', value: 'paidForIn' },
        { text: 'Price per 1', value: 'priceOnTrade' },
        { text: 'Total price', value: 'totalPrice' },
        { text: 'Referrence', value: 'opId' },
      ],
      purchases: store.singleTraderPurchases,
    };
  },
  created() {
    this.traderUid = this.store.traderUid;
    this.store.loadSingleTraderPurchases(this.traderUid);
    console.log(this.store.singleTraderPurchases);
  },
};
</script>
<style></style>
