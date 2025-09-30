// import { useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import DropdownSearch from "../components/DropdownSearch";
// import { sampleData } from "../data/sampleData";

// function parseCountFraction(input: string): { used: number; total: number } {
//   const [usedStr, totalStr] = input.split("/");
//   const used = Number((usedStr || "").replace(/[^0-9.]/g, ""));
//   const total = Number((totalStr || "").replace(/[^0-9.]/g, ""));
//   return { used: isNaN(used) ? 0 : used, total: isNaN(total) ? 0 : total };
// }

// function parseGbFraction(input: string): { used: number; total: number } {
//   // e.g. "30GB/150GB"
//   return parseCountFraction(input);
// }

// const Dashboard: React.FC = () => {
//   // global org scope
//   const [selectedOrganization, setSelectedOrganization] = useState<string | null>(null);

//   const {
//     scopedOrganizations,
//     scopedDomains,
//     totalOrganizations,
//     totalActiveDomains,
//     totalUnpaidItems,
//     twoFaEnabled,
//     twoFaTotal,
//     mailboxUsed,
//     mailboxTotal,
//     storageUsed,
//     storageTotal,
//     upcomingExpiries,
//     recentActivities,
//   } = useMemo(() => {
//     const orgs = selectedOrganization
//       ? sampleData.filter(o => o.organization === selectedOrganization)
//       : sampleData;

//     const domains = orgs.flatMap(o => o.domains);

//     // counts
//     const activeDomains = domains.filter(d => d.domStatus === "Active").length;
//     const unpaidCount = domains.filter(d => d.paymentStatus === "Unpaid").length;

//     // auth stats
//     const allAuth = domains.flatMap(d => d.authentications || []);
//     const enabled2fa = allAuth.filter(a => (a.securityStatus || "").toLowerCase() === "enabled").length;

//     // usage aggregation (domain-level is consistent in data)
//     const mailboxAgg = domains.reduce(
//       (acc, d) => {
//         const { used, total } = parseCountFraction(String(d.domMailboxCount || "0/0"));
//         acc.used += used;
//         acc.total += total;
//         return acc;
//       },
//       { used: 0, total: 0 }
//     );

//     const storageAgg = domains.reduce(
//       (acc, d) => {
//         const { used, total } = parseGbFraction(String(d.domStorageUsed || "0/0"));
//         acc.used += used;
//         acc.total += total;
//         return acc;
//       },
//       { used: 0, total: 0 }
//     );

//     // upcoming expiries (next 60 days)
//     const now = new Date();
//     const sixtyDaysMs = 60 * 24 * 60 * 60 * 1000;
//     const upcoming = domains
//       .map(d => ({
//         domain: d.domain,
//         organization: orgs.find(o => o.domains.some(x => x.id === d.id))?.organization || "",
//         expiryDate: d.expiryDate,
//         domStatus: d.domStatus,
//       }))
//       .filter(x => !!x.expiryDate)
//       .filter(x => {
//         const dt = new Date(String(x.expiryDate));
//         return dt.getTime() - now.getTime() <= sixtyDaysMs && dt.getTime() >= now.getTime();
//       })
//       .sort((a, b) => new Date(String(a.expiryDate)).getTime() - new Date(String(b.expiryDate)).getTime())
//       .slice(0, 5);

//     // recent activities
//     const activities = orgs
//       .flatMap(o =>
//         o.domains.flatMap(d =>
//           (d.authentications || []).flatMap(a => a.activityLogs || []).map(l => ({
//             user: l.user,
//             activity: l.activity,
//             timestamp: l.timestamp,
//             domain: d.domain,
//             organization: o.organization,
//           }))
//         )
//       )
//       .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
//       .slice(0, 6);

//     return {
//       scopedOrganizations: orgs,
//       scopedDomains: domains,
//       totalOrganizations: orgs.length,
//       totalActiveDomains: activeDomains,
//       totalUnpaidItems: unpaidCount,
//       twoFaEnabled: enabled2fa,
//       twoFaTotal: allAuth.length,
//       mailboxUsed: mailboxAgg.used,
//       mailboxTotal: mailboxAgg.total,
//       storageUsed: storageAgg.used,
//       storageTotal: storageAgg.total,
//       upcomingExpiries: upcoming,
//       recentActivities: activities,
//     };
//   }, [selectedOrganization]);

