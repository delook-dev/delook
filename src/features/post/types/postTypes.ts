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

export type {
  PostData,
  PostMetaData,
  PostModuleData,
  PostModules,
  PostPathData,
  SinglePostViewData,
};
