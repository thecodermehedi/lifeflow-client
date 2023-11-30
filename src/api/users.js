import axiosSecure from ".";
import axiosPublic from "./axiosPublic";

// Save user to DB
export const saveUserToDB = async (newUser) => {
  const {data} = await axiosSecure.post("/users", newUser);
  return data;
};

// Get user by email
export const getUser = async (email) => {
  const {data} = await axiosSecure(`/user/${email}`);
  return data;
};

// Get users
export const getDonors = async () => {
  const {data} = await axiosPublic(`/users/donors`);
  return data;
};

// Get users
export const getUsers = async () => {
  const {data} = await axiosSecure(`/users`);
  return data;
};

// Upadte user
export const updateUserToDB = async (userMail, newInfo) => {
  const {data} = await axiosSecure.patch(`/user/${userMail}`, newInfo);
  return data;
};

// Update user status
export const updateUserStatus = async (id, status) => {
  const {data} = await axiosSecure.patch(`user/status/${id}`, {status});
  return data;
};

// Update user role
export const updateUserRoleToDB = async (id, role) => {
  const {data} = await axiosSecure.patch(`/user/role/${id}`, {role});
  return data;
};

// Get total users
export const getTotalUsers = async () => {
  const {data} = await axiosSecure(`/users/total`);
  return data;
};
