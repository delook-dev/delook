import { useMemo } from 'react';

import { ArchiveLayout, CategoryList, useArchive } from '@/features/archive';
import { ErrorPage } from '@/features/error';
import { MDXHeader, MDXRender } from '@/features/post';

export default function ArchivePage() {
  const { postsByCategory, post, selectedPost } = useArchive();

  const categoryList: CategoryList[] = useMemo(() => {
    return Object.entries(postsByCategory).map(([category, posts]) => ({
      category,
      posts: posts
        .filter((post) => post.filename !== undefined)
        .map((post) => ({
          title: post.metaData.title,
          filename: post.filename as string,
        })),
    }));
  }, [postsByCategory]);

  if (!post || !selectedPost) {
    return <ErrorPage type="NOT_FOUND" />;
  }

  const { metaData, Content } = post;
  const { category, filename } = selectedPost;

  return (
    <ArchiveLayout categoryList={categoryList}>
      <div className="mx-auto max-w-3xl md:pl-6 md:pt-4">
        <MDXHeader
          isBookmarked={post.isBookmarked}
          metaData={metaData}
          pathData={{ category, filename }}
        />

        <MDXRender>
          <Content />
        </MDXRender>
      </div>
    </ArchiveLayout>
  );
}
