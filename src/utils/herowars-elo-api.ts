import * as Either from "fp-ts/lib/Either";
import * as Tabletop from "tabletop";

import { Guilds } from "../models";

export async function loadRatedGuilds(): Promise<Guilds> {
  // Needed to copy the actual spreadsheet so I could publish to web, so this
  // stuff isn't "live" yet.  Maybe exnor/tex adam can publish the main sheet.
  //
  // https://docs.google.com/spreadsheets/d/1GL02V9TNPYwf7gcRyMVkpH36GzxuGBHD24KE-6KXuoo/edit?usp=sharing

  return Tabletop.init({
    key: "1GL02V9TNPYwf7gcRyMVkpH36GzxuGBHD24KE-6KXuoo",
    parseNumbers: true,
    postProcess: (datum: { [key: string]: any }) =>
      (datum["id"] = `${datum["Server"]}-${datum["Guild Name"]}`),
  })
    .then((data: { [key: string]: any }) => {
      const decodedGuilds = Guilds.decode(data["Sorted by Rating"]["elements"]);
      if (Either.isRight(decodedGuilds)) {
        return decodedGuilds.right;
      } else {
        console.log("the data changed!!1!111!!1!!!");
        return [];
      }
    })
    .catch((err: string) => {
      console.warn(err);
      return [];
    });
}
