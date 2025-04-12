import { BookmarkData, CategorizedBookmarks } from '@/features/bookmark';
import {
  PostData,
  PostModuleData,
  PostModules,
  PostPathData,
  SinglePostViewData,
} from '@/features/post';
import { getFromStorage } from '@/lib';

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
 * 북마크 여부 확인
 * @param category
 * @param filename
 * @returns boolean
 */
const checkBookmark = async (category: string, filename: string): Promise<boolean> => {
  const saved = (await getFromStorage('saved_posts')) as CategorizedBookmarks;
  if (!saved) return false;

  return (saved[category] ?? []).some((post: BookmarkData) => post.filename === filename);
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

  const isBookmarked = await checkBookmark(category, filename);

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
  const entries = Object.entries(postModules);

  for (const [path, importer] of entries) {
    const post = await generatePostData(path, importer);
    if (!post) continue;

    if (!grouped[post.category]) grouped[post.category] = [];
    grouped[post.category].push(post);
  }

  return grouped;
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
  const path = `/docs/posts/${category}/${filename}.mdx`;
  const importer = postModules[path];

  if (!importer) {
    console.warn(`⚠️ 해당 경로의 mdx 파일을 찾을 수 없습니다: ${path}`);
    return null;
  }

  const { metaData, Content } = await loadModule(importer);
  const isBookmarked = await checkBookmark(category, filename);

  return { metaData, Content, isBookmarked };
};

/**
 * 랜덤 포스트 반환
 * @returns PostData
 */
const getRandomPost = async (): Promise<PostData> => {
  const entries = Object.entries(postModules);
  const randomEntry = entries[Math.floor(Math.random() * entries.length)];
  const [path, importer] = randomEntry;

  const post = await generatePostData(path, importer);
  if (!post) {
    throw new Error(`유효하지 않은 MDX 경로입니다: ${path}`);
  }

  return post;
};

export { getPost, getPostsByCategory, getRandomPost };
