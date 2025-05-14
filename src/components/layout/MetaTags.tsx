import { Helmet } from 'react-helmet-async';

import { SITE_URL } from '@/constants';

const DEFAULT_DESCRIPTION = '개념 학습부터 기술 면접 준비까지, 성장하는 개발자의 새 탭';
const DEFAULT_KEYWORDS =
  '개발, 디룩, Delook, 개발 인사이트, 기술면접, CS 개념, 프론트엔드 학습, 백엔드 학습, 개발자 탭, 개발자 확장 프로그램';

interface MetaTagsProps {
  title: string;
  description?: string;
  url?: string;
  keywords?: string;
}

export const MetaTags = ({ title, description, url, keywords }: MetaTagsProps) => {
  const metaDescription = description ?? DEFAULT_DESCRIPTION;
  const metaKeywords = keywords ? `${keywords}, ${DEFAULT_KEYWORDS}` : DEFAULT_KEYWORDS;
  const metaUrl = url ?? SITE_URL;

  return (
    <Helmet prioritizeSeoTags>
      <meta name="title" content={title} />
      <meta name="description" content={metaDescription} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={metaUrl} />
      <meta name="keywords" content={metaKeywords} />

      <meta property="twitter:url" content={metaUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={metaDescription} />

      <link rel="canonical" href={url ?? SITE_URL} />
    </Helmet>
  );
};
