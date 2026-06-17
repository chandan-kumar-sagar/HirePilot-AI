import api from "./axios";

export const generateJobMatch = async (data) => {
  const response = await api.post("/jobMatch/data/generateJobMatch", data);
  return response.data;
};

export const getJobMatches = async () => {
  const response = await api.get("/jobMatch/data/getAllJobMatches");
  return response.data;
};

export const getJobMatchById = async (id) => {
  const response = await api.get(`/jobMatch/data/getJobMatchById/${id}`);
  return response.data;
};

export const deleteJobMatch = async (id) => {
  const response = await api.delete(`/jobMatch/data/deleteJobMatch/${id}`);
  return response.data;
};
