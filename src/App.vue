<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <v-footer app>
      <v-container fluid
        ><v-row
          ><a href="https://nomics.com/"
            >Crypto Market Cap & Pricing Data Provided By Nomics
          </a></v-row
        ></v-container
      >
    </v-footer>
  </v-app>
</template>

<script>
import { useCryptoStore } from '@/store/index';

export default {
  name: 'App',
  data() {
    const store = useCryptoStore();
    return { store };
  },
  created() {
    this.store.autoLogin();
    this.store.loadTraders();
  },
};
</script>
<style scoped>
.v-application a {
  margin: 0 auto;
  color: #424242;
}
</style>
