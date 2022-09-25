<template>
  <div>
    <h3>The portfolio</h3>
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
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],
    };
  },
  created() {
    this.traderUid = this.store.traderUid;
    this.store.loadSingleTraderPortfolio();
  },
};
</script>
<style></style>
