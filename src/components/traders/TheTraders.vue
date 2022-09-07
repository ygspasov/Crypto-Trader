<template>
  <v-container fluid>
    <the-header></the-header>
    <p v-if="isAuthenticated">Trader email: {{ traderEmail }}</p>
    <div>{{ traders }}</div>
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
