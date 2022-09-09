<template>
  <v-container fluid>
    <the-header></the-header>
    <h2 class="font-weight-light d-flex justify-center mb-6">Traders:</h2>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Email</th>
            <th class="text-left">Premium</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="trader in traders" :key="trader.userId">
            <td>{{ trader.name }}</td>
            <td>{{ trader.email }}</td>
            <td>{{ isPremium(trader.premium) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import TheHeader from '../header/TheHeader.vue';
import { useCryptoStore } from '@/store/index';
export default {
  components: { TheHeader },
  data() {
    const store = useCryptoStore();
    return {
      store,
      traders: store.getTraders,
      traderEmail: store.traderEmail,
      traderName: store.getTraderName,
      isAuthenticated: store.isAuthenticated,
    };
  },
  created() {
    this.store.loadTraders();
  },
  methods: {
    isPremium(premium) {
      return premium ? 'Yes' : 'No';
    },
  },
};
</script>
<style scoped>
.v-data-table {
  width: 600px;
  margin: 0 auto;
}
</style>
