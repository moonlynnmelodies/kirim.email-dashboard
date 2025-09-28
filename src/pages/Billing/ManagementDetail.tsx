const ManagementDetail: React.FC = () => {
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
        />
        <div className="ml-auto mr-4">
          <img
            src="/src/assets/images/profile.png"
            className="h-9 w-9 rounded-full object-cover cursor-pointer"
            alt="Profile"
          />
        </div>
      </div>


      {/* /* Invoice Table */}
      <div className="mt-7 bg-white p-4 rounded-md shadow-sm">
        <table className="table-auto w-full border-separate border-spacing-y-2 px-4">
          <thead>
          <tr>
              <td colSpan={8}>
                <h1 className="text-2xl font-bold mb-5">Billing</h1>
                <div className="flex justify-between mb-6">
                  <p className="text-gray-600 text-sm">Manage billing.</p>
                  <button
                    // onClick={() => setIsOpen(true)}
                    className="px-3 py-2 text-xs font-medium text-white bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 hover:shadow-lg transition"
                  >
                    Add New
                  </button>
                </div>
              </td>
            </tr>


            <tr className="text-left capitalize">
              <th>Invoice #</th>
              <th>Package</th>
              <th>Domain</th>
              <th>Mailbox</th>
              <th>Status</th>
              <th>Next Billing</th>
              <th>Action</th>
            </tr>

            <tr>
              <td colSpan={8}>
                <hr className="h-0.5 border-0 bg-neutral-200 mt-3" />
              </td>
            </tr>
            <tbody>

            </tbody>
          </thead>
        </table>
      </div>
      </div>
    );
  };
  
  export default ManagementDetail;
  
  