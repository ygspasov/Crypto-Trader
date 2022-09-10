<template>
  <v-container fluid v-if="isAuthenticated">
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
            <v-card-text class="d-flex justify-center">{{
              texts[i - 1]
            }}</v-card-text>
            <v-row align="center" justify="space-around">
              <v-btn depressed v-if="i === 1" class="mb-5" @click="openAccount">
                OPEN
              </v-btn></v-row
            >
            <v-row align="center" justify="space-around"
              ><v-btn depressed v-if="i === 2" class="mb-5">
                DEPOSIT
              </v-btn></v-row
            >
            <v-row align="center" justify="space-around"
              ><v-btn depressed v-if="i === 3" class="mb-5">
                TRADE
              </v-btn></v-row
            >
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
        'Open an account with us.',
        'Deposit money with us.',
        'Trade crypto with us.',
      ],
    };
  },
  components: { TheHeader },
  computed: {
    isAuthenticated() {
      return this.store.isAuthenticated;
    },
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
  methods: {
    openAccount() {
      const userId = this.traderUid;
      const currency = 'USD';
      const amount = 9000;
      this.store.openTraderAccount(userId, currency, amount);
    },
  },
};
</script>
<style scoped></style>
