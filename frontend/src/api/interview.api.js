import api from "./axios";

export const generateInterviewQuestions =
  async (data) => {
    const response = await api.post(
      "/interview/data/generate",
      data
    );

    return response.data;
  };

export const getAllInterviews =
  async () => {
    const response = await api.get(
      "/interview"
    );

    return response.data;
  };

export const getInterviewById =
  async (id) => {
    const response = await api.get(
      `/interview/${id}`
    );

    return response.data;
  };

export const deleteInterview =
  async (id) => {
    const response = await api.delete(
      `/interview/${id}`
    );

    return response.data;
  };