//   const mailboxPercent = mailboxTotal > 0 ? Math.round((mailboxUsed / mailboxTotal) * 100) : 0;
//   const storagePercent = storageTotal > 0 ? Math.round((storageUsed / storageTotal) * 100) : 0;
//   const twoFaPercent = twoFaTotal > 0 ? Math.round((twoFaEnabled / twoFaTotal) * 100) : 0;

//   return (
//     <div>
//       {/* Top search/profile bar with global org scope */}
//       <div className="bg-white rounded-md flex justify-start items-center h-14 shadow-sm pl-4">
//         <svg
//           className="w-4 h-4 text-gray-500 pr-1"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 20 20"
//         >
//           <path
//             stroke="currentColor"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//           />
//         </svg>
//         <div className="ml-2 w-64">
//           <DropdownSearch
//             options={sampleData.map(b => b.organization)}
//             placeholder="Filter by organization"
//             onSelect={(value) => setSelectedOrganization(value)}
//           />
//         </div>
//         <div className="ml-auto mr-4">
//           <img
//             src="/src/assets/images/profile.png"
//             className="h-9 w-9 rounded-full object-cover cursor-pointer"
//             alt="Profile"
//           />
//         </div>
//       </div>

//       {/* Headline */}
//       <div className="mt-6">
//         <h1 className="text-2xl font-bold">Dashboard</h1>
//         <p className="text-gray-600 text-sm mt-1">Quick overview of your email platform.</p>
//       </div>

//       {/* KPI Cards */}
//       <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
//         <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between">
//             <p className="text-sm text-gray-500">Organizations</p>
//             <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">scoped</span>
//           </div>
//           <p className="text-3xl font-semibold mt-2">{totalOrganizations}</p>
//           <p className="text-xs text-gray-400 mt-1">Selected scope</p>
//         </div>

//         <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between">
//             <p className="text-sm text-gray-500">Active Domains</p>
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-green-500">
//               <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-2.79a.75.75 0 0 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 1.06-1.06l1.72 1.72 3.97-3.97Z" clipRule="evenodd" />
//             </svg>
//           </div>
//           <p className="text-3xl font-semibold mt-2">{totalActiveDomains}</p>
//           <p className="text-xs text-gray-400 mt-1">Domains currently active</p>
//         </div>

//         <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between">
//             <p className="text-sm text-gray-500">Unpaid</p>
//             <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-700">billing</span>
//           </div>
//           <p className="text-3xl font-semibold mt-2">{totalUnpaidItems}</p>
//           <p className="text-xs text-gray-400 mt-1">Domains with unpaid status</p>
//         </div>

//         <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between">
//             <p className="text-sm text-gray-500">2FA Enabled</p>
//             <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">security</span>
//           </div>
//           <p className="text-3xl font-semibold mt-2">{twoFaPercent}%</p>
//           <p className="text-xs text-gray-400 mt-1">{twoFaEnabled}/{twoFaTotal} accounts</p>
//         </div>
//       </div>

//       {/* Usage Cards */}
//       <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between">
//             <p className="text-sm text-gray-500">Mailbox Usage</p>
//             <span className="text-xs text-gray-400">{mailboxUsed}/{mailboxTotal}</span>
//           </div>
//           <div className="w-full bg-gray-100 h-2 rounded mt-3">
//             <div className="h-2 rounded bg-blue-600" style={{ width: `${Math.min(100, mailboxPercent)}%` }} />
//           </div>
//           <p className="text-xs text-gray-500 mt-2">{mailboxPercent}% of allocated mailboxes used</p>
//         </div>

//         <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between">
//             <p className="text-sm text-gray-500">Storage Usage (GB)</p>
//             <span className="text-xs text-gray-400">{storageUsed} / {storageTotal} GB</span>
//           </div>
//           <div className="w-full bg-gray-100 h-2 rounded mt-3">
//             <div className="h-2 rounded bg-indigo-600" style={{ width: `${Math.min(100, storagePercent)}%` }} />
//           </div>
//           <p className="text-xs text-gray-500 mt-2">{storagePercent}% of storage used</p>
//         </div>
//       </div>

