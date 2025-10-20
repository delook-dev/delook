import { useCallback } from 'react';

import { MetaTags } from '@/components';
import { SITE_URL } from '@/constants';
import { ErrorPage } from '@/features/error';
import { getPostsByCategory, PostSidebarLayout, RenderPost, usePostList } from '@/features/post';

export default function ArchivePage() {
  const fetchPostList = useCallback(async () => {
    const posts = await getPostsByCategory();
    return posts;
  }, []);

  const { categoryList, post, selectedPost, isError } = usePostList({ fetchPostList });

  if (!post || !selectedPost) return null;
  if (isError) return <ErrorPage type="NOT_FOUND" />;

  const {
    metaData: { title },
  } = post;

  const { category, filename } = selectedPost;

  return (
    <>
      <MetaTags
        title={`[${category}] ${title}`}
        description={`${category}의${title}에 대한 내용`}
        url={`${SITE_URL}/archive?category=${category}&filename=${filename}`}
        keywords={`${category}, ${title}, ${filename}`}
      />
      <PostSidebarLayout categoryList={categoryList} activePost={selectedPost.filename}>
        <RenderPost post={{ ...post, ...selectedPost }} />
      </PostSidebarLayout>
    </>
  );
}
