import { ArrowUpRight } from 'lucide-react';

import { MetaTags } from '@/components';
import { Button, ExternalLink } from '@/components/ui';
import { CHROME_STORE_URL, CONTRIBUTE_SERVICE, DOWNLOAD_INFO_README, SITE_URL } from '@/constants';

import { contributeContents, crewContents, mainContents } from './_content';

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
          <div>
            <AboutSection
              srTitle="오픈소스 기여 홍보글"
              contents={contributeContents}
              buttonText="Contribute"
              buttonHref={CONTRIBUTE_SERVICE}
              buttonClassName="bg-pink hover:bg-pink/90"
            />
            <AboutSection
              srTitle="디룩 1기 스터디원 모집"
              contents={crewContents}
              buttonText="Apply Crew"
              buttonHref={
                'https://docs.google.com/forms/d/e/1FAIpQLScbPOv9LDjI1gI0cI3GMcEeI4POktX4BW-7O7-_V5RxC4PNmg/viewform?pli=1'
              }
              buttonClassName="bg-green hover:bg-green/90 text-white"
              contentClassName="underline underline-offset-4 decoration-1 decoration-green inline bg-green/20 dark:bg-transparent px-1"
            />
          </div>
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
  contentClassName?: string;
  isContentHighlight?: boolean;
}

function AboutSection({
  srTitle,
  contents,
  buttonText,
  buttonHref,
  buttonClassName = '',
  contentClassName = '',
}: AboutSectionProps) {
  const lines = contents.split('\n');

  return (
    <section className="flex flex-col overflow-y-auto">
      <h2 className="sr-only">{srTitle}</h2>
      <div className="text-base font-extralight text-stone-700 dark:text-stone-100 sm:text-xl">
        {lines.map((line, idx) => (
          <span key={idx} className={`whitespace-pre-wrap ${contentClassName}`}>
            {line}
            <br />
          </span>
        ))}
      </div>
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
