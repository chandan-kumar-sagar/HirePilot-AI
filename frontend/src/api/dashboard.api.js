import api from "./axios";

export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/data/dashboardStats");
  return response.data;
};

export const getRecentActivity = async () => {
  const response = await api.get("/dashboard/data/recentActivity");
  return response.data;
};
