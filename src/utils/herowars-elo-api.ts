import * as _ from "lodash";
import Papa from "papaparse";
import { forkJoin } from "rxjs";

import { ELO_FILE_PATHS } from "../data";

/**
 * The app needs at least the two most recent weeks of data to be relevant,
 * this loads that data based on the urls defined in `ELO_FILE_PATHS`
 */
export function loadBaseData() {
  return loadData(2);
}

/**
 * Loads X weeks of data from the `ELO_FILE_PATHS` based on the given `weeksToLoad`,
 * skipping weeks already loaded as defined by the `weeksAlreadyLoaded` param.
 *
 * @param weeksToLoad The number of weeks we want to load for our `HistoricEloContext`
 * @param weeksAlreadyLoaded The number of weeks we already loaded (e.g. the length of our `HistoricEloContext`)
 * @returns An `Observable` array of the results
 */
export function loadData(weeksToLoad: number, weeksAlreadyLoaded = 0) {
  const urls = _.slice(
    ELO_FILE_PATHS,
    weeksAlreadyLoaded,
    weeksAlreadyLoaded + weeksToLoad
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
