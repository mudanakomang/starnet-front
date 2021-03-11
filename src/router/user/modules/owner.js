import Events from "@views/user/owner/Events";
import EventForm from "@views/user/owner/EventForm";
import Details from "@views/user/owner/Details";
const owner = [
  {
    path: "owner",
    name: "user.owner"
  },
  {
    path: "owner/event",
    name: "user.owner.event",
    component: Events
  },
  {
    path: "owner/event/create",
    name: "user.owner.event.create",
    component: EventForm
  },
  {
    path: "owner/sales",
    name: "user.owner.sales",
    component: EventForm
  },
   {
    path: "owner/event/:id/edit",
    name: "user.owner.event.edit",
    component: EventForm,
      meta: {
        editPage: true
      }
  },
  {
    path: "owner/event/:id",
    name: "user.owner.event.show",
    component: Details,
  }
];

export default owner;
