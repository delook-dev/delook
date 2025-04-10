import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPost, getPostsByCategory, PostData, SinglePostViewData } from '@/features/post';

import { ArchiveSearchParams } from '../types/archiveTypes';

export const useArchive = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const filename = searchParams.get('filename');

  const [postsByCategory, setPostsByCategory] = useState<Record<string, PostData[]>>({});
  const [selectedPost, setSelectedPost] = useState<ArchiveSearchParams | null>(null);
  const [post, setPost] = useState<SinglePostViewData | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const posts = await getPostsByCategory();
      setPostsByCategory(posts);

      // 선택된 포스트가 없을 경우 첫 번째 포스트로 fallback
      const firstCategory = Object.keys(posts)[0];
      const firstPost = posts[firstCategory]?.[0];

      const selected =
        category && filename
          ? { category, filename }
          : { category: firstCategory, filename: firstPost.filename };

      setSelectedPost(selected);

      const postData = await getPost(selected);
      setPost(postData);
    };

    fetchPost();
  }, [category, filename]);

  return { postsByCategory, post, selectedPost };
};
