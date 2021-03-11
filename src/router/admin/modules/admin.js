import Form from "@views/admin/admin/Form";
import Datatable from "@views/admin/admin/Datatable";

const admin = [
  {
    path: "admin",
    name: "admin.admin",
    component: Datatable
  },
  {
    path: "admin/create",
    name: "admin.admin.create",
    component: Form
  },
  {
    path: "admin/:id/edit",
    name: "admin.admin.edit",
    component: Form,
    meta: {
      editPage: true
    }
  }
];

export default admin;
