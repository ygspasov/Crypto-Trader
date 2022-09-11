<template>
  <v-container fluid v-if="isAuthenticated">
    <the-header></the-header>
    <h2 class="font-weight-light d-flex justify-center mb-6">
      Welcome {{ traderName }}!
    </h2>
    <the-operations></the-operations>
  </v-container>
</template>
<script>
import { useCryptoStore } from '@/store/index';
import TheHeader from '../header/TheHeader.vue';
import TheOperations from './TheOperations.vue';
export default {
  data() {
    const store = useCryptoStore();
    return {
      store,
    };
  },
  components: { TheHeader, TheOperations },
  computed: {
    isAuthenticated() {
      return this.store.isAuthenticated;
    },
    destinationId() {
      return this.$route.params.id;
    },
    traderName() {
      return this.store.getTraderName;
    },
  },
};
</script>
<style scoped></style>
