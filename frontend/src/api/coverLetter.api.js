import api from "./axios";

export const generateCoverLetter = async (data) => {
  const response = await api.post("/coverLetter/data/generateCoverLetter", data);
  return response.data;
};

export const getAllCoverLetters = async () => {
  const response = await api.get("/coverLetter/data/getAllCoverLetters");
  return response.data;
};

export const getCoverLetterById = async (id) => {
  const response = await api.get(`/coverLetter/data/getCoverLetterById/${id}`);
  return response.data;
};

export const deleteCoverLetter = async (id) => {
  const response = await api.delete(`/coverLetter/data/deleteCoverLetter/${id}`);
  return response.data;
};

export const downloadCoverLetter = async (id) => {
  const response = await api.get(`/coverLetter/data/downloadCoverLetter/${id}`, {
    responseType: "blob",
  });
  return response.data;
};
