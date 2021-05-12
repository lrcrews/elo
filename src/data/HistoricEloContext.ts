import React from "react";

import { Guilds } from "../models";

/**
 * The `HistoricEloContext` is used on guild pages to show
 * the guild's rating and ranking changes over time.
 */

interface HistoricEloContextProps {
  daysLoaded: number;
  historicElo: Array<Guilds>;
  setDaysLoaded: (days: number) => void;
  setHistoricElo: (historicElo: Array<Guilds>) => void;
}

const HistoricEloContext = React.createContext({} as HistoricEloContextProps);

export default HistoricEloContext;
