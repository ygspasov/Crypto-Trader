<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
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
