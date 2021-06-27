import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/auth",
    name: "AuthRedirect",
    component: () => import("../views/Auth.vue"),
    beforeEnter(to, from, next) {
      if (store.state.auth.isAuthorized) {
        next("/");
      } else {
        next("/auth/login");
      }
    }
  },
  {
    path: "/auth/:action",
    name: "Auth",
    component: () => import("../views/Auth.vue"),
    beforeEnter(to, from, next) {
      if (store.state.auth.isAuthorized) {
        next("/");
      } else {
        next();
      }
    }
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/User.vue"),
    beforeEnter(to, from, next) {
      if (store.state.auth.isAuthorized) {
        next();
      } else {
        next("/auth/login");
      }
    }
  },
  {
    path: "/:id",
    name: "Paste",
    component: () => import("../views/Paste.vue")
  },
  {
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (from === VueRouter.START_LOCATION) {
    store.dispatch("init");
    next();
  } else {
    next();
  }
});

export default router;
