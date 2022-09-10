<template>
  <v-container fluid>
    <the-header></the-header>
    <h2 class="font-weight-light d-flex justify-center mb-6">
      Welcome {{ traderName }}!
    </h2>
    <v-card>
      <v-tabs
        v-model="tab"
        background-color="secondary accent-4"
        centered
        dark
        icons-and-text
      >
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-1">
          Open Account
          <v-icon>mdi-bank-check</v-icon>
        </v-tab>

        <v-tab href="#tab-2">
          Deposit money
          <v-icon>mdi-hand-coin</v-icon>
        </v-tab>

        <v-tab href="#tab-3">
          Trade
          <v-icon>mdi-briefcase-arrow-left-right</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="i in 3" :key="i" :value="'tab-' + i">
          <v-card flat>
            <v-card-text>{{ texts[i - 1] }}</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>
<script>
import { useCryptoStore } from '@/store/index';
import TheHeader from '../header/TheHeader.vue';
export default {
  data() {
    const store = useCryptoStore();
    return {
      store,
      tab: null,
      texts: [
        'Open account with us.',
        'Open account with us today.',
        'Trade with us',
      ],
    };
  },
  components: { TheHeader },
  computed: {
    destinationId() {
      return this.$route.params.id;
    },
    traderUid() {
      return this.store.getTraderUid;
    },
    traderName() {
      return this.store.getTraderName;
    },
  },
};
</script>
<style scoped></style>
