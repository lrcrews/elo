import * as _ from "lodash";
import Papa from "papaparse";
import { forkJoin } from "rxjs";

import { ELO_FILE_PATHS } from "../data";

/**
 * The app needs at least the two most recent days of data to be relevant,
 * this loads that data based on the urls defined in `ELO_FILE_PATHS`
 */
export function loadBaseData() {
  return loadData(2);
}

/**
 * Loads X days of data from the `ELO_FILE_PATHS` based on the given `daysToLoad`,
 * skipping days already loaded as defined by the `daysAlreadyLoaded` param.
 *
 * @param daysToLoad The number of days we want to load for our `HistoricEloContext`
 * @param daysAlreadyLoaded The number of days we already loaded (i.e. the length of our `HistoricEloContext`)
 * @returns An `Observable` array of the results
 */
export function loadData(daysToLoad: number, daysAlreadyLoaded = 0) {
  const urls = _.slice(
    ELO_FILE_PATHS,
    daysAlreadyLoaded,
    daysAlreadyLoaded + daysToLoad
  );
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
