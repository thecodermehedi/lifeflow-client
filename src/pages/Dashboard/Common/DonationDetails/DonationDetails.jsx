import {useParams} from "react-router-dom";
import useRequest from "../../../../hooks/useRequest";
import {useState} from "react";
import {useEffect} from "react";
import Spinner from "../../../../components/Spinner";
import DonateToggle from "../../../DonationRequest/DonateToggle/DonateToggle";

const DonationDetails = () => {
  const {id} = useParams();
  const {allrequests, isAllRequestsLoading} = useRequest();
  const [request, setRequest] = useState();
  useEffect(() => {
    if (allrequests?.length > 0) {
      const req = allrequests?.find((req) => req?._id === id);
      setRequest(req);
    }
  }, [id, allrequests]);

  if (isAllRequestsLoading) {
    return <Spinner />;
  }
  return (
    <section className="w-fit mx-auto mb-10">
      <div className="text-center font-bold mb-10 text-3xl">
        <h1>Blood Donation Details</h1>
      </div>
      <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm w-full">
        <dl className="-my-3 divide-y divide-gray-100 text-sm">
          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Requester Name</dt>
            <dd className="text-gray-700 sm:col-span-2">{request?.name}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Requester Email</dt>
            <dd className="text-gray-700 sm:col-span-2">{request?.email}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Recipient</dt>
            <dd className="text-gray-700 sm:col-span-2">{request?.recipent}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Time</dt>
            <dd className="text-gray-700 sm:col-span-2">{request?.time}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Date</dt>
            <dd className="text-gray-700 sm:col-span-2">{request?.date}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">District</dt>
            <dd className="text-gray-700 sm:col-span-2">{request?.district}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Upazila</dt>
            <dd className="text-gray-700 sm:col-span-2">{request?.upazila}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Hospital</dt>
            <dd className="text-gray-700 sm:col-span-2">{request?.hospital}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Full Address</dt>
            <dd className="text-gray-700 sm:col-span-2">{request?.address}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Message</dt>
            <dd className="text-gray-700 sm:col-span-2">{request?.message}</dd>
          </div>
        </dl>
      </div>
      <DonateToggle id={id} />
    </section>
  );
};

export default DonationDetails;
