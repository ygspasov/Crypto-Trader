<template>
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
        Trades
        <v-icon>mdi-briefcase-arrow-left-right</v-icon>
      </v-tab>

      <v-tab href="#tab-4">
        Portfolio
        <v-icon>mdi-wallet</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="i in 4" :key="i" :value="'tab-' + i">
        <v-card flat>
          <v-card-text>
            <h3 v-if="i !== 1" class="mb-5">{{ texts[i - 1] }}</h3>
            <p v-if="i !== 3 && i !== 4">{{ openAnAccount }}</p></v-card-text
          >

          <open-account v-if="i === 1"></open-account>
          <v-row align="center" justify="space-around">
            <deposit-money v-if="i === 2"></deposit-money
          ></v-row>
          <v-row align="center" justify="space-around"
            ><purchased-crypto depressed v-if="i === 3" class="mb-5">
              TRADE
            </purchased-crypto></v-row
          >
          <v-row align="center" justify="space-around"></v-row>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
import { useCryptoStore } from '@/store/index';
import openAccount from './operations/OpenAccount.vue';
import depositMoney from './operations/DepositMoney.vue';
import PurchasedCrypto from './operations/PurchasedCrypto.vue';
export default {
  components: { openAccount, depositMoney, PurchasedCrypto },

  data() {
    const store = useCryptoStore();
    return {
      store,
      tab: null,
      texts: [
        'Open an account with us.',
        'Deposit money with us.',
        'Your trades:',
        'Your crypto portfolio:',
      ],
    };
  },
  computed: {
    openAnAccount() {
      return this.store.singleTraderAccounts
        ? 'Your accounts:'
        : 'Open an account with us.';
    },
  },
};
</script>
<style scoped>
.v-card__text {
  text-align: center;
}
</style>
