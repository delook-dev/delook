// components/SeoHead.tsx
import { Helmet } from 'react-helmet-async';

import { SITE_URL } from '@/constants';

interface MetaTagsProps {
  title: string;
  description?: string;
  url?: string;
  keywords?: string;
}

export const MetaTags = ({ title, description, url, keywords }: MetaTagsProps) => (
  <Helmet prioritizeSeoTags>
    <title>{title}</title>
    <meta
      name="description"
      content={
        description ??
        '디룩은 랜덤한 프로그래밍 개념을 보여주어, 매일 자연스럽게 학습할 수 있는 환경을 제공합니다. 꾸준한 학습을 통해 기술 면접과 실무에 자신감을 더하세요.'
      }
    />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url ?? SITE_URL} />
    <meta
      name="keywords"
      content={
        keywords ??
        '개발, 디룩, Delook, 개발 인사이트, 기술면접, CS 개념, 프론트엔드 학습, 백엔드 학습, 개발자 탭, 개발자 확장 프로그램'
      }
    />
    <link rel="canonical" href={url ?? SITE_URL} />
  </Helmet>
);
