import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProfile,
  updateProfile,
  updateSkills,
  updateExperienceLevel,
} from "@/api/profile.api";
import useAuthStore from "@/features/auth/authService";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      if (data?.user) {
        setUser(data.user); // Update auth store state immediately
      }
    },
  });
};

export const useUpdateSkills = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: updateSkills,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      if (data?.user) {
        setUser(data.user);
      }
    },
  });
};

export const useUpdateExperienceLevel = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: updateExperienceLevel,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      if (data?.user) {
        setUser(data.user);
      }
    },
  });
};
