<template>
  <v-container fluid>
    <the-header></the-header>
    <p v-if="isAuthenticated">Welcome, {{ traderName }}</p>
    <ul v-for="trader in traders" :key="trader.userId">
      <li>{{ trader }}</li>
    </ul>
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
    //
  },
};
</script>
<style></style>
