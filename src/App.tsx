import { useEffect } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';

import { Layout } from '@/components';
import routes from '~react-pages';

import { ErrorPage } from './features/error';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
