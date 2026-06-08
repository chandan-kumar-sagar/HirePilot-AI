import api from "./axios";

export const uploadResume = async (formData) => {
  const response = await api.post("/resume/data/uploadResume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getResumes = async () => {
  const response = await api.get("/resume/data/getAllResumes");
  return response.data;
};

export const getResumeById = async (id) => {
  const response = await api.get(`/resume/data/getResumeById/${id}`);
  return response.data;
};

export const deleteResume = async (id) => {
  const response = await api.delete(`/resume/data/deleteResume/${id}`);
  return response.data;
};

export const analyzeResume = async (resumeId) => {
  const response = await api.post("/resume/data/resume-analyze", { resumeId });
  return response.data;
};
