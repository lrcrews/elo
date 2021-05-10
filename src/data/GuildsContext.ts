import React from "react";

import { Guilds } from "../models";

/**
 * The `GuildsContext` is used to keep track of the most
 * recent list of `Active` guilds, which may be navigated
 * to and show up on the home page.
 */

interface GuildsContextProps {
  guilds: Guilds;
  setGuilds: (guilds: Guilds) => void;
}

const GuildsContext = React.createContext({} as GuildsContextProps);

export default GuildsContext;
