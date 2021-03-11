import Datatable from "@views/admin/event/Datatable";
import Form from "@views/admin/event/Form";
import Details from "@views/admin/event/Details";
const event = [
  {
    path: "event",
    name: "admin.event",
    component: Datatable
  },
  {
    path: "event/create",
    name: "admin.event.create",
    component: Form
  },
  {
    path: "event/:id/edit",
    name: "admin.event.edit",
    component: Form,
    meta: {
      editPage: true
    }
  },
  {
    path: "event/:id",
    name: "admin.event.show",
    component: Details
  }
];

export default event;
