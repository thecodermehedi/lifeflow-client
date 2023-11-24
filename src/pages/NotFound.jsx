import {Link} from "react-router-dom";

const NotFound = () => {
  return (
    <section className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
      <div className="max-w-lg mx-auto space-y-3 text-center">
        <h3 className="text-primary font-semibold text-2xl">404</h3>
        <p className="text-foreground text-4xl font-semibold sm:text-5xl">
          Page not found
        </p>
        <p className="text-foreground">
          Sorry, the page you are looking for could not be found or has been
          removed.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to={"/"}
            className="block py-2 px-4 font-medium  duration-150 rounded-lg bg-primary  text-white"
          >
            Go back
          </Link>
          <Link
            to={"/contact"}
            className="block py-2 px-4 bg-foreground text-background font-medium duration-150 rounded-lg"
          >
            Contact support
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
