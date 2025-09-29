
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Domain from "./pages/Domain/Domain";
import NewDomain from "./pages/Domain/NewDomain"
import Mailbox from "./pages/Mailbox/Mailbox";
import MailboxDetail from "./pages/Mailbox/MailboxDetail";
import Security from "./pages/Security/Management";
import Authentication from "./pages/Security/Authentication";
import MonitoringAndReports from "./pages/MonitoringAndReports/Management";
import Invoice from "./pages/Billing/Invoice";
import InvoiceDetail from "./pages/Billing/InvoiceDetail";
import Billing from "./pages/Billing/Management";
import ManagementDetail from "./pages/Billing/ManagementDetail";
// import DeveloperMenu from "./pages/DeveloperMenu/AccountSetting";
import Accounts from "./pages/DeveloperMenu/Accounts";
import RoleBasedAccess from "./pages/DeveloperMenu/RoleBasedAccess";
import ActivityLog from "./pages/DeveloperMenu/ActivityLog";
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
             <Route path="/security/authentication" element={<Authentication />} />
             <Route path="/monitoring-and-reports/management" element={<MonitoringAndReports />} />
             <Route path="/billing/invoice" element={<Invoice />} />
             <Route path="/billing/invoice/:id" element={<InvoiceDetail />} />
             <Route path="/billing/management" element={<Billing />} />
             <Route path="/billing/management/:id" element={<ManagementDetail />} />
             <Route path="/developer-menu/accounts" element={<Accounts />} />
             <Route path="/developer-menu/role-based-access" element={<RoleBasedAccess />} />
             <Route path="/developer-menu/activity-logs" element={<ActivityLog />} />
             {/* <Route path="/developer-menu/account-setting" element={<Accounts />} /> */}
           </Routes>
         </div>
       </div>
     </Router>
  );
}

export default App;
