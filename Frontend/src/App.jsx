import './App.css'
import GetStarted from './Pages/GetStarted'
import Home from './Pages/Home'
import { Outlet } from "react-router-dom";

function App() {
  
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App
