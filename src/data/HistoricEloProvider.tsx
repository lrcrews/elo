import { PropsWithChildren, useState } from "react";

import { Guilds } from "../models";
import HistoricEloContext from "./HistoricEloContext";

interface HistoricEloProps extends PropsWithChildren<{}> {
  historicElo: Array<Guilds>;
}

function HistoricEloProvider({
  historicElo: defualtHistoricElo,
  children,
}: HistoricEloProps) {
  const [historicElo, setHistoricElo] = useState(defualtHistoricElo);
  return (
    <HistoricEloContext.Provider value={{ historicElo, setHistoricElo }}>
      {children}
    </HistoricEloContext.Provider>
  );
}

export default HistoricEloProvider;
