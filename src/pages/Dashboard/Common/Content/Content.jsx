import {useState} from "react";
import {Search} from "react-feather";
import {Plus} from "react-feather";
import Spinner from "../../../../components/Spinner";
import useAuth from "../../../../hooks/useAuth";
import useUser from "../../../../hooks/useUser";
import {Link} from "react-router-dom";
import useBlog from "../../../../hooks/useBlog";

const Content = () => {
  const {isUserLoading} = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState("");
  const {currentUser} = useUser();
  const isVolunteer = currentUser?.role === "volunteer";
  const {blogs, isBlogsLoading, deleteBlogFn, PublishBlog, UnpublishBlog} =
    useBlog();
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filteredBlogs = blogs?.filter((blog) => {
    if (selectedStatus === "") {
      return true;
    }
    return blog?.status === selectedStatus;
  });
  if (isUserLoading || isBlogsLoading) {
    return <Spinner />;
  }

  const numPages = Math.ceil(filteredBlogs.length / 6);

  const statusColors = {
    published: "text-green-600 bg-green-50",
    draft: "text-yellow-600 bg-yellow-50",
  };

  return (
    <section className="w-full">
      <div className="text-xl md:text-3xl pb-5 text-center font-semibold">
        <h1>Manage Your Blogs</h1>
      </div>
      <div className="flex items-center">
        <div className="w-full">
          <div className="relative border shadow-lg bg-red-200 rounded-lg">
            <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type="search"
                      id="simple-search"
                      className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-base focus:outline-none focus:bg-white"
                      placeholder="Search"
                    />
                  </div>
                </form>
              </div>
              <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                <Link
                  to={`/dashboard/${currentUser?.role}/content-management/add-blog`}
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary/90 hover:bg-primary"
                >
                  <Plus className="w-4 h-4 mr-2 font-bold" />
                  Add Blog
                </Link>
                <div className="flex items-center w-full space-x-3 md:w-auto">
                  <select
                    name="blogsStatus"
                    id="blogsStatus"
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    className="px-2 py-1.5 text-sm bg-base font-medium w-full rounded-lg border focus:outline-none"
                  >
                    <option value="">Select Status</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {filteredBlogs?.length > 0 ? (
        <div className="mt-5 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Thumbnail</th>
                <th className="py-3 px-6">Title</th>
                <th className="py-3 px-6 text-center">Status</th>
                {!isVolunteer && <th className="py-3 px-6">Publish</th>}
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {filteredBlogs
                .slice(currentPage * 6, (currentPage + 1) * 6)
                .map((blog, idx) => (
                  <tr key={idx}>
                    <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                      <img
                        src={blog?.cover}
                        className="h-16 w-20 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {blog?.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`px-3 py-2 rounded-full font-semibold text-xs capitalize ${
                          statusColors[blog?.status]
                        }`}
                      >
                        {blog?.status}
                      </span>
                    </td>
                    {!isVolunteer && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        {blog?.status === "published" ? (
                          <button
                            onClick={() => UnpublishBlog(blog?._id)}
                            className="bg-red-200 text-primary font-semibold hover:bg-red-600 hover:text-foreground transition duration-150 px-3 py-2 rounded-lg capitalize"
                          >
                            Unpublish
                          </button>
                        ) : (
                          <button
                            onClick={() => PublishBlog(blog?._id)}
                            className="bg-green-200 text-green-800 font-semibold hover:bg-green-600 hover:text-foreground transition duration-150 px-3 py-2 rounded-lg capitalize"
                          >
                            Publish
                          </button>
                        )}
                      </td>
                    )}

                    <td className="text-center px-6 whitespace-nowrap">
                      <Link
                        to={`/dashboard/${currentUser?.role}/content-management/${blog?._id}/edit`}
                        className="px-3 py-2 rounded-lg bg-blue-200 text-blue-800 font-semibold  hover:bg-blue-600  hover:text-black mr-2"
                      >
                        Edit
                      </Link>
                      {!isVolunteer && (
                        <button
                          className="px-3 py-2 rounded-lg bg-red-200 text-red-800 font-semibold  hover:bg-red-600  hover:text-black"
                          onClick={() => deleteBlogFn(blog?._id)}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="mt-8 pb-3 flex justify-center items-center gap-4">
            <button
              className="px-3 border py-2 rounded-lg bg-primary disabled:bg-foreground disabled:cursor-not-allowed disabled:text-opacity-50 text-white"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <button
              className="px-3 border py-2 rounded-lg bg-primary disabled:bg-foreground disabled:cursor-not-allowed disabled:text-opacity-50 text-white"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === numPages - 1}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center mt-48">
          <div className="text-center ">
            <h1 className="text-2xl font-semibold text-gray-700">
              No Blogs Found
            </h1>
            <p className="text-gray-500">You have not created any blog yet.</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Content;
