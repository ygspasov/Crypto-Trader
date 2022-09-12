<template>
  <v-container fluid>
    <the-header></the-header>
    <h1 class="d-flex justify-center mb-6, font-weight-light">Sign in</h1>
    <v-alert
      color="#2A3B4D"
      dark
      icon="mdi-firework"
      dense
      v-if="alertSignedOut && !this.store.signedUp"
    >
      {{ signOutMessage }}
    </v-alert>
    <v-form
      class="form"
      ref="form"
      v-model="valid"
      lazy-validation
      @submit="submit"
    >
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        :counter="20"
        label="Password"
        type="password"
        required
      ></v-text-field>
      <v-btn
        :disabled="!valid || !email || !password"
        depressed
        class="mr-4"
        @click="submit"
        >submit
      </v-btn>
      <v-btn class="mr-4" @click="reset" depressed> Reset Form </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { useCryptoStore } from '@/store/index';
import TheHeader from '../header/TheHeader.vue';

export default {
  components: { TheHeader },
  data() {
    const store = useCryptoStore();
    return {
      store,
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v =>
          (v && v.length >= 7 && v.length <= 20) ||
          'Password must be between 7 and 20 characters.',
      ],
      alertSignedOut: true,
    };
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    submit() {
      this.store.signInUser({
        email: this.email,
        password: this.password,
      });
      this.reset();
      this.$router.push('/');
    },
  },
  computed: {
    signOutMessage() {
      return !this.store.isAuthenticated ? 'Signed out!' : '';
    },
  },
  created() {
    setTimeout(() => {
      this.alertSignedOut = false;
    }, 4000);
  },
};
</script>
<style>
.form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
