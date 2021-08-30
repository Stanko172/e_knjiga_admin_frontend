import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { authOnly: true }
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
    path: '/permisije',
    name: 'Permisssions',
    component: () => import('../views/Permissions.vue'),
    meta: { authOnly: true }
  },
  {
    path: '/role',
    name: 'Roles',
    component: () => import('../views/Roles.vue'),
    meta: { authOnly: true }
  },
  {
    path: '/korisnici',
    name: 'Users',
    component: () => import('../views/Users.vue'),
    meta: { authOnly: true }
  },
  {
    path: '/zahtjevi',
    name: 'Requests',
    component: () => import('../views/Requests.vue'),
    meta: { authOnly: true }
  },
  {
    path: '/knjige',
    name: 'Books',
    component: () => import('../views/Books.vue'),
    meta: { authOnly: true }
  },
  {
    path: '/eknjige',
    name: 'Ebooks',
    component: () => import('../views/Ebooks.vue'),
    meta: { authOnly: true }
  },
  {
    path: '/promocije',
    name: 'Promotions',
    component: () => import('../views/Promotions.vue'),
    meta: { authOnly: true }
  },
  {
    path: '/autori',
    name: 'Authors',
    component: () => import('../views/Authors.vue'),
    meta: { authOnly: true }
  },
  {
    path: '/zanrovi',
    name: 'Genres',
    component: () => import('../views/Genres.vue'),
    meta: { authOnly: true }
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
