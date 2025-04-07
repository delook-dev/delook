type PostMetaData = {
  title: string;
  type: 'concept' | 'interview';
  language: string;
  tags: string[];
  dateModified: string;
};

type PostData = {
  metaData: PostMetaData;
  Content: React.ComponentType;
};

type PostDataWithFilename = {
  filename: string;
} & PostData;

type PostModuleData = {
  metaData: PostMetaData;
  default: React.ComponentType;
};

type PostModules = Record<string, () => Promise<PostModuleData>>;

type PostPathData = { category: string; filename: string };

export type {
  PostData,
  PostDataWithFilename,
  PostMetaData,
  PostModuleData,
  PostModules,
  PostPathData,
};
