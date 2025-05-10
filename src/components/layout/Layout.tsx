import { Outlet, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';

import { Toaster } from '../ui';
import Footer from './footer/Footer';
import Header from './header/Header';

const sidebarPages = ['archive', 'bookmark'];

export function Layout() {
  const pathname = useLocation().pathname;
  const isPageIncludeSidebar = sidebarPages.some((page) => pathname.includes(page));

  return (
    <div className="relative flex h-screen flex-col border-border bg-background lg:mx-4 xl:border-x xl:border-dashed">
      <Header />
      <main
        className={cn(
          'flex flex-1 flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary w-full p-4',
          isPageIncludeSidebar ? 'md:p-0' : 'max-w-3xl p-4 sm:mx-auto',
        )}
      >
        <Outlet />
        <Toaster />
      </main>
      <Footer />
    </div>
  );
}
