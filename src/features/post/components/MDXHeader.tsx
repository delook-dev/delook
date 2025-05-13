import { Bookmark, LucideShare2, RefreshCcw } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import { Badge, IconButton } from '@/components';
import { SITE_URL, ToastMsg } from '@/constants';
import { useBookmark } from '@/features/bookmark';
import { PostMetaData, PostPathData, usePostStore } from '@/features/post';
import { toast } from '@/hooks';

const ColorIconFilled = '#8c3fff';

export function MDXHeader({
  metaData,
  pathData,
}: {
  metaData: PostMetaData;
  pathData: PostPathData;
}) {
  const pathname = useLocation().pathname;

  const { randomPost } = usePostStore();

  const { isBookmarked, handleBookmark } = useBookmark({
    metaData,
    pathData,
  });

  const handleShare = () => {
    const { category, filename } = pathData;
    const url = `${SITE_URL}/archive?category=${category}&filename=${filename}`;
    navigator.clipboard.writeText(url);
    toast({
      title: ToastMsg.copyLink,
    });
  };

  return (
    <header className="mt-3 flex flex-col items-start border-b border-b-muted pb-4">
      <div className="flex w-full items-center justify-between">
        <Badge
          className="mb-2 rounded-lg bg-green px-1.5 text-background"
          size={'xs'}
          variant="green"
        >
          {metaData.language.toUpperCase()}
        </Badge>
        <div className="flex gap-1">
          {pathname === '/' && (
            <IconButton name="새로 불러오기" onClick={randomPost} tooltipContent="새로 불러오기">
              <RefreshCcw />
            </IconButton>
          )}

          <IconButton name="북마크" onClick={handleBookmark} tooltipContent="북마크">
            {isBookmarked ? (
              <Bookmark size={30} color={ColorIconFilled} fill={ColorIconFilled} />
            ) : (
              <Bookmark size={30} />
            )}
          </IconButton>

          <IconButton name="공유하기" onClick={handleShare} tooltipContent="링크 복사">
            <LucideShare2 />
          </IconButton>
        </div>
      </div>

      <h1 className="mb-3 text-3xl font-medium">{metaData.title}</h1>

      <span className="mb-2 text-[0.7rem] text-muted-foreground">
        Updated On : {metaData.dateModified}
      </span>

      <div className="flex w-full flex-wrap items-center gap-1">
        {metaData.tags.map((tag: string) => (
          <Badge
            className="whitespace-nowrap border-primary/20 text-primary/60 dark:border-primary/30 dark:text-primary/80"
            key={tag}
            rounded="full"
            size="xxs"
            variant={'outline'}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </header>
  );
}
