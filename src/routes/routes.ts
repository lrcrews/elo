import AboutScreen from "../screens/About/About";
import GuildScreen from "../screens/Guild/Guild";
import HomeScreen from "../screens/Home/Home";

export const routes = [
  {
    path: "/about",
    component: AboutScreen,
  },
  {
    path: "/guilds/:id",
    component: GuildScreen,
  },
  {
    path: "/",
    component: HomeScreen,
  },
];
