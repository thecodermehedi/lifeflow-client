import useAuth from "../../../../hooks/useAuth";
import useRequest from "../../../../hooks/useRequest";
import Spinner from "../../../../components/Spinner";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";
import {useState} from "react";
const Request = () => {
  const {isUserLoading} = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    allrequests,
    isAllRequestsLoading,
    UpdateStatusDone,
    UpdateStatusCanceled,
    DeleteRequestFn,
  } = useRequest();

  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filteredRequests = allrequests?.filter((request) => {
    if (selectedStatus === "") {
      return true;
    }
    return request.status === selectedStatus;
  });
  if (isUserLoading || isAllRequestsLoading) {
    return <Spinner />;
  }

  const numPages = Math.ceil(filteredRequests?.length / 6);

  const statusColors = {
    pending: "text-yellow-600 bg-yellow-50",
    inprogress: "text-blue-600 bg-blue-50",
    canceled: "text-red-600 bg-red-50",
    done: "text-green-600 bg-green-50",
  };

  const ConfirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this request",
      icon: "warning",
      iconColor: "#D30000",
      showCancelButton: true,
      confirmButtonColor: "#D30000",
      cancelButtonColor: "#black",
      confirmButtonText: "Delete",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await DeleteRequestFn(id);
      }
    });
  };

  return (
    <section className="w-full">
      <div className="text-xl md:text-3xl pb-5 text-center font-semibold">
        <h1>Manage Your Requests</h1>
      </div>
      <div className="w-fit">
        <label
          htmlFor="requestStatus"
          className="block text-sm font-medium text-gray-900"
        >
          Select Request Status
        </label>

        <select
          name="requestStatus"
          id="requestStatus"
          value={selectedStatus}
          onChange={handleStatusChange}
          className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm py-1 border-2 focus:outline-none"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="canceled">Canceled</option>
          <option value="done">Done</option>
        </select>
      </div>
      {filteredRequests?.length > 0 ? (
        <div className="mt-5 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Recipient</th>
                <th className="py-3 px-6">Time</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Donor</th>
                <th className="py-3 px-6"></th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {filteredRequests
                ?.slice(currentPage * 6, (currentPage + 1) * 6)
                .map((item, idx) => (
                  <tr key={idx}>
                    <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                      <div>
                        <span className="block text-gray-700 text-sm font-medium">
                          {item.recipent}
                        </span>
                        <span className="block text-gray-700 text-xs">
                          {item.upazila}, {item.district}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-2 rounded-full font-semibold text-xs capitalize ${
                          statusColors[item.status]
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="gap-x-3 py-3 px-6 whitespace-nowrap">
                      {item.status === "inprogress" ? (
                        <div>
                          <span className="block text-gray-700 text-sm font-medium">
                            {item.donorName}
                          </span>
                          <span className="block text-gray-700 text-xs">
                            {item.donorMail}
                          </span>
                        </div>
                      ) : (
                        <span className="block text-gray-700 text-sm font-medium">
                          N/A
                        </span>
                      )}
                    </td>

                    <td className="text-right px-6 whitespace-nowrap">
                      <Link
                        to={`/dashboard/request/${item._id}/details`}
                        className="py-2 px-3 font-medium text-green-600 hover:text-black bg-green-100 duration-150 hover:bg-green-100 border border-transparent hover:border-black rounded-lg mr-2"
                      >
                        View
                      </Link>
                      <Link
                        to={`/dashboard/request/${item._id}/edit`}
                        className="py-2 px-3 font-medium text-indigo-600 hover:text-black bg-indigo-100 duration-150 hover:bg-indigo-100 border border-transparent hover:border-black rounded-lg mr-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => ConfirmDelete(item._id)}
                        className="py-2 px-3 font-medium text-rose-600 hover:text-black bg-rose-100 duration-150 hover:bg-rose-100 border border-transparent hover:border-black rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                    {item.status === "inprogress" && (
                      <td className="text-right px-6 whitespace-nowrap">
                        <button
                          onClick={() => UpdateStatusDone(item._id)}
                          className="py-2 px-3 font-medium text-black bg-green-500 hover:bg-green-600 duration-150 rounded-lg mr-2"
                        >
                          Done
                        </button>
                        <button
                          onClick={() => UpdateStatusCanceled(item._id)}
                          className="py-2 px-3 font-medium text-black bg-red-500 hover:bg-red-600 duration-150 rounded-lg"
                        >
                          Cancel
                        </button>
                      </td>
                    )}
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
              No Request Found
            </h1>
            <p className="text-gray-500">
              You have not created any request yet.
            </p>
            <Link
              to="/dashboard/create-donation-request"
              className="mt-3 inline-block px-6 py-2 text-sm font-medium leading-6 text-center btn"
            >
              <span> Create Request</span>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Request;
