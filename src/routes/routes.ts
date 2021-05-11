import AboutScreen from "../screens/About/About";
import HomeScreen from "../screens/Home/Home";

export const routes = [
  {
    path: "/about",
    component: AboutScreen,
  },
  {
    path: "/",
    component: HomeScreen,
  },
  // {
  //   path: "/tacos",
  //   component: Tacos,
  //   routes: [
  //     {
  //       path: "/tacos/bus",
  //       component: Bus
  //     },
  //     {
  //       path: "/tacos/cart",
  //       component: Cart
  //     }
  //   ]
  // }
];
