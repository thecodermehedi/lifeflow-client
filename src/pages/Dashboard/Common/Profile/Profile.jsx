import {useForm} from "react-hook-form";
import {User} from "react-feather";
import {Mail} from "react-feather";
import toast from "react-hot-toast";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import SelectDistrict from "../../../../components/Shared/SelectField/SelectDistrict";
import SelectUpazila from "../../../../components/Shared/SelectField/SelectUpazila";
import {useEffect} from "react";
import {useState} from "react";
import SelectBloodGroup from "../../../../components/Shared/SelectField/SelectBloodGroup";
import {UploadCloud} from "react-feather";
import useUser from "../../../../hooks/useUser";
import {uploadPhoto} from "../../../../api/utils";
import {updateUserToDB} from "../../../../api/users";
import Spinner from "../../../../components/Spinner";

const Profile = () => {
  const {user, updateUserProfile, isUserLoading} = useAuth();
  const {currentUser, isCurrentUserLoading} = useUser();

  const userMail = user?.email;

  // Query client
  const queryClient = useQueryClient();

  // Form handling
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: {isDirty},
  } = useForm();

  // update User Profile To Mondodb
  const {mutateAsync: updateUserToDBFn} = useMutation({
    mutationFn: async ({userMail, newInfo}) =>
      await updateUserToDB(userMail, newInfo),
    onSuccess: (userMail) => {
      queryClient.invalidateQueries("user", userMail);
      toast.success("Profile Updated Successfully");
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      toast.error("Something went wrong");
    },
  });

  // Photo states
  const [fileName, setFileName] = useState("");
  const photoFile = watch("photo");
  useEffect(() => {
    if (photoFile && photoFile[0]) {
      setFileName(photoFile[0].name);
    }
  }, [photoFile]);

  const handleUserUpdate = async (data) => {
    // Show loading toast
    const toastLoading = toast.loading("Updating...");

    // Destructure form data
    const {name, district, upazila, bloodGroup} = data;
    const photo = photoFile[0];

    try {
      // Initialize newInfo with unchanged data
      const newInfo = {
        name: user?.displayName,
        avatar: user?.photoURL,
        district: currentUser?.district,
        upazila: currentUser?.upazila,
        bloodGroup: currentUser?.bloodGroup,
      };

      let shouldUpdateDB = false;

      // Check if name or photo has changed
      if (name !== user.displayName || photo) {
        const profileUpdates = {};
        if (name !== user.displayName) {
          profileUpdates.displayName = name;
          newInfo.name = name;
        }
        if (photo) {
          const photoData = await uploadPhoto(photo);
          profileUpdates.photoURL = photoData?.data?.display_url;
          newInfo.avatar = photoData?.data?.display_url;
        }
        console.log(profileUpdates);
        await updateUserProfile(
          profileUpdates.displayName,
          profileUpdates.photoURL
        );
        shouldUpdateDB = true;
      }

      // Check if district, upazila, or bloodGroup has changed
      if (
        district !== currentUser.district ||
        upazila !== currentUser.upazila ||
        bloodGroup !== currentUser.bloodGroup
      ) {
        newInfo.district = district;
        newInfo.upazila = upazila;
        newInfo.bloodGroup = bloodGroup;
        shouldUpdateDB = true;
      }

      if (shouldUpdateDB) {
        // Update user to database
        const dbResponse = await updateUserToDBFn({userMail, newInfo});
        console.log("Database update response: ", dbResponse);
      }

      toast.dismiss(toastLoading);
    } catch (error) {
      console.log(error);
      toast.dismiss(toastLoading);
      toast.error(error.message);
    }
  };

  if (isUserLoading || isCurrentUserLoading) {
    return <Spinner />;
  }

  return (
    <div className="rounded-lg bg-white lg:col-span-3 w-full">
      <div className="flex flex-col items-center justify-center">
        <img
          className="rounded-full w-28 h-28 "
          src={user?.photoURL}
          alt="Photo"
        />
        <h1 className="mt-5 capitalize border px-4 py-1 rounded-lg bg-red-100 text-primary">{currentUser?.role}</h1>
      </div>
      <form
        onSubmit={handleSubmit(handleUserUpdate)}
        className="space-y-4 my-8"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block py-2 text-gray-900 ">
              Name
            </label>
            <div className="relative">
              <User className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto " />
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={user?.displayName}
                {...register("name")}
                className="w-full pl-12 pr-3 py-2 text-gray-900 placeholder:text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg bg-gray-50"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block py-2 text-gray-900 ">
              Email
            </label>
            <div className="relative">
              <Mail className="w-6 h-6 text-gray-300 absolute left-3 inset-y-0 my-auto " />
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={userMail}
                className="w-full pl-12 pr-3 py-2 text-gray-500 bg-base  outline-none shadow-sm rounded-lg"
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-gray-900 ">Update District</label>
            <SelectDistrict
              control={control}
              defaultValue={currentUser?.district}
            />
          </div>
          <div>
            <label className="text-gray-900 ">Update Upazila</label>
            <SelectUpazila
              control={control}
              defaultValue={currentUser?.upazila}
            />
          </div>
        </div>
        <div>
          <label htmlFor="blood-group">Blood Group</label>
          <SelectBloodGroup
            control={control}
            defaultValue={currentUser?.bloodGroup}
          />
        </div>

        <div className="w-full">
          <input
            type="file"
            id="photo"
            name="photo"
            {...register("photo")}
            className="hidden"
          />
          <label
            htmlFor="photo"
            className="group w-full border-2 border-dashed border-gray-400 rounded-lg p-8 flex flex-col justify-center items-center cursor-pointer btn-hover"
          >
            <span>
              {fileName ? (
                <div className="text-foreground font-bold">
                  Selected file:{" "}
                  <span className="text-primary">{fileName}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-gray-700 group-hover:text-foreground font-bold">
                  <UploadCloud /> Click to select a new profile picture
                </div>
              )}
            </span>
          </label>
        </div>
        <div className="mt-4 w-full relative">
          <button
            type="submit"
            className="inline-block w-full py-4 font-medium text-white btn disabled:bg-foreground disabled:cursor-not-allowed disabled:text-gray-600"
            disabled={!isDirty}
          >
            <span>Update Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
