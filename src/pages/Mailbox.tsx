import { Link } from 'react-router-dom'; 
import { useState } from 'react';
import MailboxDetail from './MailboxDetail';


const Mailbox: React.FC = () => {
    // pagination state
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const totalItems = 42; // example total
    const totalPages = Math.ceil(totalItems / itemsPerPage);


    return (
      <div>
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
            className="max-w-sm w-full  rounded-lg p-2 text-sm focus:outline-none focus:ring-0 "
          />  

          <div className="ml-auto mr-4">
              <img
                src="/src/assets/images/profile.png"
                className="h-9 w-9 rounded-full object-cover cursor-pointer"
                alt="Profile"
              />
            </div>
        </div>


        <div className="mt-7 bg-white p-4 rounded-md shadow-sm">
        <table className="table-auto w-full border-separate border-spacing-y-2 px-4">
          <thead>
            <tr>
              <td colSpan={6}>
                <h1 className="text-2xl font-bold mb-5">Mailbox</h1>
                  <div className="flex justify-between mb-6">
                    <p className="text-gray-600 text-sm">Manage mailboxes.</p>
                    <button className="px-3 py-2 text-xs font-medium text-white bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 hover:shadow-lg transition cursor-pointer">
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
            <tr className="hover:bg-gray-50 ">
            <td className="py-2 ">
              <div className="flex items-center gap-2">
                <span>mycompany.com</span>
                <Link to="/mailbox/1" >
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

              <td className="py-2">10/20</td>
              <td className="py-2">20 GB</td>
              <td className="py-2">12 GB</td>
              <td className="py-2">Active</td>
            </tr>

              <tr>
                <td colSpan={4} className="py-3 text-center text-gray-500">
                  No domains found
                </td>
              </tr>


              {/* Pagination */}
              <div className="flex justify-end items-center mt-4 gap-4 text-sm w-full">
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
                    Page {currentPage} of {totalPages}
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
          </tbody>
        </table>
      </div>
      </div>



    );
  };
  
  export default Mailbox;