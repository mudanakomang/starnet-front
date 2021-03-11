import user from "./modules/user";
import event from "./modules/event";
import eventCategory from "./modules/event-category";
import sales from "./modules/sales";
import admin from "./modules/admin";

import eventCategoryGroup from "./modules/event-category-group";
import AppBase from "@views/admin/_layouts/AppBase";

const adminRoutes = {
  path: "/admin",
  name: "admin.home",
  redirect: { name: "admin.user" },
  component: AppBase,
  meta: {
    requiresAuth: true,
    guard: "admin",
    main: true
  },
  children: [
    ...user,
    ...event,
    ...eventCategory,
    ...eventCategoryGroup,
    ...admin,
    ...sales
  ]
};

export default adminRoutes;
