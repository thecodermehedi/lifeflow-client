import useRequest from "../../hooks/useRequest";
import Spinner from "../../components/Spinner";
import {Link} from "react-router-dom";
import {useState} from "react";
const DonationRequest = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const {allPendingPequests, isAllPendingRequestsLoading} = useRequest();

  if (isAllPendingRequestsLoading) {
    return <Spinner />;
  }

  const numPages = Math.ceil(allPendingPequests.length / 6);

  return (
    <section>
      <div className="text-xl md:text-3xl pb-5 text-center font-semibold">
        <h1>Our Pending Requests</h1>
      </div>

      {allPendingPequests?.length > 0 ? (
        <div className="mt-5 shadow-sm border rounded-lg overflow-x-auto mx-8 lg:mx-36 my-10">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Requester/Location</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Time</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {allPendingPequests
                .slice(currentPage * 6, (currentPage + 1) * 6)
                .map((request, idx) => (
                  <tr key={idx}>
                    <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                      <div>
                        <span className="block text-gray-700 text-sm font-medium">
                          {request.name}
                        </span>
                        <span className="block text-gray-700 text-sm font-medium">
                        {request.upazila}, {request.district}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {request.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {request.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {request.date}
                    </td>

                    <td className="text-right px-6 whitespace-nowrap">
                      <Link
                        to={`/request/${request._id}/details`}
                        className="py-2 px-3 font-medium text-green-600 hover:text-black bg-green-100 duration-150 hover:bg-green-100 border border-transparent hover:border-black rounded-lg mr-2"
                      >
                        View
                      </Link>
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
        <div className="flex items-center justify-center my-48">
          <div className="text-center ">
            <h1 className="text-2xl font-semibold text-gray-700">
              No Request Found
            </h1>
            <Link
              to="mailto:thecodermehedi@gmail.com"
              className="mt-3 inline-block px-6 py-2 text-sm font-medium leading-6 text-center btn"
            >
              <span>Report Problem</span>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default DonationRequest;
