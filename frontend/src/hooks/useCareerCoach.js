import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  askCareerAdvice,
  getAllCareerAdvice,
  deleteCareerAdvice,
} from "@/api/careerCoach.api";

export const useCareerAdviceHistory = () => {
  return useQuery({
    queryKey: ["careerAdvice"],
    queryFn: getAllCareerAdvice,
  });
};

export const useAskCareerCoach = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: askCareerAdvice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["careerAdvice"] });
    },
  });
};

export const useDeleteCareerAdvice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCareerAdvice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["careerAdvice"] });
    },
  });
};
