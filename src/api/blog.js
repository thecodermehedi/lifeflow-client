import axiosPublic from "./axiosPublic";
import axiosSecure from ".";

export const getBlogs = async () => {
  const {data} = await axiosPublic("/blogs");
  return data;
};

export const addBlog = async (blog) => {
  const {data} = await axiosSecure.post("/blogs", blog);
  return data;
};

export const deleteBlog = async (id) => {
  const {data} = await axiosSecure.delete(`/blog/${id}`);
  return data;
};

export const updateBlogStatus = async (id, status) => {
  const {data} = await axiosSecure.patch(`/blog/status/${id}`, {status});
  return data;
};

export const updateBlog = async (id, newBlogInfo) => {
  const {data} = await axiosSecure.patch(`/blog/${id}`, newBlogInfo);
  return data;
};
