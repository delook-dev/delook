import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

import { MetaTags } from '@/components';
import { ErrorPage } from '@/features/error';
import { RenderPost, useFilterStore, usePostStore } from '@/features/post';

function PostContent() {
  const { filter } = useFilterStore();
  const { currentPost, randomPost, isError } = usePostStore(
    useShallow((state) => ({
      currentPost: state.currentPost,
      randomPost: state.randomPost,
      isError: state.isError,
    })),
  );

  useEffect(() => {
    randomPost();
  }, [filter, randomPost]);

  if (!currentPost) return null;
  if (isError) return <ErrorPage type="NOT_FOUND" />;

  return <RenderPost post={currentPost} />;
}

export default function Home() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }, []);

  return (
    <>
      <MetaTags title={'디룩 | 성장하는 개발자의 탭'} />
      <PostContent />
    </>
  );
}
