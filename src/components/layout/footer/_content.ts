import { CONTRIBUTE_SERVICE, GITHUB_URL, REPORT_BUGS, ROUTES } from '@/constants';

const footerContents = {
  infos: [
    { text: '©2025 Delook', href: GITHUB_URL },
    { text: 'Made by @waterbinnn', href: 'https://github.com/waterbinnn' },
  ],
  intro: `디룩은 오픈 소스 프로젝트입니다.\n여러분의 지식을 공유하고 함께 발전시켜 주세요!`,
  outLinks: [
    { text: 'About', href: GITHUB_URL },
    { text: 'Contribute', href: CONTRIBUTE_SERVICE },
    { text: 'Report Bugs', href: REPORT_BUGS },
  ],
  inLinks: [{ text: 'Privacy', href: ROUTES.PRIVACY }],
};

export { footerContents };
