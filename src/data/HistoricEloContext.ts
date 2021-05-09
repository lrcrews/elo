import React from "react";

import { Guilds } from "../models";

interface HistoricEloContextProps {
  historicElo: Array<Guilds>;
  setHistoricElo: (historicElo: Array<Guilds>) => void;
}

const HistoricEloContext = React.createContext({} as HistoricEloContextProps);

export default HistoricEloContext;