//       {/* Lower panels */}
//       <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-4">
//         {/* Upcoming Expiry */}
//         <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between mb-3">
//             <h2 className="font-semibold">Upcoming Expiry</h2>
//             <Link to="/domain/management" className="text-xs text-blue-600 hover:underline">View all</Link>
//           </div>
//           {upcomingExpiries.length === 0 ? (
//             <p className="text-sm text-gray-500">No domains expiring soon.</p>
//           ) : (
//             <ul className="divide-y">
//               {upcomingExpiries.map((x, idx) => (
//                 <li key={idx} className="py-2 flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium">{x.domain}</p>
//                     <p className="text-xs text-gray-500">{x.organization}</p>
//                   </div>
//                   <div className="text-right">
//                     <span className="text-xs text-gray-500">{x.expiryDate}</span>
//                     <div className="text-[10px] px-2 py-0.5 rounded-full inline-block ml-2 bg-yellow-50 text-yellow-700">
//                       {x.domStatus}
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Recent Activity */}
//         <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between mb-3">
//             <h2 className="font-semibold">Recent Activity</h2>
//             <Link to="/developer-menu/activity-logs" className="text-xs text-blue-600 hover:underline">View all</Link>
//           </div>
//           {recentActivities.length === 0 ? (
//             <p className="text-sm text-gray-500">No recent activity.</p>
//           ) : (
//             <ul className="divide-y">
//               {recentActivities.map((a, idx) => (
//                 <li key={idx} className="py-2">
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm"><span className="font-medium">{a.user}</span> {a.activity}</p>
//                     <span className="text-xs text-gray-500">{a.timestamp}</span>
//                   </div>
//                   <p className="text-xs text-gray-500">{a.domain} • {a.organization}</p>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Billing Status */}
//         <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between mb-3">
//             <h2 className="font-semibold">Billing Status</h2>
//             <Link to="/billing/management" className="text-xs text-blue-600 hover:underline">Manage</Link>
//           </div>
//           <div className="flex items-center gap-3">
//             <div className="h-8 w-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-sm font-semibold">
//               {totalUnpaidItems}
//             </div>
//             <div>
//               <p className="text-sm font-medium">Unpaid Domains</p>
//               <p className="text-xs text-gray-500">Requires attention</p>
//             </div>
//           </div>
//           <div className="mt-4 grid grid-cols-2 gap-2">
//             {scopedDomains.slice(0, 4).map(d => (
//               <div key={d.id} className="border border-gray-100 rounded p-2">
//                 <p className="text-sm font-medium truncate">{d.domain}</p>
//                 <p className="text-xs text-gray-500 truncate">{d.paymentStatus} • {d.paymentMethod}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DropdownSearch from "../components/DropdownSearch";
import { sampleData } from "../data/sampleData";
import Card from "../components/Card";

function parseCountFraction(input: string): { used: number; total: number } {
  const [usedStr, totalStr] = input.split("/");
  const used = Number((usedStr || "").replace(/[^0-9.]/g, ""));
  const total = Number((totalStr || "").replace(/[^0-9.]/g, ""));
  return { used: isNaN(used) ? 0 : used, total: isNaN(total) ? 0 : total };
}

function parseGbFraction(input: string): { used: number; total: number } {
  // e.g. "30GB/150GB"
  return parseCountFraction(input);
}

