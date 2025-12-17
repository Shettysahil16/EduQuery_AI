import './App.css'
import GetStarted from './Pages/GetStarted'
import Home from './Pages/Home'
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

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
  )
}

export default App
