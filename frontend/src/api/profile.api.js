import api from "./axios";

export const getProfile = async () => {
  const response = await api.get("/user/data/get-profile");
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.put("/user/data/update-profile", data);
  return response.data;
};

export const updateSkills = async (data) => {
  const response = await api.put("/user/data/update-skills", data);
  return response.data;
};

export const updateExperienceLevel = async (data) => {
  const response = await api.put("/user/data/update-experience", data);
  return response.data;
};
