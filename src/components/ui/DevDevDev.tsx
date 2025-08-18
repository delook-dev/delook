import { ExternalLink } from './ExternalLink';

const DEVDEVDEV_URL = 'https://www.devdevdev.co.kr/main';

export const DevDevDev = () => {
  return (
    <ExternalLink href={DEVDEVDEV_URL} className="fixed bottom-12 right-4 w-32">
      <img className="" src="/images/devdevdev.png" alt="댑댑댑" />
    </ExternalLink>
  );
};
