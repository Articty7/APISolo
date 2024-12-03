import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import SpotList from './components/SpotList/SpotList';
import SpotPage from './components/SpotPage/SpotPage';
import * as sessionActions from './store/session';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SpotList current={false}/>
      },
      {
        path: '/spots/current',
        element: <SpotList current={true} />
      },
      {
        path: '/spots/:id',
        element: <SpotPage />
      },
      {
        path: '/spots/new',
        element: <div>
          Spot Form Page
        </div>
      },
      {
        path: '/spots/:id/edit',
        element: <div>
          Spot Form Page
        </div>
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
4