const Dashboard: React.FC = () => {
  // global org scope
  const [selectedOrganization, setSelectedOrganization] = useState<string | null>(null);

  const {
    scopedOrganizations,
    scopedDomains,
    totalOrganizations,
    totalActiveDomains,
    totalUnpaidItems,
    twoFaEnabled,
    twoFaTotal,
    mailboxUsed,
    mailboxTotal,
    storageUsed,
    storageTotal,
    upcomingExpiries,
    recentActivities,
  } = useMemo(() => {
    const orgs = selectedOrganization
      ? sampleData.filter(o => o.organization === selectedOrganization)
      : sampleData;

    const domains = orgs.flatMap(o => o.domains);

    // counts
    const activeDomains = domains.filter(d => d.domStatus === "Active").length;
    const unpaidCount = domains.filter(d => d.paymentStatus === "Unpaid").length;

    // auth stats
    const allAuth = domains.flatMap(d => d.authentications || []);
    const enabled2fa = allAuth.filter(a => (a.securityStatus || "").toLowerCase() === "enabled").length;

    // usage aggregation (domain-level is consistent in data)
    const mailboxAgg = domains.reduce(
      (acc, d) => {
        const { used, total } = parseCountFraction(String(d.domMailboxCount || "0/0"));
        acc.used += used;
        acc.total += total;
        return acc;
      },
      { used: 0, total: 0 }
    );

    const storageAgg = domains.reduce(
      (acc, d) => {
        const { used, total } = parseGbFraction(String(d.domStorageUsed || "0/0"));
        acc.used += used;
        acc.total += total;
        return acc;
      },
      { used: 0, total: 0 }
    );

    // upcoming expiries (next 60 days)
    const now = new Date();
    const sixtyDaysMs = 60 * 24 * 60 * 60 * 1000;
    const upcoming = domains
      .map(d => ({
        domain: d.domain,
        organization: orgs.find(o => o.domains.some(x => x.id === d.id))?.organization || "",
        expiryDate: d.expiryDate,
        domStatus: d.domStatus,
      }))
      .filter(x => !!x.expiryDate)
      .filter(x => {
        const dt = new Date(String(x.expiryDate));
        return dt.getTime() - now.getTime() <= sixtyDaysMs && dt.getTime() >= now.getTime();
      })
      .sort((a, b) => new Date(String(a.expiryDate)).getTime() - new Date(String(b.expiryDate)).getTime())
      .slice(0, 5);

    // recent activities
    const activities = orgs
      .flatMap(o =>
        o.domains.flatMap(d =>
          (d.authentications || []).flatMap(a => a.activityLogs || []).map(l => ({
            user: l.user,
            activity: l.activity,
            timestamp: l.timestamp,
            domain: d.domain,
            organization: o.organization,
          }))
        )
      )
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 6);

    return {
      scopedOrganizations: orgs,
      scopedDomains: domains,
      totalOrganizations: orgs.length,
      totalActiveDomains: activeDomains,
      totalUnpaidItems: unpaidCount,
      twoFaEnabled: enabled2fa,
      twoFaTotal: allAuth.length,
      mailboxUsed: mailboxAgg.used,
      mailboxTotal: mailboxAgg.total,
      storageUsed: storageAgg.used,
      storageTotal: storageAgg.total,
      upcomingExpiries: upcoming,
      recentActivities: activities,
    };
  }, [selectedOrganization]);

  const mailboxPercent = mailboxTotal > 0 ? Math.round((mailboxUsed / mailboxTotal) * 100) : 0;
  const storagePercent = storageTotal > 0 ? Math.round((storageUsed / storageTotal) * 100) : 0;
  const twoFaPercent = twoFaTotal > 0 ? Math.round((twoFaEnabled / twoFaTotal) * 100) : 0;

  return (
    <div>
      {/* Top search/profile bar with global org scope */}
      <div className="bg-white rounded-md flex justify-start items-center h-14 shadow-sm pl-4">
        <svg
          className="w-4 h-4 text-gray-500 pr-1"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <div className="ml-2 w-64">
          <DropdownSearch
            options={sampleData.map(b => b.organization)}
            placeholder="Filter by organization"
            onSelect={(value) => setSelectedOrganization(value)}
          />
        </div>
        <div className="ml-auto mr-4">
          <img
            src="/src/assets/images/profile.png"
            className="h-9 w-9 rounded-full object-cover cursor-pointer"
            alt="Profile"
          />
        </div>
      </div>

      

      {/* Headline */}
      <div className="mt-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600 text-sm mt-1">Quick overview of your email platform.</p>
      </div>

      {/* KPI Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card subtitle="Selected scope" badgeText="scoped" badgeClassName="bg-blue-50 text-blue-700">
          <p className="text-sm text-gray-500">Organizations</p>
          <p className="text-3xl font-semibold mt-2">{totalOrganizations}</p>
        </Card>

        <Card subtitle="Domains currently active" action={(
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-green-500">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-2.79a.75.75 0 0 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 1.06-1.06l1.72 1.72 3.97-3.97Z" clipRule="evenodd" />
          </svg>
        )}>
          <p className="text-sm text-gray-500">Active Domains</p>
          <p className="text-3xl font-semibold mt-2">{totalActiveDomains}</p>
        </Card>

        <Card subtitle="Domains with unpaid status" badgeText="billing" badgeClassName="bg-red-50 text-red-700">
          <p className="text-sm text-gray-500">Unpaid</p>
          <p className="text-3xl font-semibold mt-2">{totalUnpaidItems}</p>
        </Card>

        <Card subtitle={`${twoFaEnabled}/${twoFaTotal} accounts`} badgeText="security" badgeClassName="bg-emerald-50 text-emerald-700">
          <p className="text-sm text-gray-500">2FA Enabled</p>
          <p className="text-3xl font-semibold mt-2">{twoFaPercent}%</p>
        </Card>
      </div>

      {/* Usage Cards */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card subtitle={`${mailboxUsed}/${mailboxTotal}`}>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Mailbox Usage</p>
            <span className="text-xs text-gray-400">{mailboxUsed}/{mailboxTotal}</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded mt-3">
            <div className="h-2 rounded bg-blue-600" style={{ width: `${Math.min(100, mailboxPercent)}%` }} />
          </div>
          <p className="text-xs text-gray-500 mt-2">{mailboxPercent}% of allocated mailboxes used</p>
        </Card>

        <Card subtitle={`${storageUsed} / ${storageTotal} GB`}>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Storage Usage (GB)</p>
            <span className="text-xs text-gray-400">{storageUsed} / {storageTotal} GB</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded mt-3">
            <div className="h-2 rounded bg-indigo-600" style={{ width: `${Math.min(100, storagePercent)}%` }} />
          </div>
          <p className="text-xs text-gray-500 mt-2">{storagePercent}% of storage used</p>
        </Card>
      </div>

      {/* Lower panels */}
      <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Upcoming Expiry */}
        <Card title="Upcoming Expiry" action={(<Link to="/domain/management" className="text-xs text-blue-600 hover:underline">View all</Link>)}>
          {upcomingExpiries.length === 0 ? (
            <p className="text-sm text-gray-500">No domains expiring soon.</p>
          ) : (
            <ul className="divide-y">
              {upcomingExpiries.map((x, idx) => (
                <li key={idx} className="py-2 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{x.domain}</p>
                    <p className="text-xs text-gray-500">{x.organization}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">{x.expiryDate}</span>
                    <div className="text-[10px] px-2 py-0.5 rounded-full inline-block ml-2 bg-yellow-50 text-yellow-700">
                      {x.domStatus}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Recent Activity */}
        <Card title="Recent Activity" action={(<Link to="/developer-menu/activity-logs" className="text-xs text-blue-600 hover:underline">View all</Link>)}>
          {recentActivities.length === 0 ? (
            <p className="text-sm text-gray-500">No recent activity.</p>
          ) : (
            <ul className="divide-y">
              {recentActivities.map((a, idx) => (
                <li key={idx} className="py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm"><span className="font-medium">{a.user}</span> {a.activity}</p>
                    <span className="text-xs text-gray-500">{a.timestamp}</span>
                  </div>
                  <p className="text-xs text-gray-500">{a.domain} • {a.organization}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Billing Status */}
        <Card title="Billing Status" action={(<Link to="/billing/management" className="text-xs text-blue-600 hover:underline">Manage</Link>)}>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-sm font-semibold">
              {totalUnpaidItems}
            </div>
            <div>
              <p className="text-sm font-medium">Unpaid Domains</p>
              <p className="text-xs text-gray-500">Requires attention</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {scopedDomains.slice(0, 4).map(d => (
              <div key={d.id} className="border border-gray-100 rounded p-2">
                <p className="text-sm font-medium truncate">{d.domain}</p>
                <p className="text-xs text-gray-500 truncate">{d.paymentStatus} • {d.paymentMethod}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;


