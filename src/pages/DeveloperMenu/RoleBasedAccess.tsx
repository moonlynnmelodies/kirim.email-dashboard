import { Link } from "react-router-dom";
import { useState } from "react";
import Popup from "../../components/Popup";
import Button from "../../components/Button";
import DropdownSearch from "../../components/DropdownSearch";
import { roleData } from "../../data/roleData";

const RoleBasedAccess: React.FC = () => {

  // dropdown filter
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  // List menggunakan roleData
  const [roleList, setRoleList] = useState(
    roleData.map((role) => ({
      id: role.role_id.toString(),
      role_name: role.role_name,
      description: role.description,
      createdAt: role.created_at,
      updatedAt: role.updated_at,
    }))
  );

  //////////////Search Function///////////////
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRoles = roleList
    .filter((r) => !selectedRole || r.role_name === selectedRole)
    .filter((r) => {
      const term = searchTerm.toLowerCase();
      return (
        r.role_name.toLowerCase().includes(term) ||
        r.description.toLowerCase().includes(term) ||
        r.createdAt.toLowerCase().includes(term) ||
        r.updatedAt.toLowerCase().includes(term)
      );
    });
  //////////////Search Function///////////////

  // pagination
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = filteredRoles.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredRoles.slice(startIndex, startIndex + itemsPerPage);

  // popup form state
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    role_name: "",
    description: "",
    createdAt: "",
    updatedAt: "",
  });

  const handleAddRole = () => {
    if (!formData.role_name.trim()) return;

    const newRole = {
      id: Date.now().toString(),
      role_name: formData.role_name,
      description: formData.description,
      createdAt: formData.createdAt,
      updatedAt: formData.updatedAt,
    };

    setRoleList((prev) => [...prev, newRole]);
    setFormData({
      role_name: "",
      description: "",
      createdAt: "",
      updatedAt: "",
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
      <p className="mt-6 text-gray-500 text-sm">Select Role</p>
      <div className="mt-1 bg-white rounded-md flex justify-start items-center h-10 shadow-sm">
        <DropdownSearch
          options={roleData.map((r) => r.role_name)}
          placeholder="Please choose a role"
          onSelect={(value) => setSelectedRole(value)}
        />
      </div>

      {/* Roles Table */}
      <div className="mt-7 bg-white p-4 rounded-md shadow-sm">
        <table className="table-auto w-full border-separate border-spacing-y-2 px-4">
          <thead>
            <tr>
              <td colSpan={5}>
                <h1 className="text-2xl font-bold mb-5">Role Access</h1>
                <div className="flex justify-between mb-6">
                  <p className="text-gray-600 text-sm">Manage role-based access.</p>
                  <Button size="sm" variant="primary" onClick={() => setIsOpen(true)}>
                    Add New
                  </Button>
                </div>
              </td>
            </tr>

            <tr className="text-left capitalize">
              <th>Role Name</th>
              <th>Description</th>
              {/* <th>Created At</th>
              <th>Updated At</th> */}
              <th>Action</th>
            </tr>

            <tr>
              <td colSpan={5}>
                <hr className="h-0.5 border-0 bg-neutral-200 mt-3" />
              </td>
            </tr>
          </thead>

          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((r) => (
                <tr key={r.id} className=" hover:bg-gray-50">
                  <td className="px-4 py-2">{r.role_name}</td>
                  <td>{r.description}</td>
                  {/* <td>{r.createdAt}</td>
                  <td>{r.updatedAt}</td> */}
                  <td className="py-2">
                    <div className="flex gap-2">
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
                <td colSpan={5} className="py-3 text-center text-gray-500">
                  No roles found
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

      {/* Popup Add Role */}
      <Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add New Role"
        footer={
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" variant="primary" onClick={handleAddRole}>
              Save
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Role Name"
            value={formData.role_name}
            onChange={(e) => setFormData({ ...formData, role_name: e.target.value })}
            className="border rounded p-2 text-sm"
          />
          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="border rounded p-2 text-sm"
          />
        </div>
      </Popup>
    </div>
  );
};

export default RoleBasedAccess;
