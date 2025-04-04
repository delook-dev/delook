import { useEffect, useState } from 'react';

import { getRandomPost, MDXHeader, MDXRender, PostData } from '@/features/post';

export default function Home() {
  const [post, setPost] = useState<PostData | null>(null);

  useEffect(() => {
    getRandomPost().then((v) => setPost(v));
  }, []);

  if (!post) return;

  const { metaData, Content } = post;

  return (
    <>
      <MDXHeader metaData={metaData} onBookmark={() => console.log('save bookmark')} />
      <MDXRender>
        <Content />
      </MDXRender>
    </>
  );
}
