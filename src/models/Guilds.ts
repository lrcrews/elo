/* eslint-disable @typescript-eslint/no-redeclare */
import * as t from "io-ts";

import Guild from "./Guild";

const Guilds = t.array(Guild);

type Guilds = t.TypeOf<typeof Guilds>;

export default Guilds;
