import { ArrowUpRight } from 'lucide-react';

import { Button, ExternalLink } from '@/components/ui';
import { CONTRIBUTE_SERVICE } from '@/constants';

import { contributeContents, mainContents } from './_content';

export default function AboutPage() {
  return (
    <main className="flex flex-1 pt-7 md:mx-auto">
      <h1 className="sr-only">디룩 | DeLook</h1>
      <div className="flex w-full flex-col gap-5 sm:flex-row">
        <section className="flex flex-col overflow-y-auto">
          <h2 className="sr-only">디룩 소개글</h2>
          <p className="whitespace-pre-wrap text-base font-extralight text-stone-900 dark:text-stone-100 sm:text-xl">
            {mainContents}
          </p>
          <Button className="my-5 w-fit rounded-full px-3 text-xs" size={'sm'} asChild>
            <ExternalLink href={''}>
              다운로드
              <ArrowUpRight />
            </ExternalLink>
          </Button>
        </section>

        <section className="flex flex-col overflow-y-auto">
          <p className="whitespace-pre-wrap text-base font-extralight text-stone-900 dark:text-stone-100 sm:text-xl">
            {contributeContents}
          </p>
          <Button
            className="my-5 w-fit rounded-full bg-pink px-3 text-xs hover:bg-pink/90"
            size={'sm'}
            asChild
          >
            <ExternalLink href={CONTRIBUTE_SERVICE}>
              오픈소스 기여
              <ArrowUpRight />
            </ExternalLink>
          </Button>
        </section>
      </div>
    </main>
  );
}
