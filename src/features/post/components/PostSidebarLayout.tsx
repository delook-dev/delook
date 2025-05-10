import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SidebarCollapsibleMenu, SidebarLayout } from '@/components';

import { CategoryList } from '../types/postTypes';

export const PostSidebarLayout = ({
  categoryList,
  children,
}: {
  categoryList: CategoryList[];
  children: React.ReactNode;
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
        isActive: searchParams.get('filename') === filename,
        onClick: () => handleSearchParams(category, filename),
      }))}
    />
  ));

  return (
    <SidebarLayout sidebarMenu={sidebarMenu}>
      <div className="mx-auto h-full max-w-3xl">{children}</div>
    </SidebarLayout>
  );
};
