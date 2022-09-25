<template>
  <div>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Crypto</th>
            <th class="text-left">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in portfolio" :key="item.cryptoName">
            <td>{{ item.cryptoName }}</td>
            <td>{{ item.amount }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
import { useCryptoStore } from '@/store/index';
export default {
  data() {
    const store = useCryptoStore();
    return {
      traderUid: '',
      store,
      portfolio: store.singleTraderPortfolio,
    };
  },
  created() {
    this.traderUid = this.store.traderUid;
    this.store.loadSingleTraderPortfolio();
  },
};
</script>
<style></style>
