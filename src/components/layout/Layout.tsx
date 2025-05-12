import { Outlet } from 'react-router-dom';

import { cn } from '@/lib/utils';

import { Toaster } from '../ui';
import Footer from './footer/Footer';
import Header from './header/Header';
import { LeftSidebar } from './LeftSidebar';

export function Layout() {
  return (
    <div className="relative flex h-screen flex-col border-border bg-background lg:mx-4 xl:border-x xl:border-dashed">
      <Header />
      <main
        className={cn(
          'relative mx-auto flex max-w-3xl flex-1 flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary w-full p-4 overflow-x-hidden',
        )}
      >
        <LeftSidebar />
        <Outlet />
        <Toaster />
      </main>
      <Footer />
    </div>
  );
}
