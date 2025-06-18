import { useCallback, useEffect, useState } from 'react';

import { ToastMsg } from '@/constants';
import { getPostsByCategory } from '@/features/post';
import { useFilterStore } from '@/features/post/store/useFilterStore';
import { toast } from '@/hooks';

type CategoryItem = { id: string; label: string };
type SettingsMap = Record<string, boolean>;

export function useFilterCategory() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [checked, setChecked] = useState<string[]>([]);

  const { filter, setFilter } = useFilterStore();

  const fetchCategories = useCallback(async () => {
    const postsByCategory = await getPostsByCategory();
    const keys = Object.keys(postsByCategory);

    setCategories(keys.map((key) => ({ id: key, label: key })));

    if (!filter) {
      const initialFilter = Object.fromEntries(keys.map((key) => [key, true])) as SettingsMap;
      await setFilter(initialFilter);
      setChecked(keys);
    } else {
      setChecked(keys.filter((key) => filter[key]));
    }
  }, [filter, setFilter]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const saveSettings = useCallback(
    async (selectedCategories: string[]) => {
      // 이전과 동일하면 저장하지 않음
      if (JSON.stringify(selectedCategories) === JSON.stringify(checked)) {
        toast({
          title: ToastMsg.filterError,
        });
        return;
      }

      const newFilterSettings: SettingsMap = Object.fromEntries(
        categories.map((c) => [c.id, selectedCategories.includes(c.id)]),
      );

      await setFilter(newFilterSettings);
      setChecked(selectedCategories);
      toast({
        title: ToastMsg.filterSuccess,
      });
    },
    [categories, checked, setFilter],
  );

  return {
    categories,
    checked,
    saveSettings,
  };
}
