type PostMetaData = {
  title: string;
  type: 'concept' | 'interview';
  language: string;
  tags: string[];
  dateModified: string;
};

type SinglePostViewData = {
  metaData: PostMetaData;
  Content: React.ComponentType;
  isBookmarked: boolean;
};

type PostPathData = { category: string; filename: string };

type PostData = SinglePostViewData & PostPathData;

type PostModuleData = {
  metaData: PostMetaData;
  default: React.ComponentType;
};

type PostModules = Record<string, () => Promise<PostModuleData>>;

type CategoryList = {
  category: string;
  posts: {
    title: string;
    filename: string;
    dateSaved?: string;
  }[];
};

export type {
  CategoryList,
  PostData,
  PostMetaData,
  PostModuleData,
  PostModules,
  PostPathData,
  SinglePostViewData,
};
