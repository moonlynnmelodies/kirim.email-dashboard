
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
             <Route path="/mailbox/management/:id" element={<MailboxDetail />} />
             <Route path="/security/management" element={<Security />} />
             <Route path="/monitoring-and-reports/management" element={<MonitoringAndReports />} />
             <Route path="/billing/invoice" element={<Invoice />} />
             <Route path="/billing/invoice/:id" element={<InvoiceDetail />} />
             <Route path="/billing/management" element={<Billing />} />
             <Route path="/billing/management/:id" element={<ManagementDetail />} />
             <Route path="/developer-menu/account-setting" element={<DeveloperMenu />} />
           </Routes>
         </div>
       </div>
     </Router>
  );
}

export default App;
