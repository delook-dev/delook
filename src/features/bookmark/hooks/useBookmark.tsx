import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';

import { ROUTES } from '@/constants';
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
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

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
        title: '북마크 해제 완료! 🫢',
      });

      if (pathname.includes(ROUTES.BOOKMARK) && checkIsBookmarked(pathData) === false) {
        navigate('/bookmark');
      }
    } else {
      addBookmark({ ...pathData, metaData });
      toast({
        title: '북마크 완료! 나중에 꼭 다시 보기!! 🤗',
      });
    }

    setIsBookmarked((isBookmarked) => !isBookmarked);
  };

  return { handleBookmark, isBookmarked };
};
