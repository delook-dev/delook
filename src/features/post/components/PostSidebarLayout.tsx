import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SidebarCollapsibleMenu, SidebarLayout } from '@/components';

import { CategoryList } from '../types/postTypes';

export const PostSidebarLayout = ({
  categoryList,
  children,
  activePost,
}: {
  categoryList: CategoryList[];
  children: React.ReactNode;
  activePost?: string;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchParams = useCallback(
    (category: string, filename: string) => {
      setSearchParams({ category, filename });
    },
    [setSearchParams],
  );

  const sidebarMenu = categoryList.map(({ category, posts }) => (
    <SidebarCollapsibleMenu
      key={category}
      label={category}
      items={posts.map(({ filename, title }) => ({
        key: filename,
        title: title,
        isActive: searchParams.get('filename') === filename || activePost === filename,
        onClick: () => handleSearchParams(category, filename),
      }))}
    />
  ));

  return (
    <SidebarLayout sidebarMenu={sidebarMenu}>
      <div className="mx-auto max-w-3xl md:px-6 md:pt-4">{children}</div>
    </SidebarLayout>
  );
};
