import { PropsWithChildren, useState } from "react";

import { Guilds } from "../models";
import GuildsContext from "./GuildsContext";

interface GuildsProps extends PropsWithChildren<{}> {
  guilds: Guilds;
}

function GuildsProvider({ guilds: defualtGuilds, children }: GuildsProps) {
  const [guilds, setGuilds] = useState(defualtGuilds);
  return (
    <GuildsContext.Provider value={{ guilds, setGuilds }}>
      {children}
    </GuildsContext.Provider>
  );
}

export default GuildsProvider;
