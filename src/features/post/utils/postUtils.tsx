import {
  PostData,
  PostDataWithFilename,
  PostModuleData,
  PostModules,
} from '@/features/post/types/postTypes';

const postModules = import.meta.glob(`/docs/posts/**/*.mdx`, {
  eager: false,
}) as PostModules;

/**
 * MDX 모듈 로드
 * @param importer 모듈 로드 함수
 * @returns PostData
 */
const loadModule = async (importer: () => Promise<PostModuleData>): Promise<PostData> => {
  const module = await importer();
  return {
    metaData: module.metaData,
    Content: module.default,
  };
};

/**
 * 카테고리 폴더별로 그룹화
 * @returns Record<string, PostData[]>
 */
const getPostsByCategory = async (): Promise<Record<string, PostDataWithFilename[]>> => {
  const entries = Object.entries(postModules);
  const groupedPosts: Record<string, PostDataWithFilename[]> = {};

  for (const [path, importer] of entries) {
    const match = path.match(/\/docs\/posts\/([^/]+)\/([^/]+)\.mdx$/);
    if (!match) continue;

    const category = match[1];
    const filename = match[2];

    if (!groupedPosts[category]) {
      groupedPosts[category] = [];
    }

    const post = await loadModule(importer);
    groupedPosts[category].push({
      filename,
      ...post,
    });
  }

  return groupedPosts;
};

/**
 * 특정 카테고리와 제목에 해당하는 포스트 반환
 * @param category 카테고리
 * @param title 제목
 * @returns PostData | null
 */
const getPost = async ({
  category,
  title,
}: {
  category: string;
  title: string;
}): Promise<PostData | null> => {
  const path = `/docs/posts/${category}/${title}.mdx`;

  const importer = postModules[path];
  if (!importer) {
    console.warn(`⚠️ 해당 경로의 mdx 파일을 찾을 수 없습니다: ${path}`);
    return null;
  }

  return loadModule(importer);
};

/**
 * 랜덤 포스트 반환
 * @returns PostData
 */
const getRandomPost = async (): Promise<PostData> => {
  const entries = Object.entries(postModules);
  const randomEntry = entries[Math.floor(Math.random() * entries.length)];

  return loadModule(randomEntry[1]);
};

export { getPost, getPostsByCategory, getRandomPost };
