import { MoonStar, Settings2, SunMedium } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import IconGithub from '@/assets/icons/github.svg?react';
import IconLogo from '@/assets/icons/logo.svg?react';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { IconButton } from '@/components/ui/IconButton';
import { GITHUB_URL, ROUTES } from '@/constants';
import { useTheme } from '@/hooks';

import { headerNavigation } from './_content';

export default function Header() {
  const location = useLocation();

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const activeNav = (href: string) =>
    location.pathname === href ||
    (href === ROUTES.MAIN && location.pathname.startsWith(ROUTES.POST));

  return (
    <header className="sticky inset-x-0 top-0 z-10 bg-background/80 backdrop-blur-sm">
      <div className="relative flex flex-wrap items-center justify-between border-b border-dashed border-border px-3 md:-mx-5 md:px-6">
        <div className="flex items-center justify-center sm:flex-1 sm:translate-x-12">
          <Link className="mx-auto py-3 pl-1" to="/">
            <IconLogo />
          </Link>
        </div>

        <div className="z-10 flex w-full items-center justify-end border-t border-dashed border-border md:pr-2 xs:w-fit xs:justify-normal xs:border-none">
          <IconButton tooltipContent="필터">
            <Settings2 />
          </IconButton>

          <IconButton buttonProps={{ asChild: true }}>
            <ExternalLink href={GITHUB_URL}>
              <IconGithub className="size-6 dark:fill-foreground" />
            </ExternalLink>
          </IconButton>

          <IconButton onClick={toggleTheme}>
            <SunMedium className="size-[1.2rem] rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
            <MoonStar className="absolute size-[1.2rem] rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
            <span className="sr-only">Toggle theme</span>
          </IconButton>
        </div>
      </div>

      <nav className="flex w-full overflow-x-auto border-b border-dashed border-border sm:justify-center">
        {headerNavigation.map((nav) => (
          <Link
            className={`${
              activeNav(nav.href) ? 'text-primary' : ''
            }  min-w-[60px] p-2 text-center text-xs font-normal hover:opacity-90 sm:min-w-[96px] md:text-sm`}
            to={nav.href}
            key={nav.text}
          >
            {nav.text}
          </Link>
        ))}
      </nav>
    </header>
  );
}
