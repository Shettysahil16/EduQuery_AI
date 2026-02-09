import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <div>
        <ToastContainer
          autoClose={3000}
          position="top-center"
          pauseOnFocusLoss={false}
          pauseOnHover={false}
        />
        <Outlet />
      </div>
    </>
  );
}

export default App;
