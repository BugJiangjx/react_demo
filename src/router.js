import Home from "~/App/Home";
import User from "~/Pages/User";
import User_Api from "~/Pages/User_Api";
import User_Redux from "~/Pages/User_Redux";
import UserDetail from "~/Pages/User/Detail";

const route = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/user",
    component: User,
    children: {
      path: '/:id',
      component: UserDetail
    }
  },
  {
    path: "/user_api",
    component: User_Api,
  },
  {
    path: "/user_redux",
    component: User_Redux,
  },
];

export default route;
