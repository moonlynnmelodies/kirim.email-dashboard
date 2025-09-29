import { Link } from "react-router-dom";
import { useState } from "react";
import Popup from "../../components/Popup";
import DropdownSearch from "../../components/DropdownSearch";
import { sampleData } from "../../data/sampleData";

const Authentication: React.FC = () => {
  
  // dropdown filter
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);

    //  List 
    const [authenticationList, setAuthenticationList] = useState(
        sampleData.flatMap((org) =>
        org.domains.map((d) =>
            d.authentications.map((auth) => ({
            id: d.id,
            organization: org.organization,
            mailbox: d.mailbox,
            domain: d.domain,
            securityStatus: auth.securityStatus,
            createdAt: auth.createdAt,
            }))
        ).flat()
        )
    );

  //////////////Search Function ?///////////////
  // Tambahkan di atas component function
  const [searchTerm, setSearchTerm] = useState("");

  // Ganti filteredDomains dengan ini
  const filteredAuthentications = authenticationList
  .filter((d) => !selectedOrg || d.organization === selectedOrg)
  .filter((d) => {
    const term = searchTerm.toLowerCase();
    return (
      d.mailbox.toLowerCase().includes(term) ||
      d.domain.toLowerCase().includes(term) ||
      d.organization.toLowerCase().includes(term) ||
      d.securityStatus.toLowerCase().includes(term) ||
      d.createdAt.toLowerCase().includes(term)
    );
  });
  //////////////Search Function ?///////////////


  // pagination
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = filteredAuthentications.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredAuthentications.slice(startIndex, startIndex + itemsPerPage);

  // popup form state
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    organization: "",
    mailbox: "",
    domain: "",
    securityStatus: "",
    createdAt: "",
  });

  const handleAddAuthentication = () => {
    if (!formData.domain.trim()) return;
  
    const newAuthentication = {
      id: Date.now().toString(),
      // Take organization from selectedOrg, not formData
      organization: selectedOrg || "Unknown Org",
      mailbox: formData.mailbox,
      domain: formData.domain,
      securityStatus: formData.securityStatus,
      createdAt: formData.createdAt,
    };
  
    setAuthenticationList((prev) => [...prev, newAuthentication]);
    setFormData({
        organization: "",
        mailbox: "",
        domain: "",
        securityStatus: "",
        createdAt: "",
    });
    setIsOpen(false);
  };
  

  return (
    <div>
      {/* Top search bar */}
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
        <input
          type="text"
          placeholder="Search..."
          className="max-w-sm w-full rounded-lg p-2 text-sm focus:outline-none focus:ring-0"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        
        />
        <div className="ml-auto mr-4">
          <img
            src="/src/assets/images/profile.png"
            className="h-9 w-9 rounded-full object-cover cursor-pointer"
            alt="Profile"
          />
        </div>
      </div>

      {/* Dropdown Filter */}
      <p className="mt-6 text-gray-500 text-sm">Select Organization</p>
      <div className="mt-1 bg-white rounded-md flex justify-start items-center h-10 shadow-sm">
        <DropdownSearch
          options={sampleData.map((b) => b.organization)}
          placeholder="Please choose an organization"
          onSelect={(value) => setSelectedOrg(value)}
        />
      </div>

      {/* Authentication Table */}
      <div className="mt-7 bg-white p-4 rounded-md shadow-sm">
        <table className="table-auto w-full border-separate border-spacing-y-2 px-4">
          <thead>
            <tr>
              <td colSpan={6}>
                <h1 className="text-2xl font-bold mb-5">Authentication</h1>
                <div className="flex justify-between mb-6">
                  <p className="text-gray-600 text-sm">Manage authentication data.</p>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="cursor-pointer px-3 py-2 text-xs font-medium text-white bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 hover:shadow-lg transition"
                  >
                    Add New
                  </button>
                </div>
              </td>
            </tr>

            <tr className="text-left capitalize">
              <th>Mailbox</th>
              <th>Domain</th>
              <th>Organization</th>
              <th>2FA Status</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>

            <tr>
              <td colSpan={6}>
                <hr className="h-0.5 border-0 bg-neutral-200 mt-3" />
              </td>
            </tr>
          </thead>

          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((d) => (
                <tr key={d.id} className=" hover:bg-gray-50">
                  <td className="px-4 py-2">{d.mailbox}</td>
                  <td>{d.domain}</td>
                  <td>{d.organization}</td>
                  <td>{d.securityStatus}</td>
                  <td>{d.createdAt}</td>
                  <td className="py-2">
                    <div className="flex gap-2">
                      {/* View */}
                      <Link to={`/billing/invoice/${d.id}`}>
                        <button className="text-blue-600 p-1 rounded hover:bg-gray-200 text-sm cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </button>
                      </Link>

                      {/* Edit */}
                      <button className="p-1 rounded hover:bg-gray-200 text-green-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-5.5 cursor-pointer text-green-500 ml-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </button>

                      {/* Delete */}
                      <button className="p-1 rounded hover:bg-gray-200 text-red-500">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5.5 text-red-500 cursor-pointer ">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-3 text-center text-gray-500">
                  No domains found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-end items-center mt-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <span>entries</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages} ({totalItems} items)
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Popup Add Authentication */}
      <Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add New Authentication"
        footer={
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 rounded border text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleAddAuthentication}
              className="cursor-pointer px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        }
      >
        <div className="flex flex-col gap-3">
        <input
            type="text"
            placeholder="Mailbox"
            value={formData.mailbox}
            onChange={(e) => setFormData({ ...formData, mailbox: e.target.value })}
            className="border rounded p-2 text-sm"
          />
           <input
            type="text"
            placeholder="Domain"
            value={formData.domain}
            onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
            className="border rounded p-2 text-sm"
          />
          <input
            type="text"
            placeholder="Organization"
            value={formData.organization}
            onChange={(e) =>
                setFormData({ ...formData, organization: e.target.value })
            }
            className="border rounded p-2 text-sm"
            />
          <input
            type="text"
            placeholder="Security Status"
            value={formData.securityStatus}
            onChange={(e) => setFormData({ ...formData, securityStatus: e.target.value })}
            className="border rounded p-2 text-sm"
          />
          <select
            value={formData.securityStatus}
            onChange={(e) => setFormData({ ...formData, securityStatus: e.target.value })}
            className="border rounded p-2 text-sm"
          >
            <option>Enabled</option>
            <option>Disabled</option>
          </select>
          <input
            type="text"
            placeholder="Created At"
            value={formData.createdAt}
            onChange={(e) => setFormData({ ...formData, createdAt: e.target.value })}
            className="border rounded p-2 text-sm"
          />
        </div>
      </Popup>
    </div>
  );
};

export default Authentication;
