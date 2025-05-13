import { create } from 'zustand';

import { getRandomPost as fetchRandomPost, PostData } from '@/features/post';

interface PostStore {
  currentPost: PostData | null;
  setCurrentPost: (post: PostData) => void;
  randomPost: () => Promise<void>;
}

export const usePostStore = create<PostStore>((set) => ({
  currentPost: null,

  setCurrentPost: (post) => set({ currentPost: post }),

  randomPost: async () => {
    try {
      const post = await fetchRandomPost();
      set({ currentPost: post });
    } catch (error) {
      console.error('랜덤 포스트 조회 오류:', error);
    }
  },
}));
