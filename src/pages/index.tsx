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
  }, [randomPost]);

  useEffect(() => {
    //현재 포스트의 카테고리가 선택한 카테고리에 포함되어 있지 않으면 랜덤 포스트 재생성
    if (filter && currentPost && !filter[currentPost.category]) {
      randomPost();
    }
  }, [filter, randomPost, currentPost]);

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
