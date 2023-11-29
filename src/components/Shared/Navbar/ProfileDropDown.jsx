import {useState, useRef, useEffect} from "react";
import {Link} from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";

// Profile Dropdown
const ProfileDropDown = (props) => {
  const [state, setState] = useState(false);
  const {user, logOut} = useAuth();
  const {currentUser} = useUser();
  const profileRef = useRef();

  const navigation = [
    {
      title: "Dashboard",
      path:
        currentUser?.role === "admin" || currentUser?.role === "volunteer"
          ? `/dashboard/${currentUser?.role}/home`
          : "/dashboard/home",
    },
    {
      title: "Profile",
      path:
        currentUser?.role === "admin" || currentUser?.role === "volunteer"
          ? `/dashboard/${currentUser?.role}/profile`
          : "/dashboard/profile",
    },
  ];

  useEffect(() => {
    const handleDropDown = (e) => {
      if (!profileRef.current.contains(e.target)) setState(false);
    };
    document.addEventListener("click", handleDropDown);
    // Cleanup function
    return () => {
      document.removeEventListener("click", handleDropDown);
    };
  }, []);

  return (
    <div className={`relative ${props.class}`}>
      <div className="hidden  md:flex items-center space-x-4">
        <button
          ref={profileRef}
          className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-primary"
          onClick={() => setState(!state)}
        >
          <img src={user?.photoURL} className="w-full h-full rounded-full" />
        </button>
        <div className="md:hidden">
          <span className="block">Micheal John</span>
          <span className="block text-sm text-gray-500">john@gmail.com</span>
        </div>
      </div>
      <ul
        className={`bg-white top-14 right-0 mt-5 space-y-8 md:absolute md:border md:rounded-lg md:text-sm md:w-52 md:shadow-md md:space-y-0 md:mt-0 ${
          state ? "" : "md:hidden"
        }`}
      >
        {navigation.map((item, idx) => (
          <li key={idx}>
            <Link
              className="block text-foreground btn-hover py-3 px-4 border-t"
              to={item.path}
            >
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
        <li>
          <button
            onClick={logOut}
            className="block text-foreground btn-hover py-3 px-4 border w-full text-left"
          >
            <span> Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropDown;
