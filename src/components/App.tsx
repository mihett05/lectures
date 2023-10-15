import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from '../pages/home';
import LecturePage from '../pages/lecture';

import CurrentFileProvider from '../lib/current-file';
import { CssBaseline } from '@mui/material';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: ':folder/:file',
    element: <LecturePage />,
  },
]);

function App() {
  return (
    <>
      <CssBaseline />
      <CurrentFileProvider>
        <RouterProvider router={router} />
      </CurrentFileProvider>
    </>
  );
}

export default App;
