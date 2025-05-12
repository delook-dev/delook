import { useCallback, useEffect } from 'react';

import { MetaTags } from '@/components';
import { SITE_URL } from '@/constants';
import { BookmarkData, EmptyPage } from '@/features/bookmark';
import { useBookmarkStore } from '@/features/bookmark/store/useBookmarkStore';
import { ErrorPage } from '@/features/error';
import { RenderPost, usePostList } from '@/features/post';

export default function BookmarkPage() {
  const { bookmarks, initializeBookmarks } = useBookmarkStore();

  useEffect(() => {
    initializeBookmarks();
  }, [initializeBookmarks]);

  const fetchPostList = useCallback(async () => {
    return bookmarks;
  }, [bookmarks]);

  const { post, categoryList, selectedPost } = usePostList<BookmarkData>({
    fetchPostList,
  });

  if (categoryList.length === 0) {
    return <EmptyPage />;
  }

  if (!post || !selectedPost) {
    return <ErrorPage type="NOT_FOUND" />;
  }

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
      <RenderPost post={{ ...post, ...selectedPost }} />
    </>
  );
}
