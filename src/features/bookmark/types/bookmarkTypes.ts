import { PostMetaData } from '../../post/types/postTypes';

type BookmarkOnStorage = {
  category: string; //카테고리
  filename: string; //파일명
  dateSaved: string; //저장일시
  postMetaData: PostMetaData; //포스트 메타데이터
};

type CategorizedBookmarks = Record<string, BookmarkOnStorage[]>;

export type { BookmarkOnStorage, CategorizedBookmarks, StorageValueMap };
