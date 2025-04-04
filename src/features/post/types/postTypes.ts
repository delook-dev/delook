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

type PostModuleData = {
  metaData: PostMetaData;
  default: React.ComponentType;
};

type PostModules = Record<string, () => Promise<PostModuleData>>;

export type { PostData, PostMetaData, PostModuleData, PostModules };
