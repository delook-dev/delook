import { useEffect, useState } from 'react';

import { MetaTags } from '@/components';
import { getRandomPost, PostData, RenderPost } from '@/features/post';

export default function Home() {
  const [post, setPost] = useState<PostData | null>(null);

  useEffect(() => {
    getRandomPost().then((v) => setPost(v));
  }, []);

  if (!post) return;

  return (
    <>
      <MetaTags title={'디룩 | 성장하는 개발자의 탭'} />
      <RenderPost post={post} />
    </>
  );
}
