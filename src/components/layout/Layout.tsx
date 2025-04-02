import { Outlet } from 'react-router-dom';

import Footer from './footer/Footer';
import Header from './header/Header';

export default function Layout() {
  return (
    <div className="relative flex min-h-svh flex-col border-border bg-background sm:mx-5 sm:border-x sm:border-dashed">
      <Header />
      <main className="flex w-full max-w-[78ch] flex-1 flex-col px-4 py-2 sm:mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
