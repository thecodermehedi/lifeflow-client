import {useForm} from "react-hook-form";
import {User} from "react-feather";
import SelectDistrict from "../../../components/Shared/SelectField/SelectDistrict";
import SelectUpazila from "../../../components/Shared/SelectField/SelectUpazila";
import useAuth from "../../../hooks/useAuth";
import {Mail} from "react-feather";
import {MapPin} from "react-feather";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import {saveRequest} from "../../../api/requests";
import {useMutation, useQueryClient} from "@tanstack/react-query";
const CreateRequest = () => {
  const queryClient = useQueryClient();

  // Form handling
  const {register, handleSubmit, reset, control} = useForm();

  // Current user
  const {user} = useAuth();

  // Add new request
  const {mutateAsync} = useMutation({
    mutationFn: saveRequest,
    onSuccess: () => {
      queryClient.invalidateQueries("requests");
      toast.success("Request created successfully");
    },
  });

  // Handle request submit
  const handleReqCreate = async (data) => {
    // Show loading toast
    const toastLoading = toast.loading("Creating request...");

    // Destructure form data
    const {name, hospital, district, upazila, address, message} = data;
    const date = dayjs().format("DD-MM-YYYY");
    const time = dayjs().format("h:mm A");
    const dateTime = dayjs();
    try {
      // Save req to database
      const newRequest = {
        name: user?.displayName,
        email: user?.email,
        recipent: name,
        hospital,
        district,
        upazila,
        address,
        message,
        date,
        time,
        dateTime,
        status: "pending",
      };
      await mutateAsync(newRequest);
      toast.success("Request created successfully", {id: toastLoading});
      // Reset form
      reset();
    } catch (error) {
      console.log(error);
      toast.error(error.message, {id: toastLoading});
    }
  };
  return (
    <div className="rounded-lg bg-white lg:col-span-3 w-full">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-900 text-center">
        Create Blood Donation Request
      </h1>
      <form onSubmit={handleSubmit(handleReqCreate)} className="space-y-4 my-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <div className="relative">
              <User className="w-6 h-6 text-gray-300 absolute left-3 inset-y-0 my-auto " />
              <input
                type="text"
                id="username"
                defaultValue={user?.displayName}
                className="w-full pl-12 pr-3 py-2 text-gray-300  bg-base outline-none shadow-sm rounded-lg"
                readOnly
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <Mail className="w-6 h-6 text-gray-300 absolute left-3 inset-y-0 my-auto " />
              <input
                type="email"
                id="usermail"
                defaultValue={user?.email}
                className="w-full pl-12 pr-3 py-2 text-gray-300 bg-base  outline-none shadow-sm rounded-lg"
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="username" className="block py-2 text-gray-900 ">
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
                name="name"
                {...register("name", {required: true})}
                placeholder="Mehedi Hasan"
                className="w-full pl-12 pr-3 py-2 text-gray-900 placeholder:text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg bg-gray-50"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="usermail" className="block py-2 text-gray-900 ">
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
                {...register("hospital", {required: true})}
                placeholder="Dhaka Medical College Hospital"
                className="w-full pl-12 pr-3 py-2 text-gray-900 placeholder:text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg bg-gray-50"
                required
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-gray-900 ">Recipient District</label>
            <SelectDistrict control={control} />
          </div>
          <div>
            <label className="text-gray-900 ">Recipient Upazila</label>
            <SelectUpazila control={control} />
          </div>
        </div>

        <div>
          <div className="relative">
            <MapPin className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto " />
            <input
              name="address"
              {...register("address", {required: true})}
              placeholder="Enter Full Address"
              className="w-full pl-12 pr-3 py-2 text-gray-700 placeholder:text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg bg-gray-50"
              required
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
            {...register("message", {required: true})}
            className="block p-2.5 w-full  text-gray-700 placeholder:text-gray-500 bg-gray-50 rounded-lg border focus:outline-none focus:border-primary resize-none"
            placeholder="Write why you need blood ..."
            required
          />
        </div>

        <div className="mt-4 w-full relative">
          <button
            type="submit"
            className="inline-block w-full py-4 font-medium text-white btn"
          >
            <span>Create Request</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRequest;
