import { useRoutes } from 'react-router-dom';

import { Layout } from '@/components';
import routes from '~react-pages';

import { ErrorPage } from './features/error';

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
