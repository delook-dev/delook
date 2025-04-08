import { useIsMobile } from '@/hooks';

import { Sidebar, SidebarInset, SidebarMenu, SidebarProvider, SidebarTrigger } from '../ui';

export const SidebarLayout = ({
  sidebarMenu,
  children,
}: {
  sidebarMenu: React.ReactNode;
  children?: React.ReactNode;
}) => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <Sidebar className="top-24 h-[calc(100svh-6.5rem)] w-[--sidebar-width] overflow-y-auto border-r border-dashed px-2 group-data-[side=left]:border-none md:sticky">
        <SidebarMenu className="h-full pt-4">{sidebarMenu}</SidebarMenu>
      </Sidebar>

      <div className="flex flex-col">
        {isMobile && (
          <SidebarTrigger className="bg-primary text-gray-100 hover:bg-primary/90 hover:text-gray-100" />
        )}
        <SidebarInset className="flex-1">{children}</SidebarInset>
      </div>
    </SidebarProvider>
  );
};
