import { create } from 'zustand';

import { STORAGE_KEYS } from '@/constants';
import { saveToStorage } from '@/lib';

type FilteredCategory = Record<string, boolean>;

interface FilterStore {
  filter: FilteredCategory | null;
  setFilter: (filter: FilteredCategory) => Promise<void>;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filter: null,

  setFilter: async (filter) => {
    await saveToStorage(STORAGE_KEYS['filter'], filter);
    set({ filter });
  },
}));
