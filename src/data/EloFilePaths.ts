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
 * Save the CSV as "ELO-WEEK-END-<year>-<month>-<day>", e.g.:
 * ELO-WEEK-END-2021-05-25.csv
 *
 *
 * Step 4
 *
 * Add the CSV to the `/public/data` directory, add the
 * file name here, and update the MANUALLY_UPDATED_DATE value in SiteFooter
 * (via a PR || commit)  👍
 */

const PREFIX = `${process.env.PUBLIC_URL}/data/ELO-WEEK-END-`;

export const ELO_FILE_PATHS = [
  `${PREFIX}2023-06-16.csv`,
  `${PREFIX}2023-06-09.csv`,
  `${PREFIX}2023-06-02.csv`,
  `${PREFIX}2023-05-26.csv`,
  `${PREFIX}2023-05-19.csv`,
  `${PREFIX}2023-05-12.csv`,
  `${PREFIX}2023-05-05.csv`,
  `${PREFIX}2023-04-28.csv`,
  `${PREFIX}2023-04-21.csv`,
  `${PREFIX}2023-04-14.csv`,
  `${PREFIX}2023-04-07.csv`,
  `${PREFIX}2023-03-31.csv`,
  `${PREFIX}2023-03-24.csv`,
  `${PREFIX}2023-03-17.csv`,
  `${PREFIX}2023-03-10.csv`,
  `${PREFIX}2023-03-03.csv`,
  `${PREFIX}2023-02-24.csv`,
  `${PREFIX}2023-02-17.csv`,
  `${PREFIX}2023-02-10.csv`,
  `${PREFIX}2023-02-03.csv`,
  `${PREFIX}2023-01-27.csv`,
  `${PREFIX}2023-01-20.csv`,
  `${PREFIX}2023-01-13.csv`,
  `${PREFIX}2023-01-06.csv`,
  `${PREFIX}2022-12-30.csv`,
  `${PREFIX}2022-12-23.csv`,
  `${PREFIX}2022-12-16.csv`,
  `${PREFIX}2022-12-09.csv`,
  `${PREFIX}2022-12-02.csv`,
  `${PREFIX}2022-11-25.csv`,
  `${PREFIX}2022-11-18.csv`,
  `${PREFIX}2022-11-11.csv`,
  `${PREFIX}2022-11-04.csv`,
  `${PREFIX}2022-10-28.csv`,
  `${PREFIX}2022-10-21.csv`,
  `${PREFIX}2022-10-14.csv`,
  `${PREFIX}2022-10-07.csv`,
  `${PREFIX}2022-09-30.csv`,
  `${PREFIX}2022-09-23.csv`,
  `${PREFIX}2022-09-16.csv`,
  `${PREFIX}2022-09-09.csv`,
  `${PREFIX}2022-09-02.csv`,
  `${PREFIX}2022-08-26.csv`,
  `${PREFIX}2022-08-19.csv`,
  `${PREFIX}2022-08-12.csv`,
  `${PREFIX}2022-08-05.csv`,
  `${PREFIX}2022-07-29.csv`,
  `${PREFIX}2022-07-22.csv`,
  `${PREFIX}2022-07-15.csv`,
  `${PREFIX}2022-07-08.csv`,
  `${PREFIX}2022-07-01.csv`,
  `${PREFIX}2022-06-24.csv`,
  `${PREFIX}2022-06-17.csv`,
  `${PREFIX}2022-06-10.csv`,
  `${PREFIX}2022-06-03.csv`,
  `${PREFIX}2022-05-27.csv`,
  `${PREFIX}2022-05-20.csv`,
  `${PREFIX}2022-05-13.csv`,
  `${PREFIX}2022-05-06.csv`,
  `${PREFIX}2022-04-29.csv`,
  `${PREFIX}2022-04-22.csv`,
  `${PREFIX}2022-04-15.csv`,
  `${PREFIX}2022-04-08.csv`,
  `${PREFIX}2022-04-01.csv`,
  `${PREFIX}2022-03-25.csv`,
  `${PREFIX}2022-03-18.csv`,
  `${PREFIX}2022-03-11.csv`,
  `${PREFIX}2022-03-04.csv`,
  `${PREFIX}2022-02-25.csv`,
  `${PREFIX}2022-02-18.csv`,
  `${PREFIX}2022-02-11.csv`,
  `${PREFIX}2022-02-04.csv`,
  `${PREFIX}2022-01-28.csv`,
  `${PREFIX}2022-01-21.csv`,
  `${PREFIX}2022-01-14.csv`,
  `${PREFIX}2022-01-07.csv`,
  `${PREFIX}2021-12-31.csv`,
  `${PREFIX}2021-12-24.csv`,
  `${PREFIX}2021-12-17.csv`,
  `${PREFIX}2021-12-10.csv`,
  `${PREFIX}2021-12-03.csv`,
  `${PREFIX}2021-11-26.csv`,
  `${PREFIX}2021-11-19.csv`,
  `${PREFIX}2021-11-12.csv`,
  `${PREFIX}2021-11-05.csv`,
  `${PREFIX}2021-10-29.csv`,
  `${PREFIX}2021-10-22.csv`,
  `${PREFIX}2021-10-15.csv`,
  `${PREFIX}2021-10-08.csv`,
  `${PREFIX}2021-10-01.csv`,
  `${PREFIX}2021-09-24.csv`,
  `${PREFIX}2021-09-17.csv`,
  `${PREFIX}2021-09-10.csv`,
  `${PREFIX}2021-09-03.csv`,
  `${PREFIX}2021-08-27.csv`,
  `${PREFIX}2021-08-20.csv`,
  `${PREFIX}2021-08-13.csv`,
  `${PREFIX}2021-08-06.csv`,
  `${PREFIX}2021-07-30.csv`,
  `${PREFIX}2021-07-23.csv`,
  `${PREFIX}2021-07-16.csv`,
  `${PREFIX}2021-07-09.csv`,
  `${PREFIX}2021-07-02.csv`,
  `${PREFIX}2021-06-25.csv`,
  `${PREFIX}2021-06-18.csv`,
  `${PREFIX}2021-06-11.csv`,
  `${PREFIX}2021-06-04.csv`,
  `${PREFIX}2021-05-28.csv`,
  `${PREFIX}2021-05-21.csv`,
  `${PREFIX}2021-05-14.csv`,
];
