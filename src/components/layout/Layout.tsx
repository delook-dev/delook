import { Outlet, useLocation } from 'react-router-dom';

import Footer from './footer/Footer';
import Header from './header/Header';

export function Layout() {
  const pathname = useLocation().pathname;
  const isArchivePage = pathname.includes('archive');

  return (
    <div className="relative flex min-h-svh flex-col border-border bg-background lg:mx-4 xl:border-x xl:border-dashed">
      <Header />
      <main
        className={`flex w-full flex-1 flex-col p-4 sm:mx-auto ${!isArchivePage ? 'max-w-3xl ' : 'md:p-0'}`}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
