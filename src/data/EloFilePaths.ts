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
  `${PREFIX}10-26-and-27.csv`,
  `${PREFIX}10-26-and-27.csv`,
  `${PREFIX}10-25.csv`,
  `${PREFIX}10-21-and-22.csv`,
  `${PREFIX}10-21-and-22.csv`,
  `${PREFIX}10-20.csv`,
  `${PREFIX}10-19.csv`,
  `${PREFIX}10-18.csv`,
  `${PREFIX}10-15.csv`,
  `${PREFIX}10-14.csv`,
  `${PREFIX}10-13.csv`,
  `${PREFIX}10-12.csv`,
  `${PREFIX}10-11.csv`,
  `${PREFIX}10-07-and-08.csv`,
  `${PREFIX}10-07-and-08.csv`,
  `${PREFIX}10-06.csv`,
  `${PREFIX}10-05.csv`,
  `${PREFIX}10-04.csv`,
  `${PREFIX}10-01.csv`,
  `${PREFIX}09-30.csv`,
  `${PREFIX}09-29.csv`,
  `${PREFIX}09-28.csv`,
  `${PREFIX}09-27.csv`,
  `${PREFIX}09-23-and-24.csv`,
  `${PREFIX}09-23-and-24.csv`,
  `${PREFIX}09-20-and-21-and-22.csv`,
  `${PREFIX}09-20-and-21-and-22.csv`,
  `${PREFIX}09-20-and-21-and-22.csv`,
  `${PREFIX}09-16-and-17.csv`,
  `${PREFIX}09-16-and-17.csv`,
  `${PREFIX}09-15.csv`,
  `${PREFIX}09-14.csv`,
  `${PREFIX}09-13.csv`,
  `${PREFIX}09-10.csv`,
  `${PREFIX}09-09.csv`,
  `${PREFIX}09-08.csv`,
  `${PREFIX}09-07.csv`,
  `${PREFIX}09-06.csv`,
  `${PREFIX}09-03.csv`,
  `${PREFIX}09-02.csv`,
  `${PREFIX}09-01.csv`,
  `${PREFIX}08-31.csv`,
  `${PREFIX}08-30.csv`,
  `${PREFIX}08-27.csv`,
  `${PREFIX}08-26.csv`,
  `${PREFIX}08-25.csv`,
  `${PREFIX}08-24.csv`,
  `${PREFIX}08-23.csv`,
  `${PREFIX}08-20.csv`,
  `${PREFIX}08-19.csv`,
  `${PREFIX}08-18.csv`,
  `${PREFIX}08-17.csv`,
  `${PREFIX}08-16.csv`,
  `${PREFIX}08-13.csv`,
  `${PREFIX}08-12.csv`,
  `${PREFIX}08-11.csv`,
  `${PREFIX}08-10.csv`,
  `${PREFIX}08-09.csv`,
  `${PREFIX}08-06.csv`,
  `${PREFIX}08-05.csv`,
  `${PREFIX}08-04.csv`,
  `${PREFIX}08-03.csv`,
  `${PREFIX}08-02.csv`,
  `${PREFIX}07-30.csv`,
  `${PREFIX}07-29.csv`,
  `${PREFIX}07-28.csv`,
  `${PREFIX}07-27.csv`,
  `${PREFIX}07-26.csv`,
  `${PREFIX}07-23.csv`,
  `${PREFIX}07-22.csv`,
  `${PREFIX}07-21.csv`,
  `${PREFIX}07-20.csv`,
  `${PREFIX}07-19.csv`,
  `${PREFIX}07-16.csv`,
  `${PREFIX}07-15.csv`,
  `${PREFIX}07-14.csv`,
  `${PREFIX}07-13.csv`,
  `${PREFIX}07-12.csv`,
  `${PREFIX}07-09.csv`,
  `${PREFIX}07-08.csv`,
  `${PREFIX}07-07.csv`,
  `${PREFIX}07-06.csv`,
  `${PREFIX}07-05.csv`,
  `${PREFIX}07-02.csv`,
  `${PREFIX}07-01.csv`,
  `${PREFIX}06-30.csv`,
  `${PREFIX}06-29.csv`,
  `${PREFIX}06-28.csv`,
  `${PREFIX}06-25.csv`,
  `${PREFIX}06-24.csv`,
  `${PREFIX}06-23.csv`,
  `${PREFIX}06-22.csv`,
  `${PREFIX}06-21.csv`,
  `${PREFIX}06-18.csv`,
  `${PREFIX}06-17.csv`,
  `${PREFIX}06-16.csv`,
  `${PREFIX}06-15.csv`,
  `${PREFIX}06-14.csv`,
  `${PREFIX}06-11.csv`,
  `${PREFIX}06-10.csv`,
  `${PREFIX}06-09.csv`,
  `${PREFIX}06-08.csv`,
  `${PREFIX}06-07.csv`,
  `${PREFIX}06-04.csv`,
  `${PREFIX}06-03.csv`,
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
];
