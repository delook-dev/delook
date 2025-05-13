import { useEffect } from 'react';

import { MetaTags } from '@/components';
import { RenderPost, useFilterStore } from '@/features/post';
import { usePostStore } from '@/features/post/store/usePostStore';

export default function Home() {
  const { filter } = useFilterStore();
  const { currentPost, randomPost } = usePostStore();

  useEffect(() => {
    randomPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  if (!currentPost) return null;

  return (
    <>
      <MetaTags title={'디룩 | 성장하는 개발자의 탭'} />
      <RenderPost post={currentPost} />
    </>
  );
}
