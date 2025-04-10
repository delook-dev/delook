import { STORAGE_KEYS } from '@/constants';
import { CategorizedBookmarks } from '@/features/bookmark/types/bookmarkTypes';

declare global {
  type StorageKeyValue = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
  type StorageKeyName = keyof typeof STORAGE_KEYS;

  type FilteredCategory = Record<string, string>;

  type StorageValueMap = {
    saved_posts: CategorizedBookmarks;
    settings_category: FilteredCategory;
  };
}
