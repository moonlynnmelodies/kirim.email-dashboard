// import React, { useState } from "react";

// type DomainItem = {
//   domain: string;
//   status: string;
//   autoRenew: string | number;
//   expires: string | number;
// };

// const Domain: React.FC = () => {
//     const domainList: DomainItem[] = [
//         { domain: "The Sliding", status: "Active", autoRenew: 1961, expires: 1961 },
//         { domain: "Witchy Woman", status: "Active", autoRenew: 1961, expires: 1972 },
//         { domain: "Shining Star", status: "Active", autoRenew: 1961, expires: 1975 },
//       ];

//        // ✅ State for search input
//   const [searchTerm, setSearchTerm] = useState("");

//   // ✅ Filtered domains
//   const filteredDomains = domainList.filter((item) =>
//     item.domain.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // ✅ Handle submit (prevent page reload)
//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//   };
      
//   return (
//     <div>
//         <div className="mt-4 flex justify-between item-center">
//             <h1 className="text-2xl font-bold">Domain</h1>
//             <button type="button" className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Domain</button>
//         </div>

//       {/* <p className="text-sm text-gray-500">Here you can see your domains.</p> */}


//     {/* <form className="flex items-center max-w-sm mt-5">   
//         <label className="sr-only">Search</label>
//         <div className="relative w-full">
//             <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                 <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
//                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
//                 </svg>
//             </div>
//             <input type="text" id="simple-search" className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search domain..." required />
//         </div>
//         <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//             <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
//             </svg>
//             <span className="sr-only">Search</span>
//         </button>
//     </form> */}

//     {/* /* Search  */}
//       <form onSubmit={handleSearch} className="flex items-center max-w-sm mt-5">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)} // ✅ controlled input
//           placeholder="Search domain..."
//           className="w-full border rounded-lg p-2.5 text-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//         />
//         <button
//           type="submit"
//           className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
//         >
//           Search
//         </button>
//       </form>


//       {/* Table */}
//       <div className="mt-7 bg-white p-4 rounded-md">
//         <table className="table-auto w-full border-separate border-spacing-y-3 divide-y divide-gray-300">
//           <thead>
//             <tr className="text-left">
//               <th className="py-2">Domain</th>
//               <th className="py-2">Status</th>
//               <th className="py-2">Auto-Renew</th>
//               <th className="py-2">Expires</th>
//               <th className="py-2">Actions</th>
//             </tr>
//           </thead>

//           <tbody className="text-left">
//             {filteredDomains.length > 0 ? (
//               filteredDomains.map((item, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="py-2">{item.domain}</td>
//                   <td className="py-2">{item.status}</td>
//                   <td className="py-2">{item.autoRenew}</td>
//                   <td className="py-2">{item.expires}</td>
//                   <td className="py-2">
//                     <button className="px-2 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700">
//                       Manage
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={5} className="py-4 text-center text-gray-500">
//                   No domains found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Domain;


import React, { useState } from "react";
import Popup from "../../components/Popup";

type DomainItem = {
  domain: string;
  status: string;
  autoRenew: string | number;
  activeDate: Date;
  expires: Date | String;
};

const Domain: React.FC = () => {
  const [domainList, setDomainList] = useState<DomainItem[]>([
    { domain: "The Sliding", status: "Active", autoRenew: "ON", activeDate: new Date("2024-06-27"), expires: new Date("2026-06-27") },
    { domain: "Witchy Woman", status: "Pending", autoRenew: "ON", activeDate: new Date("2024-06-27"), expires: "-" },
    { domain: "Shining Star", status: "Expired", autoRenew: "OFF", activeDate: new Date("2024-06-27"), expires: new Date("2025-07-01") },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // simple controlled inputs for add form
  const [newDomain, setNewDomain] = useState("");
  const [newStatus, setNewStatus] = useState("Active");
  const [newAutoRenew, setNewAutoRenew] = useState("");
  const [newActiveDate, setNewActiveDate] = useState("");
  const [newExpires, setNewExpires] = useState("");

  const filteredDomains = domainList.filter((d) =>
    d.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddOpen = () => {
    setNewDomain("");
    setNewStatus("Active");
    setNewAutoRenew("");
    setNewActiveDate("");
    setNewExpires("");
    setIsOpen(true);
  };

  const handleAdd = () => {
    if (!newDomain.trim()) return;
  
    const today = new Date(); // tanggal hari ini
    const nextYear = new Date();
    nextYear.setFullYear(today.getFullYear() + 1); // misal expired set 1 tahun ke depan
  
    setDomainList((prev) => [
      ...prev,
      {
        domain: newDomain.trim(),
        status: newStatus,
        autoRenew: "Yes",
        activeDate: today,
        expires: nextYear,
      },
    ]);
  
    setIsOpen(false);
  };

  return (
    <div>
      <div className="mt-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Domain</h1>
        <button
          onClick={handleAddOpen}
          className="px-3 py-2 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
        >
          Add Domain
        </button>
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search domain..."
        className="mt-4 w-full border rounded-lg p-2 text-sm border-gray-300 max-w-sm"
      />

      <div className="mt-7 bg-white p-4 rounded-md">
        <table className="table-auto w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left">
              <th>Domain</th>
              <th>Status</th>
              <th>Auto-Renew</th>
              <th>Active Date</th>
              <th>Expires</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDomains.length > 0 ? (
              filteredDomains.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="py-2">{item.domain}</td>
                  <td className="py-2">{item.status}</td>
                  <td className="py-2">{item.autoRenew}</td>
                  <td className="py-2">{item.activeDate.toLocaleDateString()}</td>
                  <td className="py-2">
                    {item.expires instanceof Date ? item.expires.toLocaleDateString() : item.expires}
                  </td>
                  <td className="py-2 flex items-center gap-2">
                     {/* Edit button */}
                    <button className="p-1 rounded hover:bg-gray-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-white cursor-pointer bg-green-500 rounded-full p-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </button>

                    <button className="p-1 rounded hover:bg-gray-200">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-white cursor-pointer bg-red-500 rounded-full p-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>


                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-3 text-center text-gray-500">
                  No domains found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Popup: add domain */}
      <Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Domain"
        footer={
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 rounded border"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="px-3 py-1 rounded bg-blue-600 text-white"
            >
              Add
            </button>
          </div>
        }
      >
        <div className="space-y-3">
          <div>
            <label className="block text-sm">Domain</label>
            <input
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              className="mt-1 w-full border rounded p-2 text-sm"
              placeholder="example.com"
            />
          </div>

          <div>
            <label className="block text-sm">Status</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="mt-1 w-full border rounded p-2 text-sm"
            >
              <option>Active</option>
              <option>Disabled</option>
              <option>Pending</option>
            </select>
          </div>

          <div>
            <label className="block text-sm">Auto-Renew</label>
            <input
              value={newAutoRenew}
              onChange={(e) => setNewAutoRenew(e.target.value)}
              className="mt-1 w-full border rounded p-2 text-sm"
              placeholder="ON"
            />
          </div>

          <div>
            <label className="block text-sm">Active Date</label>
            <input
              value={newActiveDate}
              onChange={(e) => setNewActiveDate(e.target.value)}
              className="mt-1 w-full border rounded p-2 text-sm"
              placeholder="25-09-20"
            />
          </div>

          <div>
            <label className="block text-sm">Expires</label>
            <input
              value={newExpires}
              onChange={(e) => setNewExpires(e.target.value)}
              className="mt-1 w-full border rounded p-2 text-sm"
              placeholder="26-09-25"
            />
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default Domain;
