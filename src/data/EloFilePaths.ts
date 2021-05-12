/* An array of the files in this directory, ordered by descending
 * creation date.
 *
 * Doing this instead of something more "clever" so that there's
 * no odd edgecases when loading desired data, and we know how
 * many files we have (for a "load more data" scenario).
 *
 *
 * So, you want to add new data?  Awesome, just...
 *
 *
 * Step 0 (only need to do once)
 *
 * Clone the official google sheet found here:
 * https://docs.google.com/spreadsheets/d/1gzWkYgZZm2IG2SR_V_T-WJ28hRjBwFIoCUFPpCQsMY0/edit#gid=637541975
 *
 *
 * Step 1
 *
 * In your cloned sheet you'll now have access to the hidden tab "Linked Data",
 * copy that data to a new spreadsheet.
 *
 *
 * Step 2
 *
 * In the new spreadsheet add the following header row:
 * ID	NAME	SERVER	BANNER_IMG	RATING	BRACKET_WINS	FLAIR	H	STATUS	J
 *
 *
 * Step 3
 *
 * Export that data as a CSV, saving it as "ELO-<year>-<month>-<day>", e.g.:
 * ELO-2021-05-25.csv
 *
 *
 * Step 4
 *
 * Add the to the `/public/data` directory via a PR || commit and add the
 * file name here 👍
 *
 */

const PREFIX = `${process.env.PUBLIC_URL}/data/ELO-2021-`;

export const ELO_FILE_PATHS = [
  `${PREFIX}05-10.csv`,
  // `${PREFIX}05-07.csv`, Lost what would be the data for the 7th 😢
  `${PREFIX}05-06.csv`,
  `${PREFIX}05-05.csv`,
];
