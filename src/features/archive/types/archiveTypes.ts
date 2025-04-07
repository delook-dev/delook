type CategoryList = {
  category: string;
  posts: {
    title: string;
    filename: string;
  }[];
};

type ArchiveSearchParams = { category: string; filename: string };

export type { ArchiveSearchParams, CategoryList };
