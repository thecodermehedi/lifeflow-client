import axiosPublic from "./axiosPublic";

export const getBlogs = async () => {
  const {data} = await axiosPublic("/blogs");
  return data;
};
