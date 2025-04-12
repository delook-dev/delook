import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  CategoryList,
  getPost,
  PostMetaData,
  PostPathData,
  SinglePostViewData,
} from '@/features/post';

type BasePostData = {
  category: string;
  filename: string;
  metaData: PostMetaData;
};

type Categorized<T> = Record<string, T[]>;

export function usePostList<T extends BasePostData>({
  fetchPostList,
}: {
  fetchPostList: () => Promise<Categorized<T>>;
}) {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const filename = searchParams.get('filename');

  const [postsByCategory, setPostsByCategory] = useState<Categorized<T>>({});
  const [selectedPost, setSelectedPost] = useState<PostPathData | null>(null);
  const [post, setPost] = useState<SinglePostViewData | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const posts = await fetchPostList();
      setPostsByCategory(posts);

      const firstCategory = Object.keys(posts)[0];
      const firstPost = posts[firstCategory]?.[0];

      const selected =
        category && filename
          ? { category, filename }
          : { category: firstCategory, filename: firstPost?.filename };

      setSelectedPost(selected);

      if (selected) {
        const postData = await getPost(selected);
        setPost(postData);
      }
    };
    fetch();
  }, [category, filename, fetchPostList]);

  const categoryList: CategoryList[] = useMemo(() => {
    return Object.entries(postsByCategory).map(([category, posts]) => ({
      category,
      posts: posts.map((post) => ({
        title: post.metaData.title,
        filename: post.filename,
      })),
    }));
  }, [postsByCategory]);

  return { postsByCategory, selectedPost, post, categoryList };
}
