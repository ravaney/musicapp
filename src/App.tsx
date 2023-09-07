import './App.css';
import '@pnp/sp/lists';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Currency } from './Currency';
import { Feedback } from './Feedback';
import { Home } from './Home';
import { Layout } from './Layout';
import { PlayAlbum } from './PlayAlbum';
import { PlayArtist } from './PlayArtist';
import { PlayPodcasts } from './PlayPodcasts';
import { Podcasts } from './Podcasts';
import { Top100 } from './Top100';
import { initializeIcons } from '@fluentui/react';

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
      },
      {
        path: '/feedback',
        element: <Feedback />,
      },
      {
        path: '/currency',
        element: <Currency />,
      }
    ]
  }
]);

function App() {
  initializeIcons();

  return (
    <RouterProvider router={router} />
  );
}

export default App;
