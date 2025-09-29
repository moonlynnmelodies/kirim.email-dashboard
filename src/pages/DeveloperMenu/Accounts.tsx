import { Link } from "react-router-dom";
import { useState } from "react";
import Popup from "../../components/Popup";
import DropdownSearch from "../../components/DropdownSearch";
import { sampleData } from "../../data/sampleData";

const Accounts: React.FC = () => {
  // dropdown filter
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);

  // account list
  const [accountList, setAccountList] = useState(
    sampleData.flatMap((org) =>
      org.domains.flatMap((d) =>
        d.authentications.map((auth) => ({
          id: d.id,
          user: d.mailbox,
          domain: d.domain,
          organization: org.organization,
          role: auth.role,
          orgStatus: org.orgStatus,
          securityStatus: auth.securityStatus,
        }))
      )
    )
  );

  // search
  const [searchTerm, setSearchTerm] = useState("");
  const filteredAccounts = accountList
    .filter((d) => !selectedOrg || d.organization === selectedOrg)
    .filter((d) => {
      const term = searchTerm.toLowerCase();
      return (
        d.user.toLowerCase().includes(term) ||
        d.domain.toLowerCase().includes(term) ||
        d.organization.toLowerCase().includes(term) ||
        d.role.toLowerCase().includes(term) ||
        d.orgStatus.toLowerCase().includes(term) ||
        d.securityStatus.toLowerCase().includes(term)
      );
    });

  // pagination
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = filteredAccounts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredAccounts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // popup form state
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    user: "",
    domain: "",
    organization: "",
    role: "client",
    orgStatus: "",
    securityStatus: "Enabled",
  });

  const handleAddAccount = () => {
    if (!formData.user.trim()) return;

    const newAccount = {
      id: Date.now().toString(),
      user: formData.user,
      domain: formData.domain,
      organization: selectedOrg || "Unknown Org",
      role: formData.role,
      orgStatus: formData.orgStatus,
      securityStatus: formData.securityStatus,
    };

    setAccountList((prev) => [...prev, newAccount]);
    setFormData({
      user: "",
      domain: "",
      organization: "",
      role: "client",
      orgStatus: "",
      securityStatus: "Enabled",
    });
    setIsOpen(false);
  };

  return (
    <div>
      {/* Top Search */}
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

      {/* Dropdown */}
      <p className="mt-6 text-gray-500 text-sm">Select Organization</p>
      <div className="mt-1 bg-white rounded-md flex justify-start items-center h-10 shadow-sm">
        <DropdownSearch
          options={sampleData.map((b) => b.organization)}
          placeholder="Please choose an organization"
          onSelect={(value) => setSelectedOrg(value)}
        />
      </div>

      {/* Accounts Table */}
      <div className="mt-7 bg-white p-4 rounded-md shadow-sm">
        <table className="table-auto w-full border-separate border-spacing-y-2 px-4">
          <thead>
            <tr>
              <td colSpan={7}>
                <h1 className="text-2xl font-bold mb-5">Accounts</h1>
                <div className="flex justify-between mb-6">
                  <p className="text-gray-600 text-sm">
                    Manage user account data.
                  </p>
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
              <th>User</th>
              <th>Domain</th>
              <th>Organization</th>
              <th>Role</th>
              <th>Status</th>
              <th>2FA Status</th>
              <th>Action</th>
            </tr>
            <tr>
              <td colSpan={7}>
                <hr className="h-0.5 border-0 bg-neutral-200 mt-3" />
              </td>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{d.user}</td>
                  <td>{d.domain}</td>
                  <td>{d.organization}</td>
                  <td>{d.role}</td>
                  <td>{d.orgStatus}</td>
                  <td>{d.securityStatus}</td>
                  <td className="py-2">
                    <div className="flex gap-2">
                      {/* Edit / Delete / 2FA buttons */}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-3 text-center text-gray-500">
                  No accounts found
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

      {/* Popup Add Account */}
      <Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add New Account"
        footer={
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 rounded border text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleAddAccount}
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
            placeholder="User (Mailbox)"
            value={formData.user}
            onChange={(e) => setFormData({ ...formData, user: e.target.value })}
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
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="border rounded p-2 text-sm"
          >
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>
          <select
            value={formData.securityStatus}
            onChange={(e) =>
              setFormData({ ...formData, securityStatus: e.target.value })
            }
            className="border rounded p-2 text-sm"
          >
            <option>Enabled</option>
            <option>Disabled</option>
          </select>
          <input
            type="text"
            placeholder="Org Status"
            value={formData.orgStatus}
            onChange={(e) => setFormData({ ...formData, orgStatus: e.target.value })}
            className="border rounded p-2 text-sm"
          />
        </div>
      </Popup>
    </div>
  );
};

export default Accounts;
