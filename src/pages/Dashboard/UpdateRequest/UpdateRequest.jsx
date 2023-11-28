import {useForm} from "react-hook-form";
import SelectDistrict from "../../../components/Shared/SelectField/SelectDistrict";
import SelectUpazila from "../../../components/Shared/SelectField/SelectUpazila";
import {MapPin} from "react-feather";
import toast from "react-hot-toast";
import useRequest from "../../../hooks/useRequest";
import {useState} from "react";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import Spinner from "../../../components/Spinner";
import dayjs from "dayjs";
const UpdateRequest = () => {
  const {id} = useParams();
  const {requests, isRequestsLoading, UpdateRequestFn} = useRequest();
  const [request, setRequest] = useState();
  useEffect(() => {
    if (requests?.length > 0) {
      const req = requests?.find((req) => req?._id === id);
      setRequest(req);
    }
  }, [id, requests]);

  // Form handling
  const {
    register,
    handleSubmit,
    control,
    formState: {isDirty},
  } = useForm();

  // Handle request submit
  const handleReqUpdate = async (data) => {
    // Show loading toast
    const toastLoading = toast.loading("Updating request...");

    const date = dayjs().format("DD-MM-YYYY");
    const time = dayjs().format("h:mm A");
    const dateTime = dayjs();

    const newRequestInfo = {
      ...request,
      ...data,
      date,
      time,
      dateTime,
    };

    try {
      await UpdateRequestFn({id, newRequestInfo});
      toast.dismiss(toastLoading);
    } catch (error) {
      console.log(error);
      toast.error(error.message, {id: toastLoading});
    }
  };

  if (isRequestsLoading || !request) {
    return <Spinner />;
  }

  return (
    <div className="rounded-lg bg-white lg:col-span-3 w-full">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-900 text-center">
        Update Blood Donation Request
      </h1>
      <form onSubmit={handleSubmit(handleReqUpdate)} className="space-y-4 my-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="recipent" className="block py-2 text-gray-900 ">
              Recipient Name
            </label>
            <div className="relative">
              <svg
                className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto "
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M8 6c0-2.21 1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4s-4-1.79-4-4m9 16h1c1.1 0 2-.9 2-2v-4.78c0-1.12-.61-2.15-1.61-2.66c-.43-.22-.89-.43-1.39-.62zm-4.66-5L15 11.33c-.93-.21-1.93-.33-3-.33c-2.53 0-4.71.7-6.39 1.56A2.97 2.97 0 0 0 4 15.22V22h2.34c-.22-.45-.34-.96-.34-1.5C6 18.57 7.57 17 9.5 17zM10 22l1.41-3H9.5c-.83 0-1.5.67-1.5 1.5S8.67 22 9.5 22z"
                />
              </svg>
              <input
                type="text"
                name="recipent"
                {...register("recipent")}
                defaultValue={request?.recipent}
                className="w-full pl-12 pr-3 py-2 text-gray-900 placeholder:text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg bg-gray-50"
              />
            </div>
          </div>
          <div>
            <label htmlFor="hospital" className="block py-2 text-gray-900 ">
              Hospital Name
            </label>
            <div className="relative">
              <svg
                className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto "
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
              >
                <path
                  fill="currentColor"
                  d="M21 10h-4V6h-2v4h-4v2h4v4h2v-4h4z"
                />
                <path
                  fill="currentColor"
                  d="M28 10h-2V4a2.002 2.002 0 0 0-2-2H8a2.002 2.002 0 0 0-2 2v6H4a2.002 2.002 0 0 0-2 2v18h28V12a2.002 2.002 0 0 0-2-2M14 28v-6h4v6Zm6 0v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7H4V12h4V4h16v8h4v16Z"
                />
              </svg>
              <input
                type="text"
                name="hospital"
                {...register("hospital")}
                defaultValue={request?.hospital}
                className="w-full pl-12 pr-3 py-2 text-gray-900 placeholder:text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg bg-gray-50"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-gray-900 ">Update District</label>
            <SelectDistrict
              control={control}
              defaultValue={request?.district}
            />
          </div>
          <div>
            <label className="text-gray-900 ">Update Upazila</label>
            <SelectUpazila control={control} defaultValue={request?.upazila} />
          </div>
        </div>

        <div>
          <div className="relative">
            <MapPin className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto " />
            <input
              name="address"
              {...register("address")}
              defaultValue={request?.address}
              className="w-full pl-12 pr-3 py-2 text-gray-700 placeholder:text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg bg-gray-50"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="message"
            className="block mb-2  font-medium text-gray-900"
          >
            Your message
          </label>
          <textarea
            id="message"
            rows="8"
            {...register("message")}
            className="block p-2.5 w-full  text-gray-700 placeholder:text-gray-500 bg-gray-50 rounded-lg border focus:outline-none focus:border-primary resize-none"
            defaultValue={request?.message}
          />
        </div>

        <div className="mt-4 w-full relative">
          <button
            type="submit"
            className="inline-block w-full py-4 font-medium text-white btn disabled:bg-foreground disabled:cursor-not-allowed disabled:text-gray-600"
            disabled={!isDirty}
          >
            <span>Update Request</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRequest;
