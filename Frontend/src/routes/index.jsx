import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import App from "../App";
import GetStarted from "../Pages/GetStarted";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import Experts from "../Pages/ExpertsPage/Experts";
//import Right from "../Right/Right";
import MainContent from "../Components/MainContent/MainContent";
import History from "../Pages/ExpertsPage/Experts";
//import Dashboard from "../Components/Dashboard";
import Layout from "../layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <Home /> }, // default main content
          { path: "expert", element: <Experts /> },
          { path: "history", element: <History /> },
          { path: "main-content", element: <MainContent /> },
        ],
      },

      
      {
        path: "get-started",
        element: <GetStarted />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
