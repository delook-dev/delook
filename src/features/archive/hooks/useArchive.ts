import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPost, getPostsByCategory, PostData, PostDataWithFilename } from '@/features/post';

import { ArchiveSearchParams } from '../types/archiveTypes';

export const useArchive = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const filename = searchParams.get('filename');

  const [postsByCategory, setPostsByCategory] = useState<Record<string, PostDataWithFilename[]>>(
    {},
  );
  const [selectedPost, setSelectedPost] = useState<ArchiveSearchParams | null>(null);
  const [post, setPost] = useState<PostData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const posts = await getPostsByCategory();
      setPostsByCategory(posts);

      if (!category || !filename) {
        const firstCategory = Object.keys(posts)[0];
        const firstPost = posts[firstCategory][0];
        setSelectedPost({ category: firstCategory, filename: firstPost.filename });
      } else {
        setSelectedPost({ category, filename });
      }
    };

    fetchData();
  }, [category, filename]);

  useEffect(() => {
    if (selectedPost) {
      const { category, filename } = selectedPost;
      getPost({ category, title: filename }).then((v) => setPost(v));
    }
  }, [selectedPost]);

  return { postsByCategory, post };
};
