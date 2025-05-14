import { STORAGE_KEYS } from '@/constants';
import { CategorizedBookmarks } from '@/features/bookmark';

declare global {
  type StorageKeyValue = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
  type StorageKeyName = keyof typeof STORAGE_KEYS;

  type FilteredCategory = Record<string, boolean>;

  type StorageValueMap = {
    saved_posts: CategorizedBookmarks;
    settings_category: FilteredCategory;
    recent_posts: string[];
  };
}
