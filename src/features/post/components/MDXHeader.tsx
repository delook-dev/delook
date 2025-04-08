import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useState } from 'react';

import { Badge, IconButton } from '@/components';
import { PostMetaData } from '@/features/post/types/postTypes';

export function MDXHeader({
  metaData,
  onBookmark,
}: {
  metaData: PostMetaData;
  onBookmark: () => void;
}) {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const handleBookmark = () => {
    setIsBookmarked((prev) => !prev);
    onBookmark();
  };

  return (
    <header className="mt-3 flex flex-col items-start border-b border-b-muted pb-4">
      <div className="flex w-full items-center justify-between">
        <Badge
          className="mb-2 rounded-lg bg-green px-1.5 text-background"
          size={'xs'}
          variant="green"
        >
          {metaData.language}
        </Badge>
        <IconButton buttonProps={{ className: 'hover:bg-transperant' }} onClick={handleBookmark}>
          {isBookmarked ? <BookmarkCheck size={30} /> : <Bookmark size={30} />}
        </IconButton>
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
