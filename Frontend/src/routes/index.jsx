import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import App from "../App";
import GetStarted from "../Pages/GetStarted";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import Experts from "../Pages/ExpertsPage/Experts";
import History from "../Pages/ExpertsPage/Experts";
import Layout from "../layout/Layout";
import ChatPage from "../Pages/ChatSection/ChatPage";

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
          { path: "chats", element: <ChatPage /> },
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
