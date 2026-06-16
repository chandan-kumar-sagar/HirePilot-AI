import api from "./axios";

export const getJobs = async () => {
  const { data } = await api.get("/job/data/getAllJobs");
  return data;
};

export const createJob = async (payload) => {
  const { data } = await api.post("/job/data/createJob", payload);
  return data;
};

export const updateJob = async (id, payload) => {
  // Assuming the backend expects the id in the body or query.
  // Wait, let's look at the updateJobStatus route definition in backend.
  // It's router.patch("/data/updateJobStatus",protect,jobcontroller.updateJobStatus);
  // It probably expects id in req.body.
  const { data } = await api.patch(`/job/data/updateJobStatus`, { id, ...payload });
  return data;
};

export const deleteJob = async (id) => {
  const { data } = await api.delete(`/job/data/deleteJob/${id}`);
  return data;
};

export const getJobStats = async () => {
  const { data } = await api.get("/job/data/getJobStats");
  return data;
};