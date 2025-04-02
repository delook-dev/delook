import { useRoutes } from 'react-router-dom';

import routes from '~react-pages';

import { ErrorPage } from './components/error';
import Layout from './components/layout/Layout';

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
