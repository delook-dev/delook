const SITE_URL = 'https://www.delook.co.kr';

/**
 * service links
 */
const ROUTES = {
  MAIN: `/`,
  POST: '/post',
  BOOKMARK: `/bookmark`,
  ARCHIVE: `/archive`,
  ABOUT: `/about`,
  PRIVACY: `/privacy`,
} as const;

//external links
const GITHUB_URL = 'https://github.com/delook-dev';
const CONTRIBUTE_SERVICE = `${GITHUB_URL}/delook/blob/main/CONTRIBUTING.md`;
const REPORT_BUGS = `${GITHUB_URL}/delook/issues`;
const STORE_URL =
  'https://chromewebstore.google.com/detail/%EB%94%94%EB%A3%A9delook/ehfclaaaeofpkbgankkeokjgodoejahp';

export { CONTRIBUTE_SERVICE, GITHUB_URL, REPORT_BUGS, ROUTES, SITE_URL, STORE_URL };
