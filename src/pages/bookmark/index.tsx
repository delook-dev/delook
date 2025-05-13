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

  if (!post || !selectedPost) return null;
  if (categoryList.length === 0) return <EmptyPage />;
  if (isError) return <ErrorPage type="NOT_FOUND" />;

  const {
    metaData: { title },
  } = post;
  const { category, filename } = selectedPost;

  return (
    <>
      <MetaTags
        title={`${category}/${title}`}
        description={`${category}의${title}에 대한 내용`}
        url={`${SITE_URL}/bookmark?category=${category}&filename=${filename}`}
        keywords={`${category}, ${title}, ${filename}`}
      />
      <PostSidebarLayout categoryList={categoryList}>
        <RenderPost post={{ ...post, ...selectedPost }} />
      </PostSidebarLayout>
    </>
  );
}
