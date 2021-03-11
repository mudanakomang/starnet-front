import Home from "@views/user/mypage/Home";
import Diagnosis from "@views/user/mypage/Diagnosis";
import Event from "@views/user/mypage/Event";

const mypage = [
  {
    path: "mypage",
    name: "user.mypage",
    component: Home
  },
  {
    path: "mypage/diagnosis",
    name: "user.mypage.diagnosis",
    component: Diagnosis
  },
  {
    path: "mypage/event",
    name: "user.mypage.event",
    component: Event
  }
];

export default mypage;
