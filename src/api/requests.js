import axiosSecure from ".";

export const saveRequest = async (request) => {
  const {data} = await axiosSecure.post("/requests", request);
  return data;
};

export const getRequests = async (email) => {
  const {data} = await axiosSecure(`/requests/${email}`);
  return data;
};


export const getAllRequests = async () => {
  const {data} = await axiosSecure(`/requests`);
  return data;
};

export const updateRequest = async (id, newRequestInfo) => {

  const {data} = await axiosSecure.patch(`/request/${id}`, newRequestInfo);
  return data;
};

export const deleteRequest = async (id) => {
  const {data} = await axiosSecure.delete(`/request/${id}`);
  return data;
};

export const updateRequestStatus = async (id, status) => {
  const {data} = await axiosSecure.patch(`request/status/${id}`, {status});
  return data;
};

export const getTotalRequests = async () => {
  const {data} = await axiosSecure(`/requests/total`);
  return data;
};