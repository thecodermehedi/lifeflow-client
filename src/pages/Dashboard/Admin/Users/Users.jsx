import useAuth from "../../../../hooks/useAuth";
import useUser from "../../../../hooks/useUser";
import {useState} from "react";
import Spinner from "../../../../components/Spinner";
const Users = () => {
  const {isUserLoading} = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    users,
    isUsersLoading,
    UpdateStatusBlocked,
    UpdateStatusActive,
    updateUserRoleFn,
  } = useUser();

  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filteredUsers = users?.filter((request) => {
    if (selectedStatus === "") {
      return true;
    }
    return request.status === selectedStatus;
  });
  if (isUserLoading || isUsersLoading) {
    return <Spinner />;
  }

  const numPages = Math.ceil(filteredUsers.length / 6);

  const statusColors = {
    active: "text-green-600 bg-green-50",
    blocked: "text-red-600 bg-red-50",
  };

  return (
    <section className="w-full">
      <div className="text-xl md:text-3xl pb-5 text-center font-semibold">
        <h1>Manage Your Users</h1>
      </div>
      <div className="w-fit">
        <label
          htmlFor="usersStatus"
          className="block text-sm font-medium text-gray-900"
        >
          Select User Status
        </label>

        <select
          name="usersStatus"
          id="usersStatus"
          value={selectedStatus}
          onChange={handleStatusChange}
          className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm py-1 border-2 focus:outline-none"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>
      {filteredUsers?.length > 0 ? (
        <div className="mt-5 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6 text-left">User</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Role</th>
                <th className="py-3 px-6 text-center">Block</th>
                <th className="py-3 px-6 text-center">Make Volunteer</th>
                <th className="py-3 px-6 text-center">Make Admin</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {filteredUsers
                .slice(currentPage * 6, (currentPage + 1) * 6)
                .map((user, idx) => (
                  <tr key={idx}>
                    <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                      <img
                        src={user.avatar}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <span className="block text-gray-700 text-sm font-medium">
                          {user.name}
                        </span>
                        <span className="block text-gray-700 text-xs">
                          {user.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-2 rounded-full font-semibold text-xs capitalize ${
                          statusColors[user.status]
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.status === "active" ? (
                        <button
                          onClick={() => UpdateStatusBlocked(user?._id)}
                          className="bg-red-200 text-primary font-semibold hover:bg-red-600 hover:text-foreground transition duration-150 px-3 py-2 rounded-lg capitalize"
                        >
                          block
                        </button>
                      ) : (
                        <button
                          onClick={() => UpdateStatusActive(user?._id)}
                          className="bg-green-200 text-green-800 font-semibold hover:bg-green-600 hover:text-foreground transition duration-150 px-3 py-2 rounded-lg capitalize"
                        >
                          unblock
                        </button>
                      )}
                    </td>
                    <td className="text-right px-6 whitespace-nowrap">
                      {(user.role === "donor" || user.role === "admin") && (
                        <button
                          className="px-3 py-2 rounded-lg bg-orange-200 text-orange-800 font-semibold  hover:bg-orange-600  hover:text-black"
                          onClick={() =>
                            updateUserRoleFn({id: user._id, role: "volunteer"})
                          }
                        >
                          Make Volunteer
                        </button>
                      )}
                    </td>
                    <td className="text-right px-6 whitespace-nowrap">
                    {(user.role === "donor" || user.role === "volunteer") && (
                        <button
                          className="px-3 py-2 rounded-lg bg-blue-200 text-blue-800 font-semibold  hover:bg-blue-600  hover:text-black"
                          onClick={() =>
                            updateUserRoleFn({id: user._id, role: "admin"})
                          }
                        >
                          Make Admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="mt-8 pb-3 flex justify-center items-center gap-4">
            <button
              className="px-3 border py-2 rounded-lg bg-primary disabled:bg-foreground disabled:cursor-not-allowed disabled:text-opacity-50 text-white"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <button
              className="px-3 border py-2 rounded-lg bg-primary disabled:bg-foreground disabled:cursor-not-allowed disabled:text-opacity-50 text-white"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === numPages - 1}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center mt-48">
          <div className="text-center ">
            <h1 className="text-2xl font-semibold text-gray-700">
              No Users Found
            </h1>
            <p className="text-gray-500">You have not created any user yet.</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Users;
