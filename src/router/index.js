import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginMenu from '../components/auth/LoginMenu.vue';
import RegistrationMenu from '../components/auth/RegistrationMenu.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginMenu,
  },
  {
    path: '/register',
    name: 'register',
    component: RegistrationMenu,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
