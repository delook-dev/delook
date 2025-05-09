import { useEffect, useState } from 'react';

import { MetaTags } from '@/components';
import { getRandomPost, PostData, RenderPost, useFilterStore } from '@/features/post';

export default function Home() {
  const [post, setPost] = useState<PostData | null>(null);

  const { filter } = useFilterStore();

  const fetchRandomPost = async () => {
    const randomPost = await getRandomPost();
    setPost(randomPost);
  };

  useEffect(() => {
    fetchRandomPost();
  }, [filter]);

  if (!post) return null;

  return (
    <>
      <MetaTags title={'디룩 | 성장하는 개발자의 탭'} />
      <RenderPost post={post} />
    </>
  );
}
