import useBlog from "../../hooks/useBlog";
const Blog = () => {
  const {blogs} = useBlog();
  return (
    <section className="py-32">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="space-y-5 sm:text-center sm:max-w-md sm:mx-auto">
          <h1 className="text-gray-800 text-3xl font-extrabold sm:text-4xl">
            Blood Donation Insights
          </h1>
          <p className="text-gray-600">
            Stay informed with the latest articles on blood donation, success stories, and health benefits. Updated regularly.
          </p>
        </div>
        <ul className="grid gap-x-8 gap-y-10 mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {blogs?.map((blog, key) => (
            <li className="w-full mx-auto group sm:max-w-sm" key={key}>
              <a>
                <img
                  src={blog.cover}
                  loading="lazy"
                  alt={blog.title}
                  className="w-full rounded-lg"
                />
                <div className="mt-3 space-y-2">
                  <span className="block text-primary text-sm">
                    {blog.date}
                  </span>
                  <h3 className="text-lg text-gray-800 duration-150 group-hover:text-primary font-semibold">
                    {blog.title}
                  </h3>
                  <p
                    className="text-gray-600 text-sm duration-150 group-hover:text-gray-800"
                    dangerouslySetInnerHTML={{__html: blog.description}}
                  />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Blog;
