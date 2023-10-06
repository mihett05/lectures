import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from '../pages/home';
import LecturePage from '../pages/lecture';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core';
import CurrentFileProvider from '../lib/current-file';

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
    <CurrentFileProvider>
      <RouterProvider router={router} />
    </CurrentFileProvider>
  );
}

export default App;
