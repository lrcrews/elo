import React from "react";

import { Guilds } from "../models";

/**
 * The `HistoricEloContext` is used on guild pages to show
 * the guild's rating and ranking changes over time.
 */

interface HistoricEloContextProps {
  historicElo: Array<Guilds>;
  setHistoricElo: (historicElo: Array<Guilds>) => void;
}

const HistoricEloContext = React.createContext({} as HistoricEloContextProps);

export default HistoricEloContext;
