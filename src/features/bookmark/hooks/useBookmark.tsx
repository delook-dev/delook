import { useEffect, useState } from 'react';

import { PostMetaData, PostPathData } from '@/features/post';
import { toast } from '@/hooks';

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
      toast({
        title: '북마크 해제 완료! 🫢',
      });
    } else {
      onSaveBookmark({ category, filename, metaData: metaData });
      toast({
        title: '북마크 완료! 나중에 꼭 다시 보기!! 🤗',
      });
    }

    setBookmarked((bookmarked) => !bookmarked);
  };

  return { handleBookmark, bookmarked };
};
