import { useCallback, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

import { MetaTags } from '@/components';
import { SITE_URL } from '@/constants';
import { BookmarkData, EmptyPage, useBookmarkStore } from '@/features/bookmark';
import { ErrorPage } from '@/features/error';
import { PostSidebarLayout, RenderPost, usePostList } from '@/features/post';

export default function BookmarkPage() {
  const { bookmarks, getBookmarks, isError } = useBookmarkStore(
    useShallow((state) => ({
      bookmarks: state.bookmarks,
      getBookmarks: state.getBookmarks,
      isError: state.isError,
    })),
  );

  useEffect(() => {
    getBookmarks();
  }, [getBookmarks]);

  const fetchPostList = useCallback(async () => {
    return bookmarks;
  }, [bookmarks]);

  const { post, categoryList, selectedPost } = usePostList<BookmarkData>({
    fetchPostList,
  });

  const Contents = () => {
    if (categoryList.length === 0) return <EmptyPage />;
    if (isError) return <ErrorPage type="NOT_FOUND" />;
    if (!post || !selectedPost) return null;

    return (
      <PostSidebarLayout categoryList={categoryList} activePost={selectedPost.filename}>
        <RenderPost post={{ ...post, ...selectedPost }} />
      </PostSidebarLayout>
    );
  };

  return (
    <>
      <MetaTags title={'디룩 | 북마크'} url={`${SITE_URL}/bookmark`} />
      {Contents()}
    </>
  );
}
