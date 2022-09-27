import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginMenu from '../components/auth/LoginMenu.vue';
import SignupMenu from '../components/auth/SignupMenu.vue';
import Traders from '../components/traders/TheTraders.vue';
import TraderDashboard from '../components/traders/TraderDashboard.vue';
import PageNotFound from '../components/PageNotFound.vue';

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
    path: '/signup',
    name: 'signup',
    component: SignupMenu,
  },
  {
    path: '/traders',
    name: 'traders',
    component: Traders,
  },
  {
    path: '/:id/balance/',
    name: 'trader balance',
    component: TraderDashboard,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: PageNotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
