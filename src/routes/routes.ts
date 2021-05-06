import HomeScreen from "../screens/Home/Home";
import PendingResultsScreen from "../screens/PendingResults/PendingResultsScreen";

export const routes = [
  {
    path: "/pending-results",
    component: PendingResultsScreen,
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
