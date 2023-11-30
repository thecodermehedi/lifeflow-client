import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import useUser from "./useUser";
import useAuth from "./useAuth";
import {addBlog, deleteBlog, getBlogs, updateBlog, updateBlogStatus} from "../api/blog";
import toast from "react-hot-toast";
const useBlog = () => {
  const queryClient = useQueryClient();
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

  const {mutateAsync: addBlogFn} = useMutation({
    mutationFn: async (newBlog) => await addBlog(newBlog),
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
      toast.success("Blog added successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const {mutateAsync: deleteBlogFn} = useMutation({
    mutationFn: async (id) => await deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
      toast.success("Blog deleted successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

const {mutateAsync: PublishBlog} = useMutation({
    mutationFn: async (id) => await updateBlogStatus(id, "published"),
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
      toast.success("Blog published successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

const {mutateAsync: UnpublishBlog} = useMutation({
    mutationFn: async (id) => await  updateBlogStatus(id, "draft"),
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
      toast.success("Blog unpublished successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });


  const {mutateAsync: updateBlogFn} = useMutation({
    mutationFn: async ({id, newBlogInfo}) => await updateBlog(id, newBlogInfo),
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
      toast.success("Blog updated successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });


  return {
    blogs,
    isBlogsLoading,
    addBlogFn,
    deleteBlogFn,
    PublishBlog,
    UnpublishBlog,
    updateBlogFn
  };
};

export default useBlog;
