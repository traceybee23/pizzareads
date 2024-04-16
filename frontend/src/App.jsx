import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import BooksList from './components/BooksList';
import SingleBook from './components/SingleBook';
import BookProgress from './components/BookProgress';
import LandingPage from './components/LandingPage';
import UserCoupons from './components/UserCoupons';


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
        element: <LandingPage />
      },
      {
        path: '/books',
        element: <BooksList />
      },
      {
        path: '/books/:bookId',
        element: <SingleBook />
      },
      {
        path: '/progress/user/:userId',
        element: <BookProgress />
      },
      {
        path: '/coupons/current',
        element: <UserCoupons />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
