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
import ExpertPage from "../Pages/ExpertsPage/ExpertPage";
import HistoryPage from "../Pages/HistoryPage/HistoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <Home /> }, // default main content
          { path: "history", element: <History /> },
          { path: "chats", element: <ChatPage /> },
          { path: "experts", element: <Experts />},
          { path: "/experts/:expertName", element: <ExpertPage /> },
          { path: "/chats/:conversationId", element: <HistoryPage /> },
        ],
      },

      
      {
        path: "/get-started",
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
