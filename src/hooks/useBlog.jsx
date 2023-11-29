import {useQuery} from "@tanstack/react-query";
import useUser from "./useUser";
import useAuth from "./useAuth";
import {getBlogs} from "../api/blog";
const useBlog = () => {
  const {user, isUserLoading} = useAuth();
  const userMail = user?.email;
  const {currentUser} = useUser();
  const isAuthorized =
    currentUser?.role === "volunteer" || currentUser?.role === "admin";
  const {data: blogs = [], isLoading: isBlogsLoading} = useQuery({
    enabled: !isUserLoading && !!userMail && !!isAuthorized,
    queryKey: ["blogs"],
    queryFn: async () => await getBlogs(),
  });

  return {
    blogs,
    isBlogsLoading,
    // UpdateBlogStatus,
    // deleteBlogFn,
    // addBlogFn,
    // updateBlogFn,
  };
};

export default useBlog;
