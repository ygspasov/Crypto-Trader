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
        { text: 'currency', value: 'paidForIn' },
        { text: 'price', value: 'priceOnTrade' },
        { text: 'referrence', value: 'opId' },
      ],
      purchases: store.singleTraderPurchases,
    };
  },
  created() {
    this.traderUid = this.store.traderUid;
    this.store.loadSingleTraderPurchases(this.traderUid);
  },
};
</script>
<style></style>
