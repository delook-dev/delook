import { Outlet, useLocation } from 'react-router-dom';

import { Toaster } from '../ui';
import Footer from './footer/Footer';
import Header from './header/Header';

const sidebarPages = ['archive', 'bookmark'];

export function Layout() {
  const pathname = useLocation().pathname;
  const isPageIncludeSidebar = sidebarPages.some((page) => pathname.includes(page));

  return (
    <div className="relative flex min-h-svh flex-col border-border bg-background lg:mx-4 xl:border-x xl:border-dashed">
      <Header />
      <main
        className={`flex w-full flex-auto flex-col p-4 sm:mx-auto ${!isPageIncludeSidebar ? 'max-w-3xl ' : 'md:p-0'}`}
      >
        <Outlet />
        <Toaster />
      </main>
      <Footer />
    </div>
  );
}
