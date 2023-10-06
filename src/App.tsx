import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from './pages/home';
import LecturePage from './pages/lecture';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core';
import CurrentFileProvider from './current-file';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: ':folder/:file',
    element: <LecturePage />,
    loader: async ({ params }) => {
      try {
        const filePath = (await import(`./${params.folder}/${params.file}.md`)).default;
        let text = await (await fetch(filePath)).text();
        const images = text.match(/[\w\d]+.png/g);
        if (images != null) {
          const paths = await Promise.all(
            images
              .map((image) => [image, `./${params.folder}/${image}`])
              .map(async (path) => (await import(/* @vite-ignore */ path[1])).default),
          );
          text = images.reduce((prev, curr, i) => prev.replace(curr, paths[i]), text);
        }
        return {
          folder: params.folder,
          file: params.file,
          text,
        };
      } catch (e) {
        throw new Response('Не найдено', { status: 404 });
      }
    },
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
