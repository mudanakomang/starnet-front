import store from "@/store";
import { guards } from "@/store/modules/auth";
import AppBase from "@views/user/_layouts/AppBase";
import Home from "@views/user/_public/Home";
import Login from "@views/user/_public/Login";
import Signup from "@views/user/_public/Signup";
import ContactUs from "@views/user/_public/ContactUs";
import Datatable from "@views/user/_public/event/Datatable";

const publicRoutes = {
  path: "/",
  name: "home",
  component: AppBase,
  children: [
    {
      path: "",
      component: Home
    },
    {
      /*
       * Default login
       */
      path: "login",
      name: "login",
      component: Login,
      beforeEnter: async (to, from, next) => {
        await store.dispatch("auth/checkAuth");
        const authInfo = store.state.auth.info;
        let homeRoute =
          authInfo.guard === ""
            ? guards.default.homeRoute
            : guards[authInfo.guard].homeRoute;
        if (authInfo.status) {
          next({ name: homeRoute });
        } else {
          next();
        }
      }
    },
    {
      path: "signup",
      name: "signup",
      component: Signup,
      beforeEnter: async (to, from, next) => {
        await store.dispatch("auth/checkAuth");
        const authInfo = store.state.auth.info;
        let homeRoute =
          authInfo.guard === ""
            ? guards.default.homeRoute
            : guards[authInfo.guard].homeRoute;
        if (authInfo.status) {
          next({ name: homeRoute });
        } else {
          next();
        }
      }
    },
    {
      path: "event",
      name: "event",
      component: Datatable
    },
    {
      path: "event/:id",
      name: "event.show"
    },
    {
      path: "event/:id/owner",
      names: "event.show.owner"
    },
    {
      path: "owner",
      name: "owner"
    },
    {
      path: "event-category",
      name: "event-category"
    },
    {
      path: "event-category/:id",
      name: "event-category.show"
    },
    {
      path: "contact-us",
      name: "contact-us",
      component: ContactUs
    }
  ]
};

export default publicRoutes;
