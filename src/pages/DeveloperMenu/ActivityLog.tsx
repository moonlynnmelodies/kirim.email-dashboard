import { useState } from "react";
import DropdownSearch from "../../components/DropdownSearch";
import Popup from "../../components/Popup";
import { sampleData } from "../../data/sampleData";

const ActivityLog: React.FC = () => {

  // flatten all activity logs
  const [activityList, setActivityList] = useState(
    sampleData.flatMap(org =>
      org.domains.flatMap(d =>
        d.authentications.flatMap(auth =>
          auth.activityLogs?.map(log => ({
            id: log.id,
            user: log.user,
            organization: org.organization,
            activity: log.activity,
            timestamp: log.timestamp,
          })) || []
        )
      )
    )
  );

  // dropdown filter
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);

  // search
  const [searchTerm, setSearchTerm] = useState("");
  const filteredActivities = activityList
    .filter(a => !selectedOrg || a.organization === selectedOrg)
    .filter(a => {
      const term = searchTerm.toLowerCase();
      return (
        a.user.toLowerCase().includes(term) ||
        a.activity.toLowerCase().includes(term) ||
        a.timestamp.toLowerCase().includes(term) ||
        a.organization.toLowerCase().includes(term)
      );
    });

  // pagination
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = filteredActivities.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredActivities.slice(startIndex, startIndex + itemsPerPage);

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

      {/* Activity Table */}
      <div className="mt-7 bg-white p-4 rounded-md shadow-sm">
        <table className="table-auto w-full border-separate border-spacing-y-2 px-4">
          <thead>
            <tr>
              <td colSpan={4}>
                <h1 className="text-2xl font-bold mb-5">Activity Log</h1>
                <p className="text-gray-600 text-sm">Manage activity log.</p>
              </td>
            </tr>
            <tr className="text-left capitalize">
              <th>User</th>
              <th>Organization</th>
              <th>Activity</th>
              <th>Timestamp</th>
            </tr>
            <tr>
              <td colSpan={4}>
                <hr className="h-0.5 border-0 bg-neutral-200 mt-3" />
              </td>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{a.user}</td>
                  <td>{a.organization}</td>
                  <td>{a.activity}</td>
                  <td>{a.timestamp}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-3 text-center text-gray-500">
                  No activities found
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
    </div>
  );
};

export default ActivityLog;
