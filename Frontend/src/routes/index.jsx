import { createBrowserRouter } from 'react-router-dom';
import Home from '../Pages/Home';
import App from '../App';
import GetStarted from '../Pages/GetStarted';
import Signup from '../Pages/Signup';
import Login from '../Pages/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home/>
      },
      {
        path: "/get-started",
        element: <GetStarted/>
      },
      {
        path: "/signup",
        element: <Signup/>
      },
      {
        path: "/login",
        element: <Login/>
      },
    ],
  },
]);


export default router;