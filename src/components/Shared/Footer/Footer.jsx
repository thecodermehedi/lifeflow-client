import {ArrowUp} from "react-feather";
import {Link} from "react-router-dom";

const Footer = () => {
  const footerNavs = [
    {
      label: "Company",
      items: [
        {
          href: "#",
          name: "Partners",
        },
        {
          href: "#",
          name: "Blog",
        },
        {
          href: "#",
          name: "Team",
        },
        {
          href: "#",
          name: "Careers",
        },
      ],
    },
    {
      label: "Resources",
      items: [
        {
          href: "#",
          name: "contact",
        },
        {
          href: "#",
          name: "Support",
        },
        {
          href: "#",
          name: "Docs",
        },
        {
          href: "#",
          name: "Pricing",
        },
      ],
    },
    {
      label: "About",
      items: [
        {
          href: "#",
          name: "Terms",
        },
        {
          href: "#",
          name: "License",
        },
        {
          href: "#",
          name: "Privacy",
        },
        {
          href: "#",
          name: "About US",
        },
      ],
    },
  ];

  return (
    <section>
      <footer className="text-gray-500  bg-white px-4 py-5 border-t md:pt-10 max-w-screen-xl mx-auto md:px-8">
        <div className="gap-6 justify-between md:flex">
          <div className="flex-1">
            <div className="flex items-center">
              <img src="/favicon.svg" className="w-9" />
              <Link to={"/"} className="text-2xl text-primary font-bold">
                <h1>LifeFlow</h1>
              </Link>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <label className="block pt-4 pb-2">Stay up to date</label>
              <div className="max-w-sm flex items-center ">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2.5 outline-none rounded-lg rounded-r-none border focus:border-primary transition"
                />
                <button className="p-2.5 rounded-lg rounded-l-none border border-primary text-white bg-primary outline-none shadow-md focus:shadow-none sm:px-5">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
          <div className="flex-1 mt-10 space-y-6 items-center justify-between sm:flex md:space-y-0 md:mt-0">
            {footerNavs.map((item, idx) => (
              <ul className="space-y-4" key={idx}>
                <h4 className="text-primary font-medium">{item.label}</h4>
                {item.items.map((el, idx) => (
                  <li key={idx}>
                    <a
                      href={el.href}
                      className="hover:underline hover:text-primary transition capitalize"
                    >
                      {el.name}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </footer>
      <div className="flex justify-between w-full py-5 text-center bg-foreground text-background">
        <div className="w-full text-center">
          &copy; 2023 LifeFlow All rights reserved.
        </div>
        <button
          onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
          className="border p-1 rounded-full mr-10 hidden md:block hover:bg-base hover:text-black transition"
        >
          <ArrowUp />
        </button>
      </div>
    </section>
  );
};

export default Footer;
