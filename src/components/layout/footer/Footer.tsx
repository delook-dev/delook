import { Link } from 'react-router-dom';

import { ExternalLink } from '@/components';

import { footerContents } from './_content';

export default function Footer() {
  return (
    <footer className="mt-auto flex flex-col gap-4 border-t border-dashed border-border px-3 py-4 text-xs font-normal md:flex-row md:items-center md:justify-between md:gap-2 lg:-mx-4 lg:px-8">
      <div className="flex flex-col gap-1 md:gap-0">
        {footerContents.infos.map((info) => (
          <ExternalLink
            className="w-fit text-foreground/80 hover:text-primary hover:underline"
            href={info.href}
            key={info.text}
          >
            {info.text}
          </ExternalLink>
        ))}
      </div>

      <p className="whitespace-pre-wrap text-xs font-extralight text-primary md:text-center">
        {footerContents.intro}
      </p>

      <div>
        <div className="flex flex-col gap-1 text-foreground/80 md:flex-row md:gap-3">
          {footerContents.outLinks.map((info) => (
            <ExternalLink
              className="w-fit hover:text-primary hover:underline"
              href={info.href}
              key={info.text}
            >
              {info.text}
            </ExternalLink>
          ))}
          {footerContents.inLinks.map((info) => (
            <Link
              className="w-fit hover:text-primary hover:underline"
              to={info.href}
              key={info.text}
            >
              {info.text}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
