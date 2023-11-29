import * as Dialog from "@radix-ui/react-dialog";
import {Mail} from "react-feather";
import useAuth from "../../../hooks/useAuth";
import useRequest from "../../../hooks/useRequest";

const DonateToggle = ({id}) => {
  const {user} = useAuth();
  const {UpdateStatusInProgress, updateRequestDonorFn} = useRequest();

  const handleUpdateRequestDonor = async () => {
    const donorInfo = {
      donorName: user?.displayName,
      donorMail: user?.email,
    };
    await updateRequestDonorFn({id, donorInfo});
    await UpdateStatusInProgress(id);
  };

  return (
    <Dialog.Root className="fixed inset-0 z-10 overflow-y-auto ">
      <div className="text-center">
        <Dialog.Trigger className="btn px-4 py-2 mt-5 ">
          <span>Donate</span>
        </Dialog.Trigger>
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 w-full h-full bg-black opacity-40" />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
          <div
            className="bg-white rounded-lg
          
          shadow-lg px-4 py-6"
          >
            <div className="flex items-center justify-end">
              <Dialog.Close className="p-2 text-primary rounded-md hover:bg-red-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Dialog.Close>
            </div>
            <div className="max-w-sm mx-auto space-y-3 text-center ">
              <Dialog.Title className="text-lg font-medium text-gray-800 ">
                Be a Lifesaver Today
              </Dialog.Title>

              <Dialog.Description className=" text-sm text-gray-600">
                Donate Blood and Make a Difference in Someone&#39;s Life.
              </Dialog.Description>
              <fieldset className="Fieldset relative">
                <Mail className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                <input
                  className="cursor-not-allowed w-full pl-12 pr-3 py-2 text-gray-500 bg-gray-200 outline-none shadow-sm rounded-lg"
                  value={user?.displayName}
                  readOnly
                  disabled
                />
              </fieldset>
              <fieldset className="Fieldset relative">
                <Mail className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                <input
                  className="cursor-not-allowed w-full pl-12 pr-3 py-2 text-gray-500 bg-gray-200 outline-none shadow-sm rounded-lg"
                  value={user?.email}
                  readOnly
                  disabled
                />
              </fieldset>
              <Dialog.Close asChild>
                <button
                  onClick={handleUpdateRequestDonor}
                  className="w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white btn"
                >
                  <span>Give the Gift of Life</span>
                </button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DonateToggle;
