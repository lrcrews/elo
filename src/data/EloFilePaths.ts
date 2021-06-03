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
 * download that data as CSV.
 *
 *
 * Step 2
 *
 * Add to that CSV a header row:
 * ID	NAME	SERVER	BANNER_IMG	RATING	BRACKET_WINS	FLAIR	H	STATUS	J
 *
 *
 * Step 3
 *
 * Save the CSV as "ELO-<year>-<month>-<day>", e.g.:
 * ELO-2021-05-25.csv
 *
 *
 * Step 4
 *
 * Add the CSV to the `/public/data` directory, add the
 * file name here, and update the MANUALLY_UPDATED_DATE value in SiteFooter
 * (via a PR || commit)  👍
 */

const PREFIX = `${process.env.PUBLIC_URL}/data/ELO-2021-`;

export const ELO_FILE_PATHS = [
  `${PREFIX}06-02.csv`,
  `${PREFIX}06-01.csv`,
  `${PREFIX}05-31.csv`,
  `${PREFIX}05-28.csv`,
  `${PREFIX}05-27.csv`,
  `${PREFIX}05-26.csv`,
  `${PREFIX}05-25.csv`,
  `${PREFIX}05-24.csv`,
  `${PREFIX}05-21.csv`,
  `${PREFIX}05-20.csv`,
  `${PREFIX}05-19.csv`,
  `${PREFIX}05-18.csv`,
  `${PREFIX}05-17.csv`,
  `${PREFIX}05-14.csv`,
  `${PREFIX}05-13.csv`,
  `${PREFIX}05-12.csv`,
  `${PREFIX}05-11.csv`,
  `${PREFIX}05-10.csv`,
  // `${PREFIX}05-07.csv`, Lost what would be the data for the 7th 😢
  // `${PREFIX}05-06.csv`, present, but for correctness of "X wars ago" commenting out
  // `${PREFIX}05-05.csv`, present, but for correctness of "X wars ago" commenting out
];
