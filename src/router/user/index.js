import mypage from "./modules/mypage";
import owner from "./modules/owner";
import event from "./modules/event";

import AppBase from "@views/user/_layouts/AppBase";

const userRoutes = {
  path: "/user",
  name: "user.home",
  redirect: { name: "user.mypage" },
  component: AppBase,
  meta: {
    requiresAuth: true,
    guard: "",
    main: true
  },
  children: [...mypage, ...owner, ...event]
};

export default userRoutes;
