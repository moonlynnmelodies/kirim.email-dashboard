// import Header from './components/Header/Header';
// import LandingPage from './pages/LandingPage';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Popup from "./components/Popup";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Domain from "./pages/Domain/Domain";
import NewDomain from "./pages/Domain/NewDomain"
import Mailbox from "./pages/Mailbox";
import MailboxDetail from "./pages/MailboxDetail";
import Security from "./pages/Security/Management";
import MonitoringAndReports from "./pages/MonitoringAndReports/Management";
import Invoice from "./pages/Billing/Invoice";
import InvoiceDetail from "./pages/Billing/InvoiceDetail";
import Billing from "./pages/Billing/Management";
import ManagementDetail from "./pages/Billing/ManagementDetail";
import DeveloperMenu from "./pages/DeveloperMenu/AccountSetting";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



const App: React.FC = () => {
  return (
      <Router>
       <div className="flex">
         <Sidebar />
         <div className="flex-1 bg-gray-100 min-h-screen p-6">
           <Routes>
             <Route path="/dashboard" element={<Dashboard />} />
             <Route path="/domain/management" element={<Domain />} />
             <Route path="/domain/new" element={<NewDomain />} />
             <Route path="/mailbox/management" element={<Mailbox />} />
             <Route path="/mailbox/management:id" element={<MailboxDetail />} />
             <Route path="/security/management" element={<Security />} />
             <Route path="/monitoring-and-reports/management" element={<MonitoringAndReports />} />
             <Route path="/invoice/invoice:id" element={<InvoiceDetail />} />
             <Route path="/billing/invoice" element={<Invoice />} />
             <Route path="/billing/management" element={<Billing />} />
             <Route path="/billing/management/:id" element={<ManagementDetail />} />
             <Route path="/developer-menu/account-setting" element={<DeveloperMenu />} />


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
