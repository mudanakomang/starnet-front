import ApplicationForm from "@views/user/event/ApplicationForm";
import ApplicationFinish from "@views/user/event/ApplicationFinish";
const event = [
  {
    path: "event",
    name: "user.event"
  },
  {
    path: "event-category",
    name: "user.event-category"
  },
  {
    path: "event/:id/application",
    name: "user.event.application",
    component: ApplicationForm
  },
  {
    path: "event/:id/application/finish",
    name: "user.event.application.finish",
    component: ApplicationFinish
  }
];

export default event;
