import { useCallback } from 'react';

import { BookmarkData, EmptyPage, getStorageList } from '@/features/bookmark';
import { ErrorPage } from '@/features/error';
import { PostSidebarLayout, RenderPost, usePostList } from '@/features/post';

export default function BookmarkPage() {
  const fetchPostList = useCallback(async () => {
    const { saved: posts } = await getStorageList();
    return posts;
  }, []);

  const { post, categoryList, selectedPost } = usePostList<BookmarkData>({
    fetchPostList,
  });

  if (categoryList.length === 0) {
    return <EmptyPage />;
  }

  if (!post || !selectedPost) {
    return <ErrorPage type="NOT_FOUND" />;
  }

  return (
    <PostSidebarLayout categoryList={categoryList}>
      <RenderPost post={{ ...post, ...selectedPost }} />
    </PostSidebarLayout>
  );
}
