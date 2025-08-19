import { ExternalLink } from './ExternalLink';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip';

const DEVDEVDEV_URL = 'https://www.devdevdev.co.kr/techblog';

export const DevDevDev = () => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <ExternalLink href={DEVDEVDEV_URL} className="fixed bottom-14 right-4 w-32">
            <img className="drop-shadow-md" src="/images/devdevdev.png" alt="댑댑댑" />
          </ExternalLink>
        </TooltipTrigger>
        <TooltipContent className="overflow-visible bg-yellow text-center text-xs  text-stone-600 drop-shadow-md">
          <div className="relative">
            <span className="whitespace-pre">{`국내 빅테크 기업들의\n블로그 포스팅 보러가기`}</span>
            <span
              className="absolute left-1/2 top-full size-0 -translate-x-1/2
          translate-y-1 border-x-8
          border-t-8 border-x-transparent border-t-yellow"
            />
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
