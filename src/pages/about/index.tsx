import { ArrowUpRight } from 'lucide-react';

import { MetaTags } from '@/components';
import { Button, ExternalLink } from '@/components/ui';
import { CHROME_STORE_URL, CONTRIBUTE_SERVICE, DOWNLOAD_INFO_README, SITE_URL } from '@/constants';

import { contributeContents, mainContents } from './_content';

const isChrome = typeof window !== 'undefined' && /Chrome/.test(window.navigator.userAgent);

export default function AboutPage() {
  return (
    <>
      <MetaTags title={'디룩 | 소개페이지'} url={`${SITE_URL}/about`} />
      <div className="flex flex-1 pt-7 md:mx-auto">
        <h1 className="sr-only">디룩 | DeLook</h1>
        <div className="flex w-full flex-col justify-between gap-5 sm:flex-row">
          <AboutSection
            srTitle="디룩 소개글"
            contents={mainContents}
            buttonText="Add To Browser"
            buttonHref={isChrome ? CHROME_STORE_URL : DOWNLOAD_INFO_README}
          />
          <AboutSection
            srTitle="오픈소스 기여 홍보글"
            contents={contributeContents}
            buttonText="Contribute"
            buttonHref={CONTRIBUTE_SERVICE}
            buttonClassName="bg-pink hover:bg-pink/90"
          />
        </div>
      </div>
    </>
  );
}

interface AboutSectionProps {
  srTitle: string;
  contents: string;
  buttonText: string;
  buttonHref: string;
  buttonClassName?: string;
}

function AboutSection({
  srTitle,
  contents,
  buttonText,
  buttonHref,
  buttonClassName = '',
}: AboutSectionProps) {
  return (
    <section className="flex flex-col overflow-y-auto">
      <h2 className="sr-only">{srTitle}</h2>
      <p className="whitespace-pre-wrap text-base font-extralight text-stone-700 dark:text-stone-100 sm:text-xl">
        {contents}
      </p>
      <Button
        className={`my-5 w-fit rounded-full px-3 text-xs ${buttonClassName}`}
        size={'sm'}
        asChild
      >
        <ExternalLink href={buttonHref}>
          {buttonText}
          <ArrowUpRight />
        </ExternalLink>
      </Button>
    </section>
  );
}
