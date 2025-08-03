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
const CONTRIBUTE_SERVICE = `${GITHUB_URL}/.github/blob/main/profile/README.md#%EC%98%A4%ED%94%88%EC%86%8C%EC%8A%A4-%EA%B8%B0%EC%97%AC`;
const REPORT_BUGS = `${GITHUB_URL}/delook/issues`;
const CHROME_STORE_URL =
  'https://chromewebstore.google.com/detail/ehfclaaaeofpkbgankkeokjgodoejahp';
const DOWNLOAD_INFO_README =
  'https://github.com/delook-dev/.github/blob/main/profile/README.md#%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%82%AC%EC%9A%A9%EB%B2%95';

export {
  CHROME_STORE_URL,
  CONTRIBUTE_SERVICE,
  DOWNLOAD_INFO_README,
  GITHUB_URL,
  REPORT_BUGS,
  ROUTES,
  SITE_URL,
};
