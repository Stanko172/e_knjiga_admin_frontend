import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { authOnly: true, gate: 'dashboard_access' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/zaboravljena_lozinka',
    name: 'ForgotPassword',
    component: () => import('../views/ForgotPassword.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/reset_lozinke/:token',
    name: 'ResetPassword',
    component: () => import('../views/ResetPassword.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/permisije',
    name: 'Permisssions',
    component: () => import('../views/Permissions.vue'),
    meta: { authOnly: true, gate: 'users_management_access' }
  },
  {
    path: '/role',
    name: 'Roles',
    component: () => import('../views/Roles.vue'),
    meta: { authOnly: true, gate: 'users_management_access' }
  },
  {
    path: '/korisnici',
    name: 'Users',
    component: () => import('../views/Users.vue'),
    meta: { authOnly: true, gate: 'users_management_access' }
  },
  {
    path: '/zahtjevi',
    name: 'Requests',
    component: () => import('../views/Requests.vue'),
    meta: { authOnly: true, gate: 'requests_access' }
  },
  {
    path: '/knjige',
    name: 'Books',
    component: () => import('../views/Books.vue'),
    meta: { authOnly: true, gate: 'books_access' }
  },
  {
    path: '/eknjige',
    name: 'Ebooks',
    component: () => import('../views/Ebooks.vue'),
    meta: { authOnly: true, gate: 'ebooks_access' }
  },
  {
    path: '/promocije',
    name: 'Promotions',
    component: () => import('../views/Promotions.vue'),
    meta: { authOnly: true, gate: 'promotions_access' }
  },
  {
    path: '/autori',
    name: 'Authors',
    component: () => import('../views/Authors.vue'),
    meta: { authOnly: true, gate: 'authors_access' }
  },
  {
    path: '/zanrovi',
    name: 'Genres',
    component: () => import('../views/Genres.vue'),
    meta: { authOnly: true, gate: 'genres_access' }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function isLoggedIn() {
  return localStorage.getItem("auth");
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guestOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (isLoggedIn()) {
      next({
        path: "/",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router
