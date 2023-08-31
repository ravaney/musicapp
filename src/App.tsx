import './App.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Home } from './Home';
import { Layout } from './Layout';
import { PlayAlbum } from './PlayAlbum';
import { PlayArtist } from './PlayArtist';
import { PlayPodcasts } from './PlayPodcasts';
import { Podcasts } from './Podcasts';
import React from 'react';
import { Top100 } from './Top100';

const router = createBrowserRouter([
  {
    path: '/', element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/artist/:id',
        element: <PlayArtist />,
      },
      {
        path: '/album/:albumId',
        element: <PlayAlbum />,
      },
      {
        path: '/top100',
        element: <Top100 />,
      },
      {
        path: '/podcasts',
        element: <Podcasts />,
        children: [
          {
            index: true,
            element: <PlayPodcasts />,
          },
          {
            path: '/podcasts/:id',
            element: <PlayPodcasts />,
          }
        ]

      }
    ]
  }
]);

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
