import Datatable from "@views/admin/event-category-group/Datatable";
import Form from "@views/admin/event-category-group/Form";

const eventCategoryGroup = [
  {
    path: "event-category-group",
    name: "admin.event-category-group",
    component: Datatable
  },
  {
    path: "event-category-group/create",
    name: "admin.event-category-group.create",
    component: Form
  },
  {
    path: "event-category-group/:id/edit",
    name: "admin.event-category-group.edit",
    component: Form,
    meta: {
      editPage: true
    }
  }
];

export default eventCategoryGroup;
