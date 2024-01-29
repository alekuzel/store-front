import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import StartView from '../views/StartView.vue'
import ProductsView from '../views/ProductsView.vue'
import ConsignmentsView from '../views/ConsignmentsView.vue'
import '@fortawesome/fontawesome-free/css/all.min.css'
import UsersView from '../views/UsersView.vue';

const routes = [
  {
    path: '/',
    name: 'start',
    component: StartView,
    meta: { requiresAuth: true },//require authentication to see this page and all others except login
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/consignments',
    name: 'consignments',
    component: ConsignmentsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView,
    meta: { requiresAuth: true },
  }
  ,
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// here we check id authentication is required
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token'); // check if there is token in the local storage = user is logged in

  if (to.matched.some(route => route.meta.requiresAuth) && !isAuthenticated) {
    // send those not authenticated to login page
    next('/login');
  } else {
    next();
  }
});



export default router
