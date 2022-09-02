<template>
  <div>
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Crypto Trader</v-toolbar-title>
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
export default {
  components: { NavMenu },
  data: () => ({
    drawer: null,
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard' },
      { title: 'Photos', icon: 'mdi-image' },
      { title: 'About', icon: 'mdi-help-box' },
    ],
  }),
};
</script>
<style></style>
