import AboutScreen from "../screens/About/About";
import BreakdownScreen from "../screens/Breakdown/Breakdown";
import GuildScreen from "../screens/Guild/Guild";
import HomeScreen from "../screens/Home/Home";
import ServersScreen from "../screens/Servers/Servers";

export const ABOUT_PATH = "/g/about";
export const BREAKDOWN_PATH = "/g/generate-breakdown";
export const GUILDS_PATH = "/g/guilds";
export const HOME_PATH = "/g";
export const SERVERS_PATH = "/g/servers";

export const routes = [
  {
    path: ABOUT_PATH,
    component: AboutScreen,
  },
  {
    path: BREAKDOWN_PATH,
    component: BreakdownScreen,
  },
  {
    path: SERVERS_PATH,
    component: ServersScreen,
  },
  {
    path: `${GUILDS_PATH}/:id`,
    component: GuildScreen,
  },
  {
    path: HOME_PATH,
    component: HomeScreen,
  },
  {
    path: "*",
    component: HomeScreen,
  },
];
