import useAuth from "../../hooks/useAuth";
import {Users} from "react-feather";
import useDashboard from "../../hooks/useDashboard";

const AuthorizedHome = () => {
  const {user} = useAuth();
  const {totalUsers, totalRequests} = useDashboard();
  return (
    <section>
      <h1 className="text-xl md:text-3xl pb-5">
        Welcome{" "}
        <span className="font-bold text-foreground">{user?.displayName}!</span>
      </h1>
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <article className="flex items-end justify-between rounded-lg  bg-base p-16">
          <div className="flex items-center gap-4">
            <span className="hidden rounded-full bg-blue-100 p-2 text-gray-600 sm:block">
              <Users className="w-10 h-10 text-blue-500" />
            </span>
            <div>
              <p className="text-sm text-gray-900 md:text-xl font-medium">
                Total Users
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {totalUsers?.total}
              </p>
            </div>
          </div>
        </article>

        <article className="flex items-end justify-between rounded-lg  bg-base p-16">
          <div className="flex items-center gap-4">
            <span className="hidden rounded-full bg-green-100 p-2 text-gray-600 sm:block">
              <svg
                className="w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
              >
                <path
                  fill="#00D26A"
                  d="M22.788 20.56c-.04-2.6-1.91-6.46-6.89-6.46c-2.85 0-3.24-1.74-3.27-2.39c.03-.81.4-2.69 3.23-2.69c2.94 0 3.28 2.07 3.31 2.71c.03.99.88 1.84 1.85 1.75c1-.02 1.79-.85 1.76-1.85c-.05-2.17-1.49-5.24-5.1-6.03l.03-1.77c.01-1-.79-1.82-1.79-1.83h-.02c-.99 0-1.8.8-1.81 1.79l-.02 1.8c-3.64.77-5.04 3.88-5.06 6.11c.04 2.42 1.91 6.02 6.89 6.02c2.81 0 3.21 2.04 3.27 2.8c-.08.49-.54 2.28-3.27 2.28c-2.77 0-3.21-1.86-3.28-2.41c-.09-1-.95-1.72-1.97-1.64c-1 .09-1.73.97-1.64 1.96c.15 1.71 1.44 4.75 5.07 5.52v2.07c0 1 .81 1.81 1.81 1.81s1.82-.81 1.82-1.81v-2.07a6.284 6.284 0 0 0 5.07-5.48l.01-.1v-.09Z"
                />
              </svg>
            </span>
            <div>
              <p className="text-sm text-gray-900 md:text-xl font-medium">
                Total Funds
              </p>
              <p className="text-2xl font-semibold text-gray-900">$28,346</p>
            </div>
          </div>
        </article>
        <article className="flex items-end justify-between rounded-lg  bg-base p-16">
          <div className="flex items-center gap-4">
            <span className="hidden rounded-full bg-red-100 p-2 text-gray-600 sm:block">
              <svg
                className="w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                width="128"
                height="128"
                viewBox="0 0 128 128"
              >
                <path
                  fill="#E5322E"
                  d="M88.04 44.26C75.44 28.81 69.87 15.67 66.68 7.83c-1.01-2.47-4.36-2.47-5.36 0c-3.19 7.84-8.76 20.98-21.36 36.43c-7.89 9.68-15.67 23.85-15.67 37.81c0 23.82 17.19 39.95 39.71 39.95s39.71-16.14 39.71-39.95c0-14.51-7.78-28.13-15.67-37.81z"
                />
                <path
                  fill="#FF6050"
                  d="M74.98 79.84c6.35-12.08 5.45-23.9 10.47-21.77c6.82 2.91 14.37 17.86 11.54 31.41c-2.02 9.66-8.54 15.51-16.85 12.72c-6.71-2.25-10.88-11.48-5.16-22.36z"
                />
              </svg>
            </span>
            <div>
              <p className="text-sm text-gray-900 md:text-xl font-medium">
                Total Requests
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {totalRequests?.total}
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default AuthorizedHome;
