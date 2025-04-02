import { ExternalLink } from '@/components';

import { footerContents } from './_content';

export default function Footer() {
  return (
    <footer className="mx-3 flex flex-col gap-2 border-t border-dashed border-border px-1 py-4 text-xs font-normal md:-mx-5 md:flex-row md:items-center md:justify-between md:gap-2 md:px-8">
      <div className="flex flex-col">
        {footerContents.infos.map((info) => (
          <ExternalLink
            className="text-foreground/80 hover:text-primary hover:underline"
            href={info.href}
            key={info.text}
          >
            {info.text}
          </ExternalLink>
        ))}
      </div>

      <ExternalLink
        className="inline-block whitespace-pre-wrap font-normal text-primary/70 md:text-center"
        href={footerContents.links[1].href}
      >
        {footerContents.intro}
      </ExternalLink>

      <div className="flex flex-col text-foreground/80 md:flex-row md:gap-3">
        {footerContents.links.map((info) => (
          <ExternalLink
            className="hover:text-primary hover:underline"
            href={info.href}
            key={info.text}
          >
            {info.text}
          </ExternalLink>
        ))}
      </div>
    </footer>
  );
}
