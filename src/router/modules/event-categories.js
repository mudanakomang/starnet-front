import Datatable from "@views/main/event-categories/Datatable";
import Form from "@views/main/event-categories/Form";

const eventCategories = [
  {
    path: "admin/event-category",
    name: "admin.event-category",
    component: Datatable
  },
  {
    path: "admin/event-category/create",
    name: "admin.event-category.create",
    component: Form
  }
];

export default eventCategories;
