import { create } from 'zustand';

import {
  addBookmarkToCategory,
  BookmarkData,
  CategorizedBookmarks,
  getStorageBookmarks,
  removeBookmarkFromCategory,
  saveBookmarksToStorage,
} from '@/features/bookmark';
import { PostPathData } from '@/features/post';

interface BookmarkStore {
  bookmarks: CategorizedBookmarks; // 북마크 데이터
  initializeBookmarks: () => Promise<void>; // 북마크 초기화
  addBookmark: (data: Omit<BookmarkData, 'dateSaved'>) => Promise<void>; // 북마크 추가
  removeBookmark: (data: PostPathData) => Promise<void>; // 북마크 삭제
  isBookmarked: (data: PostPathData) => boolean; // 북마크 여부 확인
}

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  bookmarks: {},

  initializeBookmarks: async () => {
    const bookmarks = await getStorageBookmarks();
    set({ bookmarks });
  },

  addBookmark: async (data) => {
    const now = new Date().toISOString();
    const newBookmark: BookmarkData = { ...data, dateSaved: now };

    const updated = addBookmarkToCategory(get().bookmarks, newBookmark);
    set({ bookmarks: updated });
    await saveBookmarksToStorage(updated);
  },

  removeBookmark: async (data) => {
    const updated = removeBookmarkFromCategory(get().bookmarks, data);
    set({ bookmarks: updated });
    await saveBookmarksToStorage(updated);
  },

  isBookmarked: ({ category, filename }) => {
    const list = get().bookmarks[category] ?? [];
    return list.some((b) => b.filename === filename);
  },
}));
