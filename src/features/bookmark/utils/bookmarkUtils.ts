import { STORAGE_KEYS } from '@/constants';
import { BookmarkOnStorage, CategorizedBookmarks } from '@/features/bookmark';
import { PostPathData } from '@/features/post';
import { getFromStorage, saveToStorage } from '@/lib/storage';

/**
 * 카테고리에 대한 북마크 리스트 반환
 * @param category 카테고리
 * @returns 전체 북마크 리스트(saved), 해당 카테고리 목록(storedList)
 */
const getStorageList = async (category: string) => {
  const saved = ((await getFromStorage(STORAGE_KEYS['bookmark'])) as CategorizedBookmarks) ?? {};
  const storedList = saved[category] ?? [];

  return { saved, storedList };
};

/**
 * 북마크 저장 함수
 * @param category 카테고리
 * @param filename 파일명 (고유 ID)
 * @param postMetaData 포스트 메타데이터
 */
const onSaveBookmark = async ({
  category,
  filename,
  postMetaData,
}: Omit<BookmarkOnStorage, 'dateSaved'>) => {
  const now = new Date().toISOString();

  const newBookmark: BookmarkOnStorage = {
    category,
    filename,
    dateSaved: now,
    postMetaData,
  };

  const { saved, storedList } = await getStorageList(category);

  // 중복 확인
  const alreadyExists = storedList.some((post: BookmarkOnStorage) => post.filename === filename);
  if (alreadyExists) return;

  const updated = {
    ...saved,
    [category]: [...storedList, newBookmark],
  };

  await saveToStorage(STORAGE_KEYS['bookmark'], updated);
};

/**
 * 북마크 삭제 함수
 * @param category
 * @param filename
 */
const onDeleteBookmark = async ({ category, filename }: PostPathData) => {
  const { saved, storedList } = await getStorageList(category);
  const updatedList = storedList.filter((post) => post.filename !== filename);

  if (updatedList.length === 0) {
    delete saved[category];
  } else {
    saved[category] = updatedList;
  }

  await saveToStorage(STORAGE_KEYS['bookmark'], saved);
};

export { onDeleteBookmark, onSaveBookmark };
