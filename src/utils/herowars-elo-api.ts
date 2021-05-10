import * as _ from "lodash";
import Papa from "papaparse";
import { forkJoin } from "rxjs";

import { ELO_CSV_URLS } from "../data";

/**
 * Loads the Elo data from the urls defined in ELO_CSV_URLS
 *
 * @param numOfDays if provided data will only load the first X rows from ELO_CSV_URLS, defaults to `2`
 *
 * @returns an `Observable` that is an `Array` of `Guilds` (which is itself an `Array` of `Guild`).
 */
export function loadData(numOfDays = 2) {
  if (numOfDays < 2) {
    numOfDays = 2; // less than 2 is just the existing spreadsheet data 👍
  }
  const urls = _.slice(ELO_CSV_URLS, 0, numOfDays);
  return forkJoin(_.map(urls, (url) => parseUrl(url)));
}

function parseUrl(url: string): Promise<Papa.ParseResult> {
  return new Promise((resolve) => {
    Papa.parse(url, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: function (results) {
        resolve(results);
      },
    });
  });
}
