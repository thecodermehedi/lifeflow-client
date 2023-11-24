import {Link} from "react-router-dom";
import Logo from "../../components/UI/LifeFlowLogo";
import {User} from "react-feather";
import {useState} from "react";
import SelectInput from "../../components/UI/SeleteInput";
import SelectBloodGroup from "../../components/UI/SelectBloodGroup";
const Register = () => {
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [isConfirmHidden, setConfirmHidden] = useState(true);
  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="lg:col-span-2 lg:py-12 text-center lg:text-left">
            <div className="mt-8 flex flex-col items-center lg:items-start">
              <Link to={"/"}>
                <Logo />
              </Link>
              <h1 className="text-2xl md:text-3xl mt-5 font-bold">
                Register As a Blood Donor
              </h1>
              <h3 className="text-xl md:text-2xl lg:text-xl  mt-5">
                Your contribution is invaluable.{" "}
                <span className="hidden lg:block">
                  {" "}
                  By registering as a blood donor, you are taking a step towards
                  saving lives and making a difference in the world. Every drop
                  of blood can be a lifeline in an emergency. Your decision to
                  donate can be the difference between life and death for a
                  patient. Join our community of heroes today and be a part of
                  this noble cause. Together, we can make a difference.
                </span>
              </h3>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block py-2 text-gray-500">
                    Name
                  </label>
                  <div className="relative">
                    <User className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto" />
                    <input
                      type="text"
                      id="name"
                      placeholder="Mehedi Hasan"
                      className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block py-2 text-gray-500">
                    Email
                  </label>
                  <div className="relative">
                    <svg
                      className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="username@example.com"
                      className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-gray-600">Password</label>
                  <div className="relative max-w-xs mt-2">
                    <button
                      type="button"
                      className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600"
                      onClick={() => setPasswordHidden(!isPasswordHidden)}
                    >
                      {isPasswordHidden ? (
                        <svg
                          className="w-6 h-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      )}
                    </button>
                    <input
                      type={isPasswordHidden ? "password" : "text"}
                      placeholder="Enter your password"
                      className="w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-600">Confirm Password</label>
                  <div className="relative max-w-xs mt-2">
                    <button
                      type="button"
                      className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600"
                      onClick={() => setConfirmHidden(!isConfirmHidden)}
                    >
                      {isConfirmHidden ? (
                        <svg
                          className="w-6 h-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      )}
                    </button>
                    <input
                      type={isConfirmHidden ? "password" : "text"}
                      placeholder="Enter your password"
                      className="w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-gray-600">District</label>
                  <SelectInput title={"District"} />
                </div>
                <div>
                  <label className="text-gray-600">Upazila</label>
                  <SelectInput title={"Upazila"} />
                </div>
              </div>

              <div>
                <label htmlFor="blood-group">Blood Group</label>
                <SelectBloodGroup />
              </div>

              <div>
                <label htmlFor="photo">Upload Profile Picture</label>
                <input
                  type="file"
                  className="w-full rounded-lg mt-2 border-gray-200 border file:border-0 file:py-5 file:w-2/5 file:mr-5 file:bg-black file:text-white file:font-bold file:cursor-pointer "
                />
              </div>

              <div className="mt-4 w-full">
                <button
                  type="submit"
                  className="inline-block w-full py-4 font-medium text-white btn"
                >
                  <span>Create Account</span>
                </button>
              </div>

              <p className="text-center pt-2 text-gray-700">
                Already have an account?{" "}
                <Link className="underline text-primary" to={"/login"}>
                  Log in
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
