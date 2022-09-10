<template>
  <v-list dense nav>
    <v-list-item link to="/">
      <v-list-item-icon>
        <v-icon>mdi-home</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item link to="/login" v-if="!authenticated">
      <v-list-item-icon>
        <v-icon>mdi-login</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Login</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item link to="/signup" v-if="!authenticated">
      <v-list-item-icon>
        <v-icon>mdi-account-plus</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Sign up</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item link to="/traders" v-if="authenticated">
      <v-list-item-icon>
        <v-icon>mdi-briefcase-account-outline</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Traders</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item link :to="coachContactLink" v-if="authenticated">
      <v-list-item-icon>
        <v-icon>mdi-view-dashboard</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
<script>
import { useCryptoStore } from '@/store/index';

export default {
  data() {
    const store = useCryptoStore();
    return {
      store,
    };
  },
  computed: {
    authenticated() {
      return this.store.isAuthenticated;
    },
    coachContactLink() {
      return '/' + this.store.getTraderUid + '/balance';
    },
  },
};
</script>

<style></style>
