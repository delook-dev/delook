import { useCallback } from 'react';

import { ErrorPage } from '@/features/error';
import { getPostsByCategory, PostSidebarLayout, RenderPost, usePostList } from '@/features/post';

export default function ArchivePage() {
  const fetchPostList = useCallback(async () => {
    const posts = await getPostsByCategory();
    return posts;
  }, []);

  const { categoryList, post, selectedPost } = usePostList({ fetchPostList });

  if (!post || !selectedPost) {
    return <ErrorPage type="NOT_FOUND" />;
  }

  return (
    <PostSidebarLayout categoryList={categoryList}>
      <RenderPost post={{ ...post, ...selectedPost }} />
    </PostSidebarLayout>
  );
}
