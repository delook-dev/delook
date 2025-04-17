import { STORAGE_KEYS } from '@/constants';
import { BookmarkData, CategorizedBookmarks } from '@/features/bookmark';
import { PostPathData } from '@/features/post';
import { getFromStorage, saveToStorage } from '@/lib/storage';

/**
 * 북마크 데이터를 정렬하는 함수
 * @param bookmarks 정렬할 북마크 데이터
 * @returns 정렬된 북마크 데이터
 */
const sortBookmarks = (bookmarks: CategorizedBookmarks): CategorizedBookmarks => {
  // 각 카테고리 내의 북마크를 제목 기준으로 정렬
  Object.keys(bookmarks).forEach((category) => {
    bookmarks[category].sort((a, b) => a.metaData.title.localeCompare(b.metaData.title));
  });

  // 카테고리 키를 기준으로 정렬된 새로운 객체 생성
  return Object.keys(bookmarks)
    .sort((a, b) => a.localeCompare(b))
    .reduce((acc, key) => {
      acc[key] = bookmarks[key];
      return acc;
    }, {} as CategorizedBookmarks);
};

/**
 * Storage에서 카테고리별 전체 북마크 데이터를 가져오는 함수
 * @returns CategorizedBookmarks 카테고리별 북마크 데이터
 */
export const getStorageBookmarks = async (): Promise<CategorizedBookmarks> => {
  const bookmarks = (await getFromStorage(STORAGE_KEYS['bookmark'])) ?? {};
  return sortBookmarks(bookmarks);
};

/**
 * Storage에 북마크 데이터를 저장하는 함수
 * @param bookmarks 저장할 북마크 데이터
 */
export const saveBookmarksToStorage = async (bookmarks: CategorizedBookmarks) => {
  const sortedBookmarks = sortBookmarks(bookmarks);
  await saveToStorage(STORAGE_KEYS['bookmark'], sortedBookmarks);
};

/**
 * 새로운 북마크를 추가하는 함수
 * @param bookmarks 카테고리별 북마크 데이터
 * @param newBookmark 추가할 북마크 데이터
 * @returns CategorizedBookmarks 카테고리별 북마크 데이터
 */
export const addBookmarkToCategory = (
  bookmarks: CategorizedBookmarks,
  newBookmark: BookmarkData,
): CategorizedBookmarks => {
  const list = bookmarks[newBookmark.category] ?? [];

  if (list.some((bookmark) => bookmark.filename === newBookmark.filename)) return bookmarks;

  return {
    ...bookmarks,
    [newBookmark.category]: [...list, newBookmark],
  };
};

/**
 * 북마크 삭제 함수
 * @param bookmarks 카테고리별 북마크 데이터
 * @param category 카테고리
 * @param filename 파일명 (고유 ID)
 * @returns CategorizedBookmarks 카테고리별 북마크 데이터
 */
export const removeBookmarkFromCategory = (
  bookmarks: CategorizedBookmarks,
  { category, filename }: PostPathData,
): CategorizedBookmarks => {
  const list = bookmarks[category] ?? [];
  const updatedList = list.filter((bookmark) => bookmark.filename !== filename);

  const updated = { ...bookmarks };
  if (updatedList.length === 0) delete updated[category];
  else updated[category] = updatedList;

  return updated;
};
