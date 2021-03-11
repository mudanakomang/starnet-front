import Form from "@views/admin/user/Form";
import Datatable from "@views/admin/user/Datatable";

const user = [
  {
    path: "user",
    name: "admin.user",
    component: Datatable
  },
  {
    path: "user/create",
    name: "admin.user.create",
    component: Form
  },
  {
    path: "user/:id/edit",
    name: "admin.user.edit",
    component: Form,
    meta: {
      editPage: true
    }
  }
];

export default user;
