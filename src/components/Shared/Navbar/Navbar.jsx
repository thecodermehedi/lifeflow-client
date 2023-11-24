import {useState} from "react";
import {Link} from "react-router-dom";
import Container from "../Container";
import {NavLink} from "react-router-dom";
const Navbar = () => {
  const [state, setState] = useState(false);

  const navigation = [
    {title: "Blog", path: "/blog"},
    {title: "Donation Request", path: "/donation-request"},
  ];

  return (
    <nav className="border-b w-full md:static md:text-sm md:border-none fixed">
      <Container className={"items-center"}>
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <div className="flex items-center">
            <img src="/favicon.svg" className="w-9" />
            <Link to={"/"} className="text-2xl text-primary font-bold">
              <h1>LifeFlow</h1>
            </Link>
          </div>
          <div className="md:hidden">
            <button
              className="text-primary hover:text-foreground"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
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
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => {
              return (
                <NavLink
                  key={idx}
                  to={item.path}
                  className={({isActive}) =>
                    isActive
                      ? "bg-base py-3 px-4 rounded-lg"
                      : "block py-3 px-4 btn-hover"
                  }
                >
                  <span className="text-foreground">{item.title}</span>
                </NavLink>
              );
            })}
            <span className="hidden w-px h-6 bg-gray-300 md:block"></span>
            <div className="space-y-3 items-center gap-x-6 md:flex md:space-y-0">
              <li>
                <Link
                  to={"/register"}
                  className="block py-3 px-4 font-medium text-center  shadow md:inline btn-reverse"
                >
                  <span> Register</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/login"}
                  className="block py-3 px-4 font-medium text-center  shadow md:inline btn"
                >
                  <span> Log in</span>
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
