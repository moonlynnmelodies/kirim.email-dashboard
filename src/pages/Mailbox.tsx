import { Link } from "react-router-dom";
import { useState } from "react";
import Popup from "../components/Popup";

const Mailbox: React.FC = () => {
  const [mailboxList, setMailboxList] = useState([
    {
      id: 1,
      name: "mycompany.com",
      mailboxes: "10/20",
      quota: "20 GB",
      usage: "12 GB",
      status: "Active",
    },
    {
      id: 2,
      name: "example.com",
      mailboxes: "5/10",
      quota: "10 GB",
      usage: "4 GB",
      status: "Active",
    },
  ]);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  // form state
  const [formData, setFormData] = useState({
    name: "",
    mailboxes: "",
    quota: "",
    usage: "",
    status: "Active",
  });

  const totalItems = mailboxList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = mailboxList.slice(startIndex, startIndex + itemsPerPage);

  const handleAddMailbox = () => {
    if (!formData.name.trim()) return;

    const newMailbox = {
      id: Date.now(),
      ...formData,
    };

    setMailboxList((prev) => [...prev, newMailbox]);
    setFormData({ name: "", mailboxes: "", quota: "", usage: "", status: "Active" });
    setIsOpen(false);
  };

  return (
    <div>
      {/* Top search bar */}
      <div className="bg-white rounded-md flex justify-start items-center h-14 shadow-sm pl-4">
      <svg
            className="w-4 h-4 text-gray-500 pr-1"
            aria-hidden="true"
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
          placeholder="Search mailbox..."
          className="max-w-sm w-full rounded-lg p-2 text-sm focus:outline-none focus:ring-0"
        />
        <div className="ml-auto mr-4">
          <img
            src="/src/assets/images/profile.png"
            className="h-9 w-9 rounded-full object-cover cursor-pointer"
            alt="Profile"
          />
        </div>
      </div>

      {/* Mailbox Table */}
      <div className="mt-7 bg-white p-4 rounded-md shadow-sm">
        <table className="table-auto w-full border-separate border-spacing-y-2 px-4">
          <thead>
            <tr>
              <td colSpan={6}>
                <h1 className="text-2xl font-bold mb-5">Mailbox</h1>
                <div className="flex justify-between mb-6">
                  <p className="text-gray-600 text-sm">Manage mailboxes.</p>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="px-3 py-2 text-xs font-medium text-white bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 hover:shadow-lg transition"
                  >
                    Add New
                  </button>
                </div>
              </td>
            </tr>

            <tr className="text-left capitalize">
              <th>Domain</th>
              <th>Mailboxes</th>
              <th>Total Quota</th>
              <th>Usage</th>
              <th>Status</th>
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
              currentItems.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50">
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <span>{m.name}</span>
                      <Link to={`/mailbox/${m.id}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                          />
                        </svg>
                      </Link>
                    </div>
                  </td>
                  <td className="py-2">{m.mailboxes}</td>
                  <td className="py-2">{m.quota}</td>
                  <td className="py-2">{m.usage}</td>
                  <td className="py-2">{m.status}</td>
                  <td className="py-2">-</td>
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

      {/* Popup for Add Mailbox */}
      <Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add New Mailbox"
        footer={
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 rounded border text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleAddMailbox}
              className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        }
      >
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Domain"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border rounded p-2 text-sm"
          />
          <input
            type="text"
            placeholder="Mailboxes (e.g. 10/20)"
            value={formData.mailboxes}
            onChange={(e) => setFormData({ ...formData, mailboxes: e.target.value })}
            className="border rounded p-2 text-sm"
          />
          <input
            type="text"
            placeholder="Quota (e.g. 20 GB)"
            value={formData.quota}
            onChange={(e) => setFormData({ ...formData, quota: e.target.value })}
            className="border rounded p-2 text-sm"
          />
          <input
            type="text"
            placeholder="Usage (e.g. 12 GB)"
            value={formData.usage}
            onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
            className="border rounded p-2 text-sm"
          />
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="border rounded p-2 text-sm"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </Popup>

    </div>
  );
};

export default Mailbox;
