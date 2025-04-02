import { useRoutes } from 'react-router-dom';

import { ErrorPage, Layout } from '@/components';
import routes from '~react-pages';

export default function App() {
  return (
    <>
      {useRoutes([
        {
          element: <Layout />,
          children: [...routes, { path: '*', element: <ErrorPage type="NOT_FOUND" /> }],
        },
      ])}
    </>
  );
}
