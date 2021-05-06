import React from "react";

import { Guilds } from "../models";

interface GuildsContextProps {
  guilds: Guilds;
  setGuilds: (guilds: Guilds) => void;
}

const GuildsContext = React.createContext({} as GuildsContextProps);

export default GuildsContext;
