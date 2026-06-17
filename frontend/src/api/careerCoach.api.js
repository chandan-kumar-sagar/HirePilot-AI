import api from "./axios";

export const askCareerAdvice = async (data) => {
  const response = await api.post("/careerCoach/data/ask-advice", data);
  return response.data;
};

export const getAllCareerAdvice = async () => {
  const response = await api.get("/careerCoach/data/getAllAdvice");
  return response.data;
};

export const deleteCareerAdvice = async (id) => {
  const response = await api.delete(`/careerCoach/data/deleteAdvice/${id}`);
  return response.data;
};
