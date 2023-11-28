import {useState} from "react";
import Container from "../../components/Shared/Container";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
const Login = () => {
  // Navigation
  const navigate = useNavigate();

  // Auth functions
  const {signIn} = useAuth();

  // Form handling
  const {register, handleSubmit} = useForm();

  // Password visibility state
  const [isPasswordHidden, setPasswordHidden] = useState(true);

  // Form submit handler
  const handleSignIn = async (data) => {
    const toastLoading = toast.loading("Please wait...");
    try {
      await signIn(data?.email, data?.password);
      navigate("/");
      toast.success("Logged in successfully", {id: toastLoading});
    } catch (error) {
      console.log(error);
      toast.error(
        error.message === "Firebase: Error (auth/invalid-login-credentials)."
          ? "Incorrect email or password"
          : error.message,
        {id: toastLoading}
      );
    }
  };
  return (
    <section className="min-h-screen bg-gray-100">
      <Container className={"flex justify-center items-center h-screen "}>
        <div className=" max-w-lg rounded-2xl p-5 md:p-8 lg:p-10 mt-18 ">
          <h1 className="text-center md:text-2xl lg:text-3xl font-bold text-primary text-xl">
            Donate Blood, Save Lives
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm md:text-lg text-center text-gray-500">
            Join our community of lifesavers. Your donation can make a
            difference.
          </p>
          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 sm:p-6 lg:p-8 bg-white shadow-xl"
          >
            <h3 className="text-gray-800 text-xl font-bold md:text-2xl pb-5 text-center">
              Log in to your account
            </h3>
            <div>
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
                  type="email"
                  id="email"
                  name="email"
                  {...register("email", {required: true})}
                  placeholder="Email Address"
                  className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                  required
                />
              </div>
            </div>
            <div className="relative w-full mt-2">
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
                id="password"
                name="password"
                {...register("password", {required: true})}
                placeholder="Enter your password"
                className="w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                required
              />
            </div>

            <button
              type="submit"
              className="block w-full  px-5 py-3 te font-medium btn"
            >
              <span> Sign in</span>
            </button>
            <p className="text-center text-sm text-gray-500">
              Don&#39;t have an account?{" "}
              <Link className="underline text-primary" to={"/register"}>
                Register
              </Link>
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default Login;
