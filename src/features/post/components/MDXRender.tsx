import '@/styles/github-dark.css';
import '@/styles/markdown.css';

import { MDXProvider } from '@mdx-js/react';

export function MDXRender({ children }: { children: React.ReactNode }) {
  return (
    <article className="markdown prose w-full dark:prose-invert">
      <MDXProvider>{children}</MDXProvider>
    </article>
  );
}
