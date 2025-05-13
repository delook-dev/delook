import { STORAGE_KEYS } from '@/constants';
import { useBookmarkStore } from '@/features/bookmark';
import {
  PostData,
  PostModuleData,
  PostModules,
  PostPathData,
  SinglePostViewData,
} from '@/features/post';
import { getFromStorage, saveToStorage } from '@/lib';

const postModules = import.meta.glob(`/docs/posts/**/*.mdx`, {
  eager: false,
}) as PostModules;

/**
 * MDX 모듈 로드
 * @param importer 모듈 로드 함수
 * @returns PostData
 */
const loadModule = async (
  importer: () => Promise<PostModuleData>,
): Promise<Omit<SinglePostViewData, 'isBookmarked'>> => {
  const module = await importer();
  return {
    metaData: module.metaData,
    Content: module.default,
  };
};

/**
 * 카테고리, 파일명 추출
 * @param path
 * @returns PostPathData
 */
const parsePath = (path: string): PostPathData | null => {
  const match = path.match(/\/docs\/posts\/([^/]+)\/([^/]+)\.mdx$/);
  if (!match) return null;

  const [, category, filename] = match;
  return { category, filename };
};

/**
 * 포스트 데이터 추출
 * @param path
 * @param importer
 * @returns PostData
 */
const generatePostData = async (
  path: string,
  importer: () => Promise<PostModuleData>,
): Promise<PostData | null> => {
  const parsed = parsePath(path);
  if (!parsed) return null;
  const { category, filename } = parsed;

  const isBookmarked = useBookmarkStore.getState().isBookmarked({ category, filename });

  const post = await loadModule(importer);

  return {
    category,
    filename,
    isBookmarked,
    ...post,
  };
};

/**
 * 카테고리 폴더별로 그룹화
 * @returns Record<string, PostData[]>
 */
const getPostsByCategory = async (): Promise<Record<string, PostData[]>> => {
  const grouped: Record<string, PostData[]> = {};
  const postPathList = Object.entries(postModules);

  for (const [path, importer] of postPathList) {
    const post = await generatePostData(path, importer);
    if (!post) continue;

    if (!grouped[post.category]) grouped[post.category] = [];
    grouped[post.category].push(post);
  }

  // 각 카테고리 내의 포스트를 제목 기준으로 정렬
  Object.keys(grouped).forEach((category) => {
    grouped[category].sort((a, b) => a.metaData.title.localeCompare(b.metaData.title));
  });

  // 카테고리 키를 기준으로 정렬된 새로운 객체 생성
  const sortedGrouped = Object.keys(grouped)
    .sort((a, b) => a.localeCompare(b))
    .reduce(
      (acc, key) => {
        acc[key] = grouped[key];
        return acc;
      },
      {} as Record<string, PostData[]>,
    );

  return sortedGrouped;
};

/**
 * 특정 카테고리와 제목에 해당하는 포스트 반환
 * @param category 카테고리
 * @param filename 파일명
 * @returns PostData | null
 */
const getPost = async ({
  category,
  filename,
}: {
  category: string;
  filename: string;
}): Promise<SinglePostViewData | null> => {
  if (!category || !filename) {
    return null;
  }

  const path = `/docs/posts/${category}/${filename}.mdx`;
  const importer = postModules[path];

  if (!importer) {
    console.warn(`⚠️ 해당 경로의 mdx 파일을 찾을 수 없습니다: ${path}`);
    return null;
  }

  const { metaData, Content } = await loadModule(importer);
  const isBookmarked = useBookmarkStore.getState().isBookmarked({ category, filename });

  return { metaData, Content, isBookmarked };
};

/**
 * 필터링 된 포스트 반환
 */
const getFilteredEntries = async (): Promise<[string, () => Promise<PostModuleData>][]> => {
  const postPathList = Object.entries(postModules);
  const filter = await getFromStorage(STORAGE_KEYS['filter']);

  // 필터가 없으면 전체 리턴
  if (!filter) return postPathList;

  const validCategories = Object.entries(filter)
    .filter(([, enabled]) => enabled)
    .map(([category]) => category);

  const filtered = postPathList.filter(([path]) => {
    const parsed = parsePath(path);
    return parsed ? validCategories.includes(parsed.category) : false;
  });

  return filtered;
};

/**
 * 랜덤 포스트 반환
 * @returns PostData
 */
const getRandomPost = async (): Promise<PostData> => {
  const postPathList = await getFilteredEntries();
  const recentPosts = (await getFromStorage(STORAGE_KEYS.recentPosts)) || [];

  // 최근 본 포스트를 제외한 포스트 목록
  const availablePosts = postPathList.filter(([path]) => !recentPosts.includes(path));

  const targetPosts = availablePosts.length > 0 ? availablePosts : postPathList;
  const randomEntry = targetPosts[Math.floor(Math.random() * targetPosts.length)];

  const [path, importer] = randomEntry;

  const post = await generatePostData(path, importer);

  if (!post) {
    throw new Error(`유효하지 않은 MDX 경로입니다: ${path}`);
  }

  const updatedRecentPosts = [path, ...recentPosts].slice(0, 5);
  await saveToStorage(STORAGE_KEYS.recentPosts, updatedRecentPosts);

  return post;
};

export { getPost, getPostsByCategory, getRandomPost };
