import { useEffect, useState } from 'react';

import { getRandomPost, MDXHeader, MDXRender, PostData } from '@/features/post';

export default function Home() {
  const [post, setPost] = useState<PostData | null>(null);

  useEffect(() => {
    getRandomPost().then((v) => setPost(v));
  }, []);

  if (!post) return;

  const { category, filename, metaData, Content } = post;

  return (
    <>
      <MDXHeader
        isBookmarked={post.isBookmarked}
        metaData={metaData}
        pathData={{ category, filename }}
      />
      <MDXRender>
        <Content />
      </MDXRender>
    </>
  );
}
