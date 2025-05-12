import { useCallback } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { BookmarkData, useBookmarkStore } from '@/features/bookmark';
import { getPostsByCategory, PostData, usePostList } from '@/features/post';
import { useIsMobile } from '@/hooks';

import {
  Sidebar,
  SidebarCollapsibleMenu,
  SidebarMenu,
  SidebarProvider,
  SidebarTrigger,
} from '../ui';

export const LeftSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useIsMobile();
  const location = useLocation();
  const { bookmarks } = useBookmarkStore();

  const showSidebar =
    location.pathname.includes('bookmark') || location.pathname.includes('archive');

  const fetchBookmarkPostList = useCallback(async () => {
    return bookmarks;
  }, [bookmarks]);

  const fetchArchivePostList = useCallback(async () => {
    const posts = await getPostsByCategory();
    return posts;
  }, []);

  const { categoryList } = usePostList<BookmarkData | PostData>({
    fetchPostList: location.pathname.includes('bookmark')
      ? fetchBookmarkPostList
      : fetchArchivePostList,
  });

  const handleSearchParams = useCallback(
    (category: string, filename: string) => {
      setSearchParams({ category, filename });
    },
    [setSearchParams],
  );

  return (
    <>
      {showSidebar && (
        <SidebarProvider>
          <div className="flex h-[calc(100vh-6.5rem)]">
            <Sidebar className="top-[6.5rem] w-[--sidebar-width] overflow-y-auto border-r border-dashed px-2 group-data-[side=left]:border-none">
              <SidebarMenu className="h-full pt-4">
                {categoryList.map(({ category, posts }) => (
                  <SidebarCollapsibleMenu
                    key={category}
                    label={category}
                    items={posts.map(({ filename, title }) => ({
                      key: filename,
                      title: title,
                      isActive: searchParams.get('filename') === filename,
                      onClick: () => handleSearchParams(category, filename),
                    }))}
                  />
                ))}
              </SidebarMenu>
            </Sidebar>
            {isMobile && (
              <SidebarTrigger className="bg-primary text-gray-100 hover:bg-primary/90 hover:text-gray-100" />
            )}
          </div>
        </SidebarProvider>
      )}
    </>
  );
};
