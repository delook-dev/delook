import { PostMetaData } from '../../post/types/postTypes';

type BookmarkData = {
  category: string; //카테고리
  filename: string; //파일명
  dateSaved: string; //저장일시
  metaData: PostMetaData; //포스트 메타데이터
};

type CategorizedBookmarks = Record<string, BookmarkData[]>;

export type { BookmarkData, CategorizedBookmarks, StorageValueMap };
