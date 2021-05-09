/* Google is our data source 😱
 *
 * We use papaparse (https://www.papaparse.com) to read the CSV of our spreadsheets,
 * which means each day is it's own spreadsheets as CSV doesn't have an idea of "tabs".
 *
 * Specifically, the manual part of this looks like...
 *
 *
 * Step 1
 *
 * Each day we copy the official spreadsheet:
 * https://docs.google.com/spreadsheets/d/1gzWkYgZZm2IG2SR_V_T-WJ28hRjBwFIoCUFPpCQsMY0/edit#gid=947975514
 *
 *
 * Step 2
 *
 * Open up hidden "Linked Data" sheet and copy _that_ sheet to a new spreadsheet, naming it
 * ELO-<YEAR>-<MONTH>-<DAY>, e.g. "ELO-2021-05-13"
 *
 *
 * Step 3
 *
 * "Publish to Web" that new spreadsheet as CSV, and ensure "Anyone with a link" may open it
 *
 *
 * Step 4
 *
 * Add that link to the first position of this array 👍
 *
 *
 * Eventually there will be too much data to reasonably load, and while we could do some
 * technical things to help, maybe it just makes since to only load 10, 20, or however many
 * days for the main site, and let people load more on specific guild pages if they want.
 */

export const ELO_CSV_URLS = [
  // 2021-05-06
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRkJBcMlX_Xxdu-AwQww35BgHkaQzy7Om5Tl2IqeUbeTozpCFmfmlXgALChNzJBfAfQ_P9dOipFzN-c/pub?output=csv",
  // 2021-05-05
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQfF5esdZbsKDiouIevtdCDmOXg546vo2th5Kd_nejPcxFq1o4oPOiXtA3MD24QyOi-ht79HFfKV6W9/pub?output=csv",
];
