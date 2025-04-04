import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPost, MDXHeader, MDXRender, PostData } from '@/features/post';

export default function Post() {
  const [searchParams] = useSearchParams();
  const [post, setPost] = useState<PostData | null>(null);

  useEffect(() => {
    const category = searchParams.get('category');
    const title = searchParams.get('title');
    if (!category || !title) {
      console.warn('카테고리와 제목이 필요합니다.');
      return;
    }
    getPost({ category, title }).then((v) => setPost(v));
  }, [searchParams]);

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
