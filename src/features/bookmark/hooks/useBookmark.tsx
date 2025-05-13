import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';

import { ToastMsg } from '@/constants';
import { PostMetaData, PostPathData } from '@/features/post';
import { toast } from '@/hooks';

import { useBookmarkStore } from '../store/useBookmarkStore';

export const useBookmark = ({
  pathData,
  metaData,
}: {
  metaData: PostMetaData;
  pathData: PostPathData;
}) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const {
    addBookmark,
    removeBookmark,
    isBookmarked: checkIsBookmarked,
  } = useBookmarkStore(
    useShallow((state) => ({
      addBookmark: state.addBookmark,
      removeBookmark: state.removeBookmark,
      isBookmarked: state.isBookmarked,
    })),
  );

  useEffect(() => {
    setIsBookmarked(checkIsBookmarked(pathData));
  }, [checkIsBookmarked, pathData]);

  const handleBookmark = () => {
    if (isBookmarked) {
      removeBookmark({ ...pathData });
      toast({
        title: ToastMsg.removeBookmark,
      });
    } else {
      addBookmark({ ...pathData, metaData });
      toast({
        title: ToastMsg.addBookmark,
      });
    }

    setIsBookmarked((isBookmarked) => !isBookmarked);
  };

  return { handleBookmark, isBookmarked };
};
