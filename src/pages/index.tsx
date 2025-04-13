import { useEffect, useState } from 'react';

import { getRandomPost, PostData, RenderPost } from '@/features/post';

export default function Home() {
  const [post, setPost] = useState<PostData | null>(null);

  useEffect(() => {
    getRandomPost().then((v) => setPost(v));
  }, []);

  if (!post) return;

  return <RenderPost post={post} />;
}
