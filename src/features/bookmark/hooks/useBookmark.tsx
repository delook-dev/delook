import { useEffect, useState } from 'react';

import { PostMetaData, PostPathData } from '@/features/post';

import { onDeleteBookmark, onSaveBookmark } from '../utils/bookmarkUtils';

export const useBookmark = ({
  isBookmarked,
  pathData,
  metaData,
}: {
  metaData: PostMetaData;
  isBookmarked: boolean;
  pathData: PostPathData;
}) => {
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked]);

  const handleBookmark = () => {
    const { category, filename } = pathData;

    if (bookmarked) {
      onDeleteBookmark({ category, filename });
    } else {
      onSaveBookmark({ category, filename, postMetaData: metaData });
    }

    setBookmarked((bookmarked) => !bookmarked);
  };

  return { handleBookmark, bookmarked };
};
