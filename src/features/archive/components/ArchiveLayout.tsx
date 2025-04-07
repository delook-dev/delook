import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SidebarCollapsibleMenu, SidebarLayout } from '@/components';

import { CategoryList } from '../types/archiveTypes';

export const ArchiveLayout = ({
  categoryList,
  children,
}: {
  categoryList: CategoryList[];
  children: React.ReactNode;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSelectedPost = useCallback(
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
        onClick: () => handleSelectedPost(category, filename),
      }))}
    />
  ));

  return <SidebarLayout sidebarMenu={sidebarMenu}>{children}</SidebarLayout>;
};
