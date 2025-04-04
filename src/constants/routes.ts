/**
 * service links
 */
const ROUTES = {
  MAIN: `/`,
  POST: '/post',
  BOOKMARK: `/bookmark`,
  ARCHIVE: `/archive`,
  ABOUT: `/about`,
} as const;

//external links
const GITHUB_URL = 'https://github.com/delook-dev';
const CONTRIBUTE_SERVICE = `${GITHUB_URL}/devlook/contribute`;
const REPORT_BUGS = `${GITHUB_URL}/delook/issues`;

export { CONTRIBUTE_SERVICE, GITHUB_URL, REPORT_BUGS, ROUTES };
