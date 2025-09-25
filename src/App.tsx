// import Header from './components/Header/Header';
// import LandingPage from './pages/LandingPage';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Mailbox from "./pages/Mailbox";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const App: React.FC = () => {
  return (
      <Router>
       <div className="flex">
         <Sidebar />
         <div className="flex-1 bg-gray-100 min-h-screen p-6">
           <Routes>
             <Route path="/dashboard" element={<Dashboard />} />
             <Route path="/mailbox" element={<Mailbox />} />
             {/* <Route path="/profile" element={<Profile />} />
             <Route path="/settings" element={<Settings />} /> */}
           </Routes>
         </div>
       </div>
     </Router>
    
    // <div className="background-container">
    //   <div className="content-container">
    //     {/* <Header /> */}
    //     {/* <LandingPage /> */}
    //     {/* <h1>Fixed Background, Scrollable Content</h1>
    //     <p>Scroll down for more content...</p> */}
    //     {/* <div style={{ height: '1500px' }} /> Simulate scroll */}
    //   </div>
    // </div>
  );
}

export default App;

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./Dashboard";
// import Mailbox from "./pages/Mailbox";
// // import Profile from "./pages/Profile";
// // import Settings from "./pages/Settings";

// function App() {
//   return (
//     <Router>
//       <div className="flex">
//         <Sidebar />
//         <div className="flex-1 bg-gray-100 min-h-screen p-6">
//           <Routes>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/mailbox" element={<Mailbox />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/settings" element={<Settings />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;
