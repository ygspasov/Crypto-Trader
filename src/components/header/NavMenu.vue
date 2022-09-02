<template>
  <v-list dense nav>
    <v-list-item link to="/">
      <v-list-item-icon>
        <v-icon>home icon</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item link to="/login">
      <v-list-item-icon>
        <v-icon>login icon</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Login</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item link to="/register">
      <v-list-item-icon>
        <v-icon>register icon</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Registration</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
<script>
export default {};
</script>
<style></style>
