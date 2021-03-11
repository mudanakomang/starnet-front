import Datatable from "@views/admin/event-category/Datatable";
import Form from "@views/admin/event-category/Form";

const eventCategories = [
  {
    path: "event-category",
    name: "admin.event-category",
    component: Datatable
  },
  {
    path: "event-category/create",
    name: "admin.event-category.create",
    component: Form
  },
  {
    path: "event-category/:id/edit",
    name: "admin.event-category.edit",
    component: Form,
    meta: {
      editPage: true
    }
  }
];

export default eventCategories;
