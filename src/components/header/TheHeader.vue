<template>
  <div>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Crypto Trader</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="my-2">
        <v-btn color="secondary" dark @click="signInOut">
          {{ authMessage }}
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer fixed temporary v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Crypto Trader </v-list-item-title>
          <v-list-item-subtitle>
            Create an account and trade crypto
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <nav-menu></nav-menu>
      <v-divider></v-divider>
    </v-navigation-drawer>
  </div>
</template>
<script>
import NavMenu from './NavMenu.vue';
import { useCryptoStore } from '@/store/index';
export default {
  components: { NavMenu },
  data() {
    const store = useCryptoStore();
    return {
      drawer: null,
      store,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Photos', icon: 'mdi-image' },
        { title: 'About', icon: 'mdi-help-box' },
      ],
    };
  },
  computed: {
    authMessage() {
      return this.store.isAuthenticated ? 'Sign out' : 'Sign in';
    },
  },
  methods: {
    signInOut() {
      if (!this.store.isAuthenticated) {
        this.$router.replace('./login');
      } else {
        this.store.signOutUser();
        this.$router.replace('/login');
      }
    },
  },
};
</script>
<style></style>
