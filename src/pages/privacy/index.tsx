import PrivacyContent from '/PRIVACY.md';
import { MetaTags } from '@/components';
import { MDXRender } from '@/features/post';

export default function Privacy() {
  return (
    <>
      <MetaTags title="디룩 | 개인정보처리방침" />
      <MDXRender>
        <PrivacyContent />
      </MDXRender>
    </>
  );
}
