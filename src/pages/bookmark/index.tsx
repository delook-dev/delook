import { useCallback } from 'react';

import { MetaTags } from '@/components';
import { SITE_URL } from '@/constants';
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
