import "./App.css";
import GetStarted from "./Pages/GetStarted";
import Home from "./Pages/Home";
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


//  <div className="bg-Septenary h-full w-full p-4 text-white">
//         <div className="h-full w-full md:max-w-[60%] mx-auto flex flex-col items-center">
//           <div className="w-full h-full md:min-h-[40vh] flex flex-col gap-4 md:gap-10 justify-center items-center text-2xl md:text-3xl lg:text-5xl py-2">
//             <div className="flex gap-4 text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
//               Hello <p className="capitalize w-fit">{authUser?.fullName || "developer"}</p>
//             </div>

//             <div className="flex flex-col gap-4 text-[10px] md:text-sm ld:text-lg">

//               <p className="font-normal text-center">
//                 I’m here to help you with {expertName} from basics to advanced
//                 topics.<br></br> Feel free to ask any doubt, and I’ll guide you
//                 with clear explanations and examples.
//               </p>

//               <p className="font-normal text-center">
//                 Let’s get started when you’re ready 🙂
//               </p>

//             </div>
//           </div>
//           <div className="w-full">
//             <Prompt />
//           </div>
//           <div className="text-xs mt-1 text-center">
//             EduQuery AI can make mistakes. Check important info
//           </div>
//         </div>
//       </div>