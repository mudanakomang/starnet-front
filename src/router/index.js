import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import errors from "./errors";
import auth from "./auth";
import { guards as availableGuards } from "@/store/modules/auth";
import publicRoutes from "./public";
import adminRoutes from "./admin";
import userRoutes from "./user";

Vue.use(VueRouter);

const routes = [
  publicRoutes,
  adminRoutes,
  userRoutes,
  ...auth,
  ...errors,
  {
    name: "catchAll",
    path: "*",
    redirect: { name: "home" }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.VUE_APP_BASE_URL ?? "/",
  routes
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch("auth/checkAuth");
  const authInfo = store.state.auth.info;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let reducer = (acc, cur) => {
      if (Object.prototype.hasOwnProperty.call(cur.meta, "guard")) {
        return [...acc, cur.meta.guard];
      } else {
        return acc;
      }
    };
    let guards = to.matched.reduce(reducer, []);
    let loginRoute =
      guards[0] === ""
        ? availableGuards.default.loginRoute
        : availableGuards[guards[0]].loginRoute;
    if (!authInfo.status) {
      // if not authenticated, redirect to correct login page
      next({ name: loginRoute });
    } else {
      // if isAuthenticated and route.guard matched with authInfo.guard
      if (guards.some(guard => guard === authInfo.guard)) {
        next();
      } else {
        next({ name: "errorNotFound" });
      }
    }
  } else {
    // for route that does not require auth
    next();
  }
});

export default router;
