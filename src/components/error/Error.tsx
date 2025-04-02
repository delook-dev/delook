import { Link } from 'react-router-dom';

import { ERROR_MSG } from '@/constants';

import { Button } from '../ui';

interface ErrorPageProps {
  type: keyof typeof ERROR_MSG;
  onRetry?: () => void;
}

export function ErrorPage({ type, onRetry }: ErrorPageProps) {
  const { HEADING, BODY, BUTTON } = ERROR_MSG[type];

  return (
    <section className="mx-auto flex flex-1 flex-col items-center justify-center px-5">
      <h2 className="mb-2 text-2xl">{HEADING}</h2>
      <span className="mb-4 text-sm text-foreground/80">{BODY}</span>
      {onRetry ? (
        // 재시도 버튼
        <Button
          className="mt-2 rounded-full bg-stone-900 px-11 hover:bg-stone-900 dark:bg-foreground dark:text-stone-900"
          onClick={onRetry}
        >
          {BUTTON}
        </Button>
      ) : (
        // 홈으로 이동 버튼
        <Button
          className="mt-2 rounded-full bg-zinc-800 px-11 hover:bg-zinc-800  dark:text-slate-100"
          asChild
        >
          <Link className="no-underline" to="/">
            {BUTTON}
          </Link>
        </Button>
      )}
    </section>
  );
}
