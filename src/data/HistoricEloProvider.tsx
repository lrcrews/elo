import { PropsWithChildren, useState } from "react";

import { Guilds } from "../models";
import HistoricEloContext from "./HistoricEloContext";

interface HistoricEloProps extends PropsWithChildren<{}> {
  daysLoaded: number;
  historicElo: Array<Guilds>;
}

function HistoricEloProvider({
  daysLoaded: defaultDaysLoaded,
  historicElo: defualtHistoricElo,
  children,
}: HistoricEloProps) {
  const [daysLoaded, setDaysLoaded] = useState(defaultDaysLoaded);
  const [historicElo, setHistoricElo] = useState(defualtHistoricElo);

  return (
    <HistoricEloContext.Provider
      value={{ daysLoaded, historicElo, setDaysLoaded, setHistoricElo }}
    >
      {children}
    </HistoricEloContext.Provider>
  );
}

export default HistoricEloProvider;
