import axiosSecure from ".";

// Save user to DB
export const saveUserToDB = async (newUser) => {
  const {data} = await axiosSecure.post("/users", newUser);
  return data;
};

// Get token from server
export const getToken = async (email) => {
  const {data} = await axiosSecure.post("/auth/generateToken", {email});
  return data;
};

// Clear token from browser
export const clearCookie = async () => {
  const {data} = await axiosSecure.post("/auth/clearToken");
  return data;
};
