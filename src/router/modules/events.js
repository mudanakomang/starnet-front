import Form from "@views/main/events/Form";
import Datatable from "@views/main/events/Datatable";
import Details from "@views/main/events/Details";
const events = [
  {
    path: "admin/event",
    name: "admin.event",
    component: Datatable
  },
  {
    path: "admin/event/:id",
    name: "admin.event.show",
    component: Details
  },
  {
    path: "admin/event/create",
    name: "admin.event.create",
    component: Form
  },
  {
    path: "admin/event/:id/edit",
    name: "admin.event.edit",
    component: Form,
    meta: {
      editPage: true
    }
  }
];

export default events;
