<template>
  <v-container fluid>
    <the-header></the-header>
    <v-card>
      <v-toolbar class="theme--dark" dark flat>
        <v-toolbar-title>Welcome {{ traderName }}!</v-toolbar-title>

        <v-spacer></v-spacer>

        <template v-slot:extension>
          <v-tabs v-model="tab" align-with-title>
            <v-tabs-slider color="yellow"></v-tabs-slider>

            <v-tab v-for="item in items" :key="item">
              {{ item }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item">
          <v-card flat>
            <v-card-text v-text="text"></v-card-text>
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
      items: ['web', 'shopping', 'videos', 'images', 'news'],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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
<style></style>
