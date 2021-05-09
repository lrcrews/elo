/* Google is our data source 😱
 *
 * We use papaparse (https://www.papaparse.com) to read the CSV of our spreadsheets,
 * which means each day is it's own spreadsheets as CSV doesn't have an idea of "tabs".
 *
 * Specifically, the manual part of this looks like...
 *
 *
 * We have a copy of the official spreadsheet:
 * https://docs.google.com/spreadsheets/d/1weTKYoSEtsgF2WzIWE-X84Ds90bDeh2Z-65kXy5RabY/edit#gid=882761748
 *
 * The official (original) spreadsheet:
 * https://docs.google.com/spreadsheets/d/1gzWkYgZZm2IG2SR_V_T-WJ28hRjBwFIoCUFPpCQsMY0/edit#gid=947975514
 *
 * This spreadsheet updates the data when the elo-admins input the latest info
 *
 *
 * Step 1
 *
 * Open up hidden "Linked Data" sheet and copy _that data_ to a new spreadsheet, naming it
 * ELO-<YEAR>-<MONTH>-<DAY>, e.g. "ELO-2021-05-13"
 *
 * note: you must copy the data, not the spreadsheet itself, if you copy the spreadsheet the
 *       data will auto-update, and that's not good 😁
 *
 *
 * Step 2
 *
 * Add the header row to the newly created spreadsheet (can copy from previous sheets), it's:
 *
 * ID	NAME	SERVER	BANNER_IMG	RATING	BRACKET_WINS	FLAIR	H	STATUS	J
 *
 *
 * Step 3
 *
 * "Publish to Web" that new spreadsheet as CSV
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
  // 2021-05-07
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRIn2o3ElDxiFcfOCcsPyWPxCbIMGvAq2vgi1CdxU4VHxlagFttDH3AHtq-ryDPUg7ymJuX0nFKg1u9/pub?output=csv",
  // 2021-05-06
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQQuOA9fVzUaTONFV5iyPIwGC_mOfmRAMhGttdfhyPyBt7rVuFnXi64oUXyqGnkbbcY2ItMqEB4-6y-/pub?output=csv",
  // 2021-05-05
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQfF5esdZbsKDiouIevtdCDmOXg546vo2th5Kd_nejPcxFq1o4oPOiXtA3MD24QyOi-ht79HFfKV6W9/pub?output=csv",
];
