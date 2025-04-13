import { useEffect, useState } from 'react';

import { STORAGE_KEYS } from '@/constants';
import { getPostsByCategory } from '@/features/post';
import { getFromStorage, saveToStorage } from '@/lib';

const STORAGE_KEY = STORAGE_KEYS['filter'];

type CategoryItem = { id: string; label: string };
type SettingsMap = Record<string, boolean>;

export function useFilterCategory() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [checked, setChecked] = useState<string[]>([]);

  useEffect(() => {
    const init = async () => {
      const postsByCategory = await getPostsByCategory();
      const keys = Object.keys(postsByCategory);

      let settings = await getFromStorage(STORAGE_KEY);

      if (!settings) {
        settings = Object.fromEntries(keys.map((key) => [key, true])) as SettingsMap;
        await saveToStorage(STORAGE_KEY, settings);
      }

      setCategories(keys.map((key) => ({ id: key, label: key })));
      setChecked(keys.filter((key) => settings?.[key]));
    };

    init();
  }, []);

  const saveSettings = async (nextChecked: string[]) => {
    const next: FilteredCategory = Object.fromEntries(
      categories.map((c) => [c.id, nextChecked.includes(c.id)]),
    );
    await saveToStorage(STORAGE_KEY, next);
    setChecked(nextChecked);
  };

  return {
    categories,
    checked,
    saveSettings,
  };
}
