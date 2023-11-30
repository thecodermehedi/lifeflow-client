import axios from "axios";
import axiosPublic from "./axiosPublic";

export const getDistricts = async () => {
  const {data} = await axiosPublic("/districts");
  return data;
};

export const getUpazilas = async () => {
  const {data} = await axiosPublic("/upazilas");
  return data;
};

export const uploadPhoto = async (photo) => {
  const formData = new FormData();
  formData.append("image", photo);
  const {data} = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );
  return data;
